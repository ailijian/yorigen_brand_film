"""Content, dimensions, fonts, CMYK images and rendered QR preflight."""
from pathlib import Path
import json
import re
import sys
import hashlib
from html import unescape

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tmp/pdfs/deps'))
from pypdf import PdfReader
from PIL import Image
import zxingcpp

MM = 72 / 25.4
content = json.loads((ROOT / 'print/trifold/content.json').read_text())
records = json.loads((ROOT / 'tmp/pdfs/layout-records.json').read_text())
output = ROOT / 'output/pdf'


def compact(s):
    return re.sub(r'\s+', '', unescape(s))


def strings(obj, path=()):
    if isinstance(obj, str):
        yield path, obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            yield from strings(v, path + (k,))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from strings(v, path + (i,))


report = {'verdict': 'PASS', 'format': {'fold': 'roll / C-fold, printer confirms fold positions within fixed 210 x 140 mm trim', 'nominalFoldedMm': [70, 140], 'trimMm': [210, 140], 'bleedMm': 3,
          'outsideNominalPanelWidthsMm': [70, 70, 70], 'insideNominalPanelWidthsMm': [70, 70, 70],
          'preDeductedFoldAllowanceMm': 0, 'cropMarks': False}, 'files': {},
          'copyNotes': ['Optional three-line inside footer omitted to preserve readable type.', 'Repeated long-term product propositions are present verbatim as product headlines.']}
for name, record in records.items():
    r = PdfReader(output / name)
    assert len(r.pages) == 2
    bleed = record['bleedMm']
    alltext = compact(''.join(p.extract_text() for p in r.pages))
    checked = 0
    for key, s in strings(content):
        if key[-1] in ('id', 'primaryUrl', 'secondaryUrl', 'footer') or not s:
            continue
        assert compact(s) in alltext, ('missing approved text', key, s)
        checked += 1
    fonts = set()
    images = []
    for p in r.pages:
        assert abs(float(p.trimbox.width) / MM - 210) < 0.001
        assert abs(float(p.trimbox.height) / MM - 140) < 0.001
        expected = [0, 0, 210 + 2 * bleed, 140 + 2 * bleed]
        for boxname in ('mediabox', 'cropbox', 'bleedbox'):
            actual = [float(v) / MM for v in getattr(p, boxname)]
            assert all(abs(a - e) < 0.001 for a, e in zip(actual, expected)), (name, boxname, actual, expected)
        actual = [float(v) / MM for v in p.trimbox]
        assert all(abs(a - e) < 0.001 for a, e in zip(actual, [bleed, bleed, 210 + bleed, 140 + bleed]))
        assert p.get('/UserUnit', 1) == 1
        assert p.get('/Rotate', 0) == 0
        for font in p['/Resources']['/Font'].values():
            f = font.get_object()
            fd = f.get('/FontDescriptor')
            assert fd is not None, ('unembedded font', f.get('/BaseFont'))
            fd = fd.get_object()
            assert any(k in fd for k in ('/FontFile', '/FontFile2', '/FontFile3'))
            fonts.add(str(f['/BaseFont']))
        for obj in p['/Resources'].get('/XObject', {}).values():
            obj = obj.get_object()
            if obj.get('/Subtype') == '/Image':
                cs = str(obj['/ColorSpace'])
                assert cs == '/DeviceCMYK', cs
                images.append(cs)
    assert r.trailer['/Root'].get('/OutputIntents')
    assert r.trailer['/Root']['/ViewerPreferences']['/PrintScaling'] == '/None'
    for box in record['textBoxes']:
        x, y, w, h = [box[k] for k in ('x', 'y', 'w', 'h')]
        assert x >= 5 and x + w <= 205.01 and y >= 4 and y + h <= 136.01
        if box['tag'] != 'spread-header':
            bounds = [(0, 70), (70, 140), (140, 210)]
            assert any(x >= a + 5 and x + w <= b - 5 + 0.01 for a, b in bounds), ('fold clearance', box)
        # Main reading text stays >= 7.5 pt. Small English labels/URLs are
        # independently recorded and reviewed visually, never scaled artwork.
        if len(re.findall(r'[\u4e00-\u9fff]', box['text'])) >= 12:
            assert box['size'] >= 7.5, ('body type too small', box)
    # Text blocks must not collide, including headings and aligned footers.
    for i, a in enumerate(record['textBoxes']):
        for b in record['textBoxes'][i + 1:]:
            if a['page'] != b['page']:
                continue
            dx = min(a['x'] + a['w'], b['x'] + b['w']) - max(a['x'], b['x'])
            dy = min(a['y'] + a['h'], b['y'] + b['h']) - max(a['y'], b['y'])
            assert dx <= 0.01 or dy <= 0.01, ('text overlap', a, b)
    report['files'][name] = {'pages': 2, 'mediaMm': [210 + 2 * bleed, 140 + 2 * bleed], 'trimMm': [210, 140], 'bleedPerSideMm': bleed,
                            'userUnit': 1, 'rotation': 0, 'printScaling': 'None', 'copyStringsVerified': checked, 'embeddedFonts': sorted(fonts),
                            'rasterColorSpaces': images, 'minimumLabelPt': min(x['size'] for x in record['textBoxes']), 'minimumBodyPt': 7.5,
                            'panelTextSafetyMm': 5, 'textOverlapCheck': 'PASS', 'effectiveScreenshotPpi': [x['effectivePpi'] for x in record['images']],
                            'sha256': hashlib.sha256((output / name).read_bytes()).hexdigest()}

# Decode only from the rendered final PDF, not from the QR generator's input.
qr_checks = []
for prefix in ('print-check', 'net-check'):
    page = Image.open(ROOT / f'tmp/pdfs/{prefix}-1.png').convert('RGB')
    decoded = zxingcpp.read_barcodes(page)
    urls = sorted(x.text for x in decoded)
    assert urls == sorted([content['back']['primaryUrl'], content['back']['secondaryUrl']]), urls
    # A second lower-resolution read checks scanning robustness at small sizes.
    half = page.resize((page.width // 2, page.height // 2))
    low = sorted(x.text for x in zxingcpp.read_barcodes(half))
    assert low == urls, low
    qr_checks.append({'file': prefix, 'count': len(urls), 'decodedUrls': urls, 'renderDpi': 160, 'downsampledDpi': 80})
report['qr'] = {'status': 'PASS', 'checks': qr_checks}
report['productionProfile'] = 'Generic CMYK Profile, embedded OutputIntent. Not claimed as certified PDF/X.'
(output / 'Yorigen_Trifold_210x140mm_Preflight.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
print(json.dumps({'verdict': report['verdict'], 'files': list(report['files']), 'qr': report['qr']}, ensure_ascii=False))
