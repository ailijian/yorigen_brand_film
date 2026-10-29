import path from 'node:path';
import fs from 'node:fs/promises';
import {bundle} from '@remotion/bundler';
import {getCompositions, renderStill} from '@remotion/renderer';

const root = path.resolve(import.meta.dirname, '../..');
const output = path.join(root, 'print/trifold/assets');
await fs.mkdir(output, {recursive: true});
const serveUrl = await bundle({entryPoint: path.join(root, 'src/index.ts'), publicDir: path.join(root, 'public')});
const compositions = await getCompositions(serveUrl, {logLevel: 'warn'});
const composition = compositions.find((c) => c.id === 'YorigenMaster4K');
if (!composition) throw new Error('Locked master missing');
// Actual frozen film surfaces; avoid the legacy protected-anchor layout branches.
for (const [name, frame] of [['judgment', 1110], ['azhi', 1441], ['azao', 1815]]) {
  await renderStill({serveUrl, composition, frame, output: path.join(output, `${name}.png`), imageFormat: 'png', overwrite: true, logLevel: 'warn'});
  console.log(`${name}: master frame ${frame}`);
}
