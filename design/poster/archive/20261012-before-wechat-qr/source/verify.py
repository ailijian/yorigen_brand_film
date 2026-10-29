"""Verify the exported bitmap, decoded QR destinations and unchanged input assets."""
from pathlib import Path
import base64
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tmp/pdfs/deps'))
from PIL import Image, ImageCms
import zxingcpp

OUT = ROOT / 'output/poster'
png = OUT / 'Yorigen_Brand_Poster_3840x2160.png'
html = OUT / 'Yorigen_Brand_Poster_3840x2160.html'
layout = json.loads((OUT / 'layout-check.json').read_text())
manifest = json.loads((OUT / 'assets-manifest.json').read_text())
assert layout.get('htmlSha256') == manifest['htmlSha256'] == hashlib.sha256(html.read_bytes()).hexdigest(), 'Layout check does not match this HTML'
assert layout.get('renderScriptSha256') == hashlib.sha256((ROOT / 'design/poster/render.mjs').read_bytes()).hexdigest(), 'Layout check must be rerun on the final verification script'
expected = sorted(['https://judgment.haaboo.com', 'https://haaboo.com'])
im = Image.open(png)
assert im.size == (3840, 2160), im.size
# Explicit, opaque RGB/sRGB output for TV image players.
im = im.convert('RGB')
profile = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()
im.save(png, format='PNG', icc_profile=profile, optimize=True)
im = Image.open(png)
assert im.mode == 'RGB' and 'icc_profile' in im.info
qr_checks = []
for width in (3840, 1920, 1280):
    size = (width, width * 9 // 16)
    test = im if size == im.size else im.resize(size, Image.Resampling.LANCZOS)
    urls = sorted(code.text for code in zxingcpp.read_barcodes(test))
    assert urls == expected, (size, urls)
    qr_checks.append({'imageSize': list(size), 'decodedUrls': urls})
source = html.read_text()
embedded_images = re.findall(r'src="data:([^;]+);base64,([^\"]+)"', source)
embedded_hashes = {hashlib.sha256(base64.b64decode(data)).hexdigest() for _, data in embedded_images}
for key, asset in manifest['assets'].items():
    data = (ROOT / asset['source']).read_bytes()
    digest = hashlib.sha256(data).hexdigest()
    assert digest == asset['sha256'] and digest in embedded_hashes, ('asset changed or not embedded', key)
assert not re.search(r'(?:src|href)="(?:https?://|//)', source.replace('href="https://judgment.haaboo.com"', '').replace('href="https://haaboo.com"', ''))
assert layout['verdict'] == 'PASS'
report = {
    'verdict': 'PASS', 'dimensions': list(im.size), 'mode': im.mode,
    'colorProfile': 'embedded sRGB', 'safeMarginPx': 160,
    'qrChecks': qr_checks, 'screenshots': 'original asset bytes embedded unchanged; aspect ratios checked',
    'sourceAssets': manifest['assets'],
    'copyStringsChecked': layout['copyStringsChecked'],
    'offlineRender': not layout['externalRequests'], 'layoutAndMobileFit': 'PASS',
    'htmlSha256': hashlib.sha256(html.read_bytes()).hexdigest(),
    'pngSha256': hashlib.sha256(png.read_bytes()).hexdigest(),
    'limits': ['Real TV and phone-camera scanning at 3–8 metres not field tested.',
               'Screenshot microcopy is illustrative; large poster labels carry the reading.',
               'HTML uses the device Chinese system font stack; PNG is the fixed visual master.'],
}
(OUT / 'preflight.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
print(json.dumps({'verdict': report['verdict'], 'dimensions': report['dimensions'], 'mode': report['mode'], 'qr': qr_checks}, ensure_ascii=False))
