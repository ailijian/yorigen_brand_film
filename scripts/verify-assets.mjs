import {createHash} from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import {projectRoot} from "./render-lib.mjs";

const expectedAssets = new Map([
  ["public/assets/brand/yorigen-brand-lockup.svg", "daead641ae2f2c4995e3f9985abbccb99f1910cd9e377db8e492efd7db670ef9"],
  ["public/assets/brand/yorigen-origin-y.svg", "e72df8a37e8211778b290c054f392fa94ee1dcc59002dc192f5fccc47d2ae863"],
  ["public/assets/judgment/J3-01.png", "48a752855a745a7782e71e713c8f9cb4fb1751db66ed3035e27c093b2d009484"],
  ["public/assets/judgment/J3-02.png", "3a23e7584daade8fc6990e022d1c78a97230b84f2f67e6dc6a6831e80227d2ee"],
  ["public/assets/judgment/J3-03.png", "30bc2360fab90f6e6dc4ad68b65b53a6b951ad33d106d17587d868ebb3ae75ca"],
  ["public/assets/judgment/J3-04.png", "71eea4ecf0b1ce3cfb5a45d7d1a75e4f1b492c6cdafae5128133eab021b3c6bd"],
  ["public/assets/azhi/AZ1.png", "176564f3bec317dc9041bc962d72ad52e87a2922ec03fb3918230d747958e10d"],
  ["public/assets/azhi/AZ2.png", "19d7bcb37410b68cea9337fbb4b1403570dd1355caff9b75053603a386a3de9a"],
  ["public/assets/azhi/AZ3.png", "80313f1eca5b0af7dccdebd7fab6fe4c8f71eeecb116d60a0f8176f118d48f6b"],
  ["public/assets/azao/ZA2-01-claim.png", "c9eed51f82064371e81d2dff140dfb782b63f0f83e14a36d8e46ffcb1745d01b"],
  ["public/assets/azao/ZA2-02-preview.png", "bddddc41204f84f879c11275b56af6fdfa8bc7b9f55ee5504d900cb30f353025"],
  ["public/assets/azao/ZA2-03-boundary.png", "448c6a9d3b37e51f4bc7cf9c7d86976538a09dc99c03fb0c630b52ea81d16c2d"],
  ["public/assets/azao/ZA2-04-evidence.png", "e024917cff1da72ee8182c89364aefd2f390c9f9a4dc6aad15fc6a28c271334f"],
]);

for (const [relativePath, expectedHash] of expectedAssets) {
  const contents = await fs.readFile(path.join(projectRoot, relativePath));
  const actualHash = createHash("sha256").update(contents).digest("hex");
  if (actualHash !== expectedHash) {
    throw new Error(`${relativePath} checksum drifted: ${actualHash}`);
  }
}

const sourceDirectory = path.join(projectRoot, "src");
const sourceFiles = [];
const walk = async (directory) => {
  for (const entry of await fs.readdir(directory, {withFileTypes: true})) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else if (/\.(ts|tsx)$/u.test(entry.name)) sourceFiles.push(absolute);
  }
};
await walk(sourceDirectory);

const forbidden = [
  {pattern: /https?:\/\//u, message: "external network URL"},
  {pattern: /\bfetch\s*\(/u, message: "network fetch"},
  {pattern: /XMLHttpRequest|axios/u, message: "network client"},
  {pattern: /gate2\/archive|assets\/archive/u, message: "archive asset"},
  {pattern: /yorigen-mark-mono|brand\/V1/u, message: "old logo reference"},
  {pattern: /19100009641|123456/u, message: "test credential or user identifier"},
  {pattern: /ai_builder_(web|azhi|coach)|ai_judgment-s1-staging/u, message: "product repository runtime import"},
];

for (const sourceFile of sourceFiles) {
  const contents = await fs.readFile(sourceFile, "utf8");
  for (const rule of forbidden) {
    if (rule.pattern.test(contents)) {
      throw new Error(`${path.relative(projectRoot, sourceFile)} contains forbidden ${rule.message}.`);
    }
  }
}

console.log(`Verified ${expectedAssets.size} frozen assets and ${sourceFiles.length} film source files.`);
