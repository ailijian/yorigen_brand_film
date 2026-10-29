import fs from "node:fs/promises";
import path from "node:path";
import {bundle} from "@remotion/bundler";
import {getCompositions, renderMedia} from "@remotion/renderer";
import {projectRoot} from "./render-lib.mjs";

const outputDirectory = path.join(projectRoot, "renders/final");
await fs.mkdir(outputDirectory, {recursive: true});
const serveUrl = await bundle({
  entryPoint: path.join(projectRoot, "src/index.ts"),
  publicDir: path.join(projectRoot, "public"),
  onProgress: () => undefined,
});
const compositions = await getCompositions(serveUrl, {logLevel: "warn"});
const compositionId = "YorigenFinalSubtitleNoBgm1080";
const filename = "Yorigen_Final_Subtitle_NoBGM_1080p.mp4";
const composition = compositions.find((item) => item.id === compositionId);
if (!composition) throw new Error(`${compositionId} composition was not discovered.`);
let lastReported = -1;
await renderMedia({
  composition,
  serveUrl,
  outputLocation: path.join(outputDirectory, filename),
  frameRange: [0, 2279],
  codec: "h264",
  pixelFormat: "yuv420p",
  crf: 12,
  x264Preset: "medium",
  imageFormat: "jpeg",
  jpegQuality: 96,
  overwrite: true,
  logLevel: "warn",
  onProgress: ({progress}) => {
    const percent = Math.floor(progress * 10) * 10;
    if (percent !== lastReported && percent % 20 === 0) {
      lastReported = percent;
      console.log(`${filename} ${percent}%`);
    }
  },
});
console.log(`${filename} rendered without an audio stream`);
