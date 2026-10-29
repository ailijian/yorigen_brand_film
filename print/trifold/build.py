"""Trifold design master at the designer's exact 210 x 140 mm flat size.

All text comes from the approved copy. Assets are frozen film frames and the
external approved Origin Y. No product or film implementation is modified.
"""
from pathlib import Path
import io
import json
import hashlib
import re
import sys
from copy import deepcopy
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tmp/pdfs/deps'))
from fontTools.ttLib import TTFont as FontToolsFont
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.cu2quPen import Cu2QuPen
from PIL import Image, ImageCms
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing, STATE_DEFAULTS
from reportlab.lib.utils import ImageReader
from svglib.svglib import svg2rlg
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DictionaryObject, NameObject, TextStringObject, NumberObject, DecodedStreamObject, ArrayObject, RectangleObject

HERE = Path(__file__).parent
OUT = ROOT / 'output/pdf'
TMP = ROOT / 'tmp/pdfs'
OUT.mkdir(parents=True, exist_ok=True)
DATA = json.loads((HERE / 'content.json').read_text())
FONT_SOURCE = '/System/Library/AssetsV2/com_apple_MobileAsset_Font7/3419f2a427639ad8c8e139149a287865a90fa17e.asset/AssetData/PingFang.ttc'
ICC = Path('/System/Library/ColorSync/Profiles/Generic CMYK Profile.icc')
PROFILE = ImageCms.getOpenProfile(str(ICC))
RGB_PROFILE = ImageCms.createProfile('sRGB')
TRANSFORM = ImageCms.buildTransform(RGB_PROFILE, PROFILE, 'RGB', 'CMYK', renderingIntent=1)
NAVY = '#0D2B45'
INK = '#263440'
MUTED = '#657681'
GREEN = '#22C39E'
INDIGO = '#5968F2'
WARM = '#FBFBF8'
LINE = '#D8E0E6'
WIDTH, HEIGHT = 210, 140
EXPORTS = [
    ('Yorigen_Trifold_210x140mm.pdf', 0),
    ('Yorigen_Trifold_Print_216x146mm_Bleed3mm.pdf', 3),
]


def prepare_fonts():
    # Embed a small TrueType subset of the installed font. The conversion keeps
    # the source glyph geometry to within one font unit; no synthetic bold.
    chars = set((HERE / 'content.json').read_text() + Path(__file__).read_text())
    chars.update('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz /:.-·｜')
    for name, index in [('Regular', 3), ('Medium', 7), ('Semibold', 11)]:
        target = TMP / f'YorigenPingFang{name}.ttf'
        src = FontToolsFont(FONT_SOURCE, fontNumber=index)
        cmap = {k: v for k, v in src.getBestCmap().items() if chr(k) in chars}
        order = ['.notdef'] + sorted(set(cmap.values()) - {'.notdef'})
        source_glyphs = src.getGlyphSet()
        glyphs = {}
        for glyphname in order:
            pen = TTGlyphPen(None)
            source_glyphs[glyphname].draw(Cu2QuPen(pen, max_err=1.0, reverse_direction=True))
            glyphs[glyphname] = pen.glyph()
        fb = FontBuilder(src['head'].unitsPerEm, isTTF=True)
        fb.setupGlyphOrder(order)
        fb.setupCharacterMap(cmap)
        fb.setupGlyf(glyphs)
        fb.setupHorizontalMetrics({g: src['hmtx'][g] for g in order})
        fb.setupHorizontalHeader(ascent=src['hhea'].ascent, descent=src['hhea'].descent)
        fb.setupNameTable({'familyName': 'YorigenPingFang', 'styleName': name,
                          'uniqueFontIdentifier': f'YorigenPingFang-{name}',
                          'fullName': f'YorigenPingFang {name}', 'psName': f'YorigenPingFang-{name}'})
        fb.setupOS2(sTypoAscender=src['OS/2'].sTypoAscender,
                    sTypoDescender=src['OS/2'].sTypoDescender,
                    usWinAscent=src['OS/2'].usWinAscent,
                    usWinDescent=src['OS/2'].usWinDescent,
                    fsType=src['OS/2'].fsType)
        fb.setupPost()
        fb.setupMaxp()
        fb.save(str(target))
        pdfmetrics.registerFont(TTFont(name, str(target)))
    pdfmetrics.registerFontFamily('Regular', normal='Regular', bold='Semibold', italic='Regular', boldItalic='Semibold')


COLOR_CACHE = {}


def color(value, printing):
    if not printing:
        return colors.HexColor(value)
    if value == INK:
        return colors.CMYKColor(0, 0, 0, 0.86)
    if value == MUTED:
        return colors.CMYKColor(0, 0, 0, 0.61)
    if value not in COLOR_CACHE:
        rgb = Image.new('RGB', (1, 1), value)
        cmyk = ImageCms.applyTransform(rgb, TRANSFORM).getpixel((0, 0))
        COLOR_CACHE[value] = colors.CMYKColor(*[c / 255 for c in cmyk])
    return COLOR_CACHE[value]


class Layout:
    def __init__(self, filename, printing, bleed=0):
        self.printing = printing
        self.pad = bleed
        self.pageh = HEIGHT + 2 * self.pad
        self.pagew = WIDTH + 2 * self.pad
        STATE_DEFAULTS['fontName'] = 'Regular'
        STATE_DEFAULTS['fillColor'] = colors.CMYKColor(0, 0, 0, 1) if printing else colors.black
        STATE_DEFAULTS['strokeColor'] = colors.CMYKColor(0, 0, 0, 1) if printing else colors.black
        self.c = canvas.Canvas(str(filename), pagesize=(self.pagew * mm, self.pageh * mm), pageCompression=1, invariant=1, pdfVersion=(1, 4), initialFontName='Regular', enforceColorSpace='CMYK' if printing else None)
        self.c.setTitle('源点AI 三折页 | 216×146 mm 含出血' if bleed else '源点AI 三折页 | 210×140 mm 净尺寸')
        self.c.setAuthor('Yorigen AI')
        self.c.setSubject('Exact flat trim 210 x 140 mm; nominal 70/70/70 mm panels; printer confirms fold positions within the fixed trim')
        self.boxes = []
        self.images = []
        self.page = 0
        self.shift_x = 0

    def x(self, x): return (x + self.pad + self.shift_x) * mm
    def y(self, y): return (HEIGHT + self.pad - y) * mm

    def rect(self, x, y, w, h, fill, stroke=None, radius=0):
        self.c.setFillColor(color(fill, self.printing))
        if stroke: self.c.setStrokeColor(color(stroke, self.printing))
        self.c.setLineWidth(0.35)
        if radius:
            self.c.roundRect(self.x(x), self.y(y + h), w * mm, h * mm, radius * mm, fill=1, stroke=bool(stroke))
        else:
            self.c.rect(self.x(x), self.y(y + h), w * mm, h * mm, fill=1, stroke=bool(stroke))

    def line(self, x1, y1, x2, y2, stroke=LINE, weight=0.4):
        self.c.setStrokeColor(color(stroke, self.printing))
        self.c.setLineWidth(weight)
        self.c.line(self.x(x1), self.y(y1), self.x(x2), self.y(y2))

    def text(self, text, x, y, width, size=10, leading=None, font='Regular', fill=INK, align=0, tag=None):
        text = escape(text).replace('\n', '<br/>')
        style = ParagraphStyle('copy', fontName=font, fontSize=size, leading=leading or size * 1.42,
                               textColor=color(fill, self.printing), wordWrap='CJK', alignment=align,
                               splitLongWords=False, allowWidows=0, allowOrphans=0, spaceAfter=0)
        p = Paragraph(text, style)
        _, height = p.wrap(width * mm, HEIGHT * mm)
        p.drawOn(self.c, self.x(x), self.y(y) - height)
        h = height / mm
        physical_x = x + self.shift_x
        self.boxes.append({'page': self.page, 'tag': tag, 'text': text.replace('<br/>', '\n'), 'x': physical_x, 'y': y, 'w': width, 'h': h, 'size': size})
        assert physical_x >= 5 and physical_x + width <= WIDTH - 5 + 0.01, (tag, physical_x, width)
        assert y >= 4 and y + h <= HEIGHT - 4, (tag, y, h)
        return y + h

    def circle(self, x, y, r, stroke=NAVY, fill=None, weight=1):
        self.c.setStrokeColor(color(stroke, self.printing))
        self.c.setLineWidth(weight)
        if fill: self.c.setFillColor(color(fill, self.printing))
        self.c.circle(self.x(x), self.y(y), r * mm, fill=bool(fill), stroke=1)

    def path(self, pts, stroke, weight=0.8):
        p = self.c.beginPath()
        p.moveTo(self.x(pts[0][0]), self.y(pts[0][1]))
        for coords in pts[1:]:
            if len(coords) == 2: p.lineTo(self.x(coords[0]), self.y(coords[1]))
            else: p.curveTo(*[self.x(v) if i % 2 == 0 else self.y(v) for i, v in enumerate(coords)])
        self.c.setStrokeColor(color(stroke, self.printing))
        self.c.setLineWidth(weight)
        self.c.setLineCap(1)
        self.c.drawPath(p)

    def svg(self, file, x, y, width):
        drawing = svg2rlg(str(file))
        def convert(obj):
            if self.printing:
                for key in ('fillColor', 'strokeColor'):
                    v = getattr(obj, key, None)
                    if isinstance(v, colors.Color):
                        rgb = '#%02x%02x%02x' % tuple(round(c * 255) for c in (v.red, v.green, v.blue))
                        setattr(obj, key, color(rgb, True))
            for child in getattr(obj, 'contents', []): convert(child)
        convert(drawing)
        scale = width * mm / drawing.width
        h = drawing.height * scale
        self.c.saveState()
        self.c.translate(self.x(x), self.y(y) - h)
        self.c.scale(scale, scale)
        renderPDF.draw(drawing, self.c, 0, 0)
        self.c.restoreState()

    def image(self, file, x, y, w, h):
        im = Image.open(file).convert('RGB')
        if self.printing: im = ImageCms.applyTransform(im, TRANSFORM)
        self.c.drawImage(ImageReader(im), self.x(x), self.y(y + h), width=w * mm, height=h * mm)
        self.images.append({'file': str(file.relative_to(ROOT)), 'widthMm': w, 'heightMm': h,
                            'effectivePpi': round(im.width * 25.4 / w, 1), 'sha256': hashlib.sha256(file.read_bytes()).hexdigest()})

    def qr(self, url, x, y, size):
        code = QrCodeWidget(url, barLevel='Q', barFillColor=colors.CMYKColor(0, 0, 0, 1) if self.printing else colors.black,
                            barBorder=4)
        b = code.getBounds()
        scale = size * mm / (b[2] - b[0])
        d = Drawing(size * mm, size * mm, transform=[scale, 0, 0, scale, 0, 0])
        d.add(code)
        self.rect(x, y, size, size, '#FFFFFF')
        renderPDF.draw(d, self.c, self.x(x), self.y(y + size))

    def start(self):
        self.page += 1
        self.rect(-3, -3, WIDTH + 6, HEIGHT + 6, WARM)

    def finish_page(self, label):
        # Deliberately no slug or crop/fold marks: page size must equal either
        # the named net size or exactly that size plus 3 mm bleed on each side.
        self.c.showPage()

    def save(self):
        self.c.save()


def outside(l):
    l.start()
    l.rect(-3, -3, 73, 146, '#F3F5F3')
    # Back / primary action.
    d = DATA['back']
    x, w = 75, 60
    l.rect(x, 7, 14, 0.8, NAVY)
    l.text(d['headline'], x, 12, w, 19, 24, 'Semibold', NAVY)
    l.text(d['subhead'], x, 32, w, 8.5, 12, 'Medium', NAVY)
    l.text(d['intro'], x, 41, w, 8.2, 11.8)
    l.text(d['choices'], x, 57, w, 15, 20, 'Medium', NAVY)
    l.text(d['qualification'], x, 67, w, 7.5, 10.5, fill=MUTED)
    l.qr(d['primaryUrl'], x, 82, 24)
    l.text('扫码开始\nAI 判断力快测', x + 27, 84, 33, 9.2, 13, 'Semibold', NAVY)
    l.text('judgment.haaboo.com', x + 27, 97, 33, 7.0, 10, 'Medium', NAVY)
    l.line(x, 108, x + w, 108)
    l.text(d['more'], x, 111, w, 7.5, 10.2, fill=MUTED)
    l.qr(d['secondaryUrl'], x, 116, 20)
    l.text('扫码了解源点AI\n更多产品与内容', x + 24, 120, 36, 8, 10.6, 'Medium', NAVY)
    l.text('haaboo.com', x + 24, 130, 36, 7.2, 9, fill=MUTED)

    # Left / fold-in philosophy.
    d = DATA['why']
    x, w = 5, 60
    l.text(d['eyebrow'], x, 7, w, 6.8, 9, 'Medium', MUTED)
    y = l.text(d['headline'], x, 14, w, 13.5, 18, 'Semibold', NAVY) + 4
    for para in d['paragraphs']:
        y = l.text(para, x, y, w, 7.8, 11) + 2
    for q in d['questions']:
        y = l.text(q, x, y, w, 7.8, 11, 'Semibold', NAVY)
    l.line(x, y + 2.5, x + w, y + 2.5)
    y += 5.5
    for (title, text), accent in zip(d['values'], [NAVY, GREEN, INDIGO]):
        l.circle(x + 0.9, y + 1.8, 0.65, accent, weight=0.65)
        y = l.text(title, x + 3.5, y, w - 3.5, 8.5, 11.5, 'Semibold', NAVY)
        y = l.text(text, x + 3.5, y + 0.6, w - 3.5, 7.5, 10.5) + 2.4
    assert y < 127, ('why overflow', y)
    l.text(d['closing'], x, 129, w, 7.5, 10.5, 'Medium', NAVY)

    # Front / large type, official geometry, quiet path motif.
    d = DATA['cover']
    x, w = 145, 60
    l.svg(ROOT / 'public/assets/brand/yorigen-origin-y.svg', x, 10, 11)
    l.text(d['brand'], x + 16, 9, w - 16, 19, 25, 'Medium', NAVY)
    l.text(d['english'], x + 16.3, 20, w - 16.3, 6.7, 9, 'Medium', NAVY)
    l.text('\n'.join(d['headline']), x, 36, w, 22, 29, 'Semibold', NAVY)
    l.text(d['proposition'], x, 73, w, 9.6, 14, 'Semibold', NAVY)
    l.text(d['intro'], x, 84, w, 8.2, 12, fill=INK)
    l.path([(174, 123), (164, 121, 159, 116, 154, 113)], NAVY, 0.65)
    l.path([(174, 123), (174, 119, 174, 117, 174, 113)], GREEN, 0.85)
    l.path([(174, 123), (184, 120, 192, 116, 197, 113)], INDIGO, 0.85)
    l.circle(174, 123, 1.0, NAVY, NAVY, 0.5)
    l.circle(174, 112.5, 0.7, GREEN, None, 0.7)
    l.circle(197, 113, 0.7, INDIGO, None, 0.7)
    l.text(d['mission'], x, 131, w, 7.6, 10.5, 'Medium', NAVY)
    l.finish_page('OUTSIDE: FOLD-IN / BACK / FRONT; NOMINAL 70 + 70 + 70 mm')


def inside(l):
    l.start()
    l.text(DATA['inside']['headline'], 5, 4, 135, 12, 16, 'Semibold', NAVY, tag='spread-header')
    l.text(DATA['inside']['intro'], 5, 11, 200, 7.5, 10, fill=MUTED, tag='spread-header')
    l.text(DATA['back']['signature'], 145, 5, 60, 6.7, 9, 'Medium', NAVY, align=2)
    l.line(5, 17, 205, 17)
    for i, (d, accent) in enumerate(zip(DATA['inside']['products'], [NAVY, GREEN, INDIGO])):
        x, w = 70 * i + 5, 60
        l.rect(x, 21, 0.9, 10, accent)
        l.text(d['eyebrow'], x + 3.5, 20, w - 3.5, 6.0, 8, 'Medium', MUTED)
        l.text(d['name'], x + 3.5, 25, 12 if d['descriptor'] else w - 3.5, 13.2, 17, 'Semibold', NAVY)
        if d['descriptor']:
            l.text(d['descriptor'], x + 18, 27, w - 18, 7.5, 10, fill=MUTED)
        l.text(d['headline'], x, 34, w, 8.8, 12, 'Medium', NAVY)
        # Original film stills provide visual context; native vector text below
        # carries the readable product explanation at this compact trim size.
        framew = 38
        frameh = framew * 9 / 16
        l.image(HERE / 'assets' / (d['id'] + '.png'), x + (w - framew) / 2, 40, framew, frameh)
        y = 63
        # Keep the comma after the quoted capability phrase off the next
        # line. Only whitespace changes; the approved wording is untouched.
        intro = d['intro'].replace('，和“', '，\n和“')
        y = l.text(intro, x, y, w, 7.5, 10.2)
        if d['questions']:
            y += 0.8
            y = l.text('\n'.join(d['questions']), x, y, w, 7.5, 10.2, 'Medium', NAVY)
        if d['after']:
            y += 0.8
            y = l.text(d['after'], x, y, w, 7.5, 10.2)
        y += 2
        for title, text in d['values']:
            text = text.replace('，而是从', '，\n而是从')
            text = text.replace('换时间继续，', '换时间继续，\n')
            y = l.text(title, x, y, w, 7.8, 10.2, 'Semibold', NAVY)
            y = l.text(text, x, y + 0.4, w, 7.5, 10.2) + 1.6
        assert y <= 125, (d['id'], 'copy overflow', y)
        l.line(x, 126, x + w, 126, accent, 0.6)
        l.text(d['core'], x, 129, w, 8.6, 11.2, 'Semibold', NAVY)
        # The long-term proposition already appears verbatim as the headline.
    l.text(DATA['inside']['more'], 75, 133, 60, 6.7, 8, fill=MUTED, align=1)
    l.finish_page('INSIDE: AI JUDGMENT / AZHI / AZAO; NOMINAL 70 + 70 + 70 mm')


def finalize_pdf(source, target, printing, bleed):
    reader = PdfReader(source)
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    writer.pdf_header = '%PDF-1.4'
    writer.add_metadata({'/CreationDate': "D:20261010000000+08'00'", '/ModDate': "D:20261010000000+08'00'"})
    for p in writer.pages:
        pad = bleed
        p.mediabox = RectangleObject([0, 0, (WIDTH + 2 * pad) * mm, (HEIGHT + 2 * pad) * mm])
        p.trimbox = RectangleObject([pad * mm, pad * mm, (pad + WIDTH) * mm, (pad + HEIGHT) * mm])
        p.bleedbox = RectangleObject(p.mediabox)
        p.cropbox = p.mediabox
        p[NameObject('/UserUnit')] = NumberObject(1)
        p[NameObject('/Rotate')] = NumberObject(0)
    writer.root_object[NameObject('/ViewerPreferences')] = DictionaryObject({NameObject('/PrintScaling'): NameObject('/None')})
    if printing:
        profile = DecodedStreamObject()
        profile.set_data(ICC.read_bytes())
        profile[NameObject('/N')] = NumberObject(4)
        ref = writer._add_object(profile)
        oi = DictionaryObject({NameObject('/Type'): NameObject('/OutputIntent'), NameObject('/S'): NameObject('/GTS_PDFX'),
             NameObject('/OutputConditionIdentifier'): TextStringObject('Generic CMYK'),
             NameObject('/Info'): TextStringObject('Generic CMYK Profile; relative colorimetric'),
             NameObject('/DestOutputProfile'): ref})
        writer.root_object[NameObject('/OutputIntents')] = ArrayObject([writer._add_object(oi)])
    with open(target, 'wb') as f: writer.write(f)


def main():
    prepare_fonts()
    records = {}
    for name, bleed in EXPORTS:
        intermediate = TMP / name
        l = Layout(intermediate, True, bleed)
        outside(l)
        inside(l)
        l.save()
        finalize_pdf(intermediate, OUT / name, True, bleed)
        records[name] = {'bleedMm': bleed, 'textBoxes': l.boxes, 'images': l.images, 'sha256': hashlib.sha256((OUT / name).read_bytes()).hexdigest()}
        print(name)
    (TMP / 'layout-records.json').write_text(json.dumps(records, ensure_ascii=False, indent=2))


if __name__ == '__main__': main()
