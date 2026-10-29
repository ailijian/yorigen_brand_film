import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const require = createRequire(import.meta.url);
const {chromium} = require('/Users/lijian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(import.meta.dirname, '../..');
const out = path.join(root, 'output/poster');
const temp = path.join(root, 'tmp/poster');
await fs.mkdir(temp, {recursive: true});
const browser = await chromium.launch({headless: true, executablePath: path.join(root, 'node_modules/.remotion/chrome-headless-shell/mac-x64/chrome-headless-shell-mac-x64/chrome-headless-shell'), args: ['--force-color-profile=srgb']});
try {
  const page = await browser.newPage({viewport: {width: 3840, height: 2160}, deviceScaleFactor: 1});
  const errors = [];
  const externalRequests = [];
  page.on('pageerror', err => errors.push(err.message));
  await page.route(/^https?:\/\//, route => { externalRequests.push(route.request().url()); return route.abort(); });
  await page.goto(pathToFileURL(path.join(out, 'Yorigen_Brand_Poster_3840x2160.html')).href);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(img => img.decode()));
  });
  const check = await page.evaluate(() => {
    const rect = el => { const r = el.getBoundingClientRect(); return {x: r.x, y: r.y, w: r.width, h: r.height}; };
    const safe = [...document.querySelectorAll('[data-safe]')].map(el => ({name: el.alt || el.textContent.trim(), ...rect(el)}));
    const overflow = [...document.querySelectorAll('section, article, h2, h3, p, li')].filter(el => el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1).map(el => el.className || el.tagName);
    return {
      canvas: rect(document.getElementById('poster')),
      safe,
      overflow,
      bodyText: document.getElementById('poster').innerText,
      images: [...document.images].map(el => ({source: el.dataset.source || el.dataset.qr || 'lockup', natural: [el.naturalWidth, el.naturalHeight], loaded: el.complete && el.naturalWidth > 0, ...rect(el)})),
      qr: [...document.querySelectorAll('[data-qr]')].map(el => ({id: el.dataset.qr, ...rect(el)})),
      actionElements: [...document.querySelectorAll('.action [data-safe]')].map(el => ({name: el.alt || el.textContent.trim(), ...rect(el)})),
      screenshotFontFamily: getComputedStyle(document.body).fontFamily,
    };
  });
  assert.deepEqual(check.canvas, {x: 0, y: 0, w: 3840, h: 2160});
  assert.equal(check.overflow.length, 0, `Overflow: ${check.overflow}`);
  assert.equal(errors.length, 0, errors.join('\n'));
  assert.equal(externalRequests.length, 0, 'Poster must render offline');
  for (const r of check.safe) {
    assert(r.x >= 159.9 && r.y >= 159.9 && r.x + r.w <= 3680.1 && r.y + r.h <= 2000.1, `Safety margin: ${JSON.stringify(r)}`);
  }
  for (let i = 1; i < check.actionElements.length; i++) {
    const a = check.actionElements[i - 1];
    const b = check.actionElements[i];
    assert(b.y >= a.y + a.h + 10, `Action elements collide: ${a.name} / ${b.name}`);
  }
  for (const img of check.images) {
    assert(img.loaded, `Broken image: ${img.source}`);
    assert(Math.abs(img.w / img.h - img.natural[0] / img.natural[1]) < .01, `Distorted image: ${img.source}`);
  }
  const compact = s => s.replace(/\s+/g, '');
  const required = [
    '让 AI 帮你学习，帮你做事。', '源点AI，帮你用好 AI：',
    '分清 AI 的回答靠不靠谱', '边学边练，把 AI 用起来', '让 AI 帮你做，自己把好关',
    'AI 来帮忙，主意你来拿。', '测一测 · 学一学 · 做一做',
    'AI 判断力快测', 'AI 的回答，你知道该不该信？', '几分钟，看看你会怎么选',
    '阿织', '想学会用 AI？从你想做的事开始', '边学边练，慢慢变熟练',
    '阿造', '用 AI 做软件，进展和结果看得清', '做得好不好，你来把关',
    '现在做到哪', '结果好不好', '下一步做啥', '选你感兴趣的，试试看',
    '拿起手机，试一试', 'AI 的话，该不该信？', '扫一下，花几分钟看看你会怎么选',
    '源点AI官网', '扫码看看，还有哪些产品和课程', '不妨从一个小测试开始。',
    'judgment.haaboo.com', 'haaboo.com',
  ];
  for (const text of required) assert(compact(check.bodyText).includes(compact(text)), `Missing copy: ${text}`);
  await page.screenshot({path: path.join(out, 'Yorigen_Brand_Poster_3840x2160.png'), type: 'png'});
  await page.setViewportSize({width: 1920, height: 1080});
  await page.waitForFunction(() => Math.abs(document.getElementById('poster').getBoundingClientRect().width - 1920) < .1);
  await page.screenshot({path: path.join(temp, 'preview-1920.png'), type: 'png'});
  await page.setViewportSize({width: 390, height: 844});
  await page.waitForFunction(() => Math.abs(document.getElementById('poster').getBoundingClientRect().width - 390) < .1);
  const mobile = await page.evaluate(() => {
    const r = document.getElementById('poster').getBoundingClientRect();
    return {x: r.x, y: r.y, w: r.width, h: r.height, scroll: document.body.scrollWidth};
  });
  assert(mobile.x >= -.1 && mobile.x + mobile.w <= 390.1 && mobile.y >= -.1 && mobile.y + mobile.h <= 844.1 && mobile.scroll <= 390, 'Mobile fit failed');
  const htmlSha256 = createHash('sha256').update(await fs.readFile(path.join(out, 'Yorigen_Brand_Poster_3840x2160.html'))).digest('hex');
  const renderScriptSha256 = createHash('sha256').update(await fs.readFile(new URL(import.meta.url))).digest('hex');
  await fs.writeFile(path.join(out, 'layout-check.json'), JSON.stringify({verdict: 'PASS', htmlSha256, renderScriptSha256, ...check, copyStringsChecked: required.length, externalRequests, errors, mobile}, null, 2));
  console.log(JSON.stringify({verdict: 'PASS', size: [3840, 2160], requiredStrings: required.length, externalRequests, errors, mobile}));
} finally {
  await browser.close();
}
