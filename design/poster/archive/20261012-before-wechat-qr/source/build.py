"""Build a self-contained TV poster, preserving each supplied screenshot byte-for-byte."""
from pathlib import Path
import base64
import hashlib
import json
import re
from reportlab.graphics.barcode.qrencoder import QRCode, QRErrorCorrectLevel

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).parent
OUT = ROOT / 'output/poster'
OUT.mkdir(parents=True, exist_ok=True)

ASSETS = {
    'LOCKUP': (ROOT / 'public/assets/brand/yorigen-brand-lockup.svg', 'image/svg+xml'),
    'JUDGMENT': (ROOT / 'public/assets/judgment/J3-01.png', 'image/png'),
    'AZHI': (HERE / 'assets/azhi-user-screenshot.png', 'image/png'),
    'AZAO': (ROOT / 'public/assets/azao/ZA2-04-evidence.png', 'image/png'),
}
URLS = {'QR_JUDGMENT': 'https://judgment.haaboo.com', 'QR_WEBSITE': 'https://haaboo.com'}


def data_uri(raw, mime):
    return f'data:{mime};base64,' + base64.b64encode(raw).decode('ascii')


def qr_svg(url):
    qr = QRCode(None, QRErrorCorrectLevel.Q)
    qr.addData(url)
    qr.make()
    n = qr.getModuleCount()
    quiet = 4
    extent = n + 2 * quiet
    commands = []
    for y in range(n):
        for x in range(n):
            if qr.modules[y][x]:
                commands.append(f'M{x + quiet},{y + quiet}h1v1h-1z')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {extent} {extent}" '
           f'shape-rendering="crispEdges"><rect width="{extent}" height="{extent}" fill="white"/>'
           f'<path d="{"".join(commands)}" fill="black"/></svg>')
    return svg.encode(), {'url': url, 'modules': n, 'quietModules': quiet, 'errorCorrection': 'Q'}


html = (HERE / 'poster.template.html').read_text()
manifest = {'canvas': [3840, 2160], 'safeMarginPx': 160, 'assets': {}, 'qr': {}}
for token, (path, mime) in ASSETS.items():
    data = path.read_bytes()
    html = html.replace('{{' + token + '}}', data_uri(data, mime))
    manifest['assets'][token] = {'source': str(path.relative_to(ROOT)), 'sha256': hashlib.sha256(data).hexdigest()}
for token, url in URLS.items():
    svg, metadata = qr_svg(url)
    html = html.replace('{{' + token + '}}', data_uri(svg, 'image/svg+xml'))
    manifest['qr'][token] = metadata
assert not re.search(r'\{\{[A-Z_]+\}\}', html), 'Unresolved asset placeholder'
target = OUT / 'Yorigen_Brand_Poster_3840x2160.html'
target.write_text(html)
manifest['htmlSha256'] = hashlib.sha256(target.read_bytes()).hexdigest()
(OUT / 'assets-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
print(f'{target} ({target.stat().st_size:,} bytes)')
