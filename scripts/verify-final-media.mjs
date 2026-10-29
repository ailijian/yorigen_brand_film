import {execFile} from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import {promisify} from "node:util";
import {projectRoot} from "./render-lib.mjs";

const execFileAsync = promisify(execFile);
const failures = [];
const finalDirectory = path.join(projectRoot, "renders/final");
const filename = "Yorigen_Final_Subtitle_NoBGM_1080p.mp4";
const file = path.join(finalDirectory, filename);

const pnpmDirectory = path.join(projectRoot, "node_modules/.pnpm");
const compositorEntry = (await fs.readdir(pnpmDirectory)).find((entry) => entry.startsWith("@remotion+compositor-darwin-"));
if (!compositorEntry) throw new Error("Local Remotion compositor was not found.");
const compositorPackage = compositorEntry.match(/^@remotion\+(.+)@[^@]+$/)?.[1];
if (!compositorPackage) throw new Error(`Unable to resolve compositor package from ${compositorEntry}`);
const compositorDirectory = path.join(pnpmDirectory, compositorEntry, "node_modules/@remotion", compositorPackage);
const ffprobe = path.join(compositorDirectory, "ffprobe");
const environment = {...process.env, DYLD_LIBRARY_PATH: compositorDirectory};
const {stdout} = await execFileAsync(ffprobe, ["-v", "error", "-show_entries", "format=duration:stream=codec_type,codec_name,width,height,r_frame_rate", "-of", "json", file], {env: environment, maxBuffer: 1024 * 1024});
const info = JSON.parse(stdout);
const duration = Number(info.format?.duration);
const videoStreams = (info.streams ?? []).filter((stream) => stream.codec_type === "video");
const audioStreams = (info.streams ?? []).filter((stream) => stream.codec_type === "audio");
if (Math.abs(duration - 76) > 0.08) failures.push(`${filename} duration is ${duration}s`);
if (videoStreams.length !== 1) failures.push(`${filename} expected one video stream, found ${videoStreams.length}`);
if (audioStreams.length !== 0) failures.push(`${filename} must not contain an audio stream`);
if (videoStreams[0]?.codec_name !== "h264") failures.push(`${filename} video is not H.264`);
if (videoStreams[0]?.width !== 1920 || videoStreams[0]?.height !== 1080) failures.push(`${filename} is not 1920x1080`);
if (videoStreams[0]?.r_frame_rate !== "30/1") failures.push(`${filename} is not 30fps`);

for (const required of ["Yorigen_Subtitle_SRT.srt", "Yorigen_Subtitle_Timing.json"]) {
  try {
    await fs.access(path.join(finalDirectory, required));
  } catch {
    failures.push(`${required} is missing`);
  }
}

const sourceFiles = [];
const collect = async (directory) => {
  for (const entry of await fs.readdir(directory, {withFileTypes: true})) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(absolute);
    else sourceFiles.push(absolute);
  }
};
await collect(path.join(projectRoot, "src"));
const packageJson = await fs.readFile(path.join(projectRoot, "package.json"), "utf8");
for (const sourceFile of sourceFiles) {
  const content = await fs.readFile(sourceFile, "utf8");
  if (/FilmAudioTracks|audio\/final|staticFile\([^)]*audio|<Audio\b/iu.test(content)) failures.push(`audio runtime reference remains in ${path.relative(projectRoot, sourceFile)}`);
}
if (/generate:bgm|verify:bgm|verify:final-audio|FilmAudioTracks/iu.test(packageJson)) failures.push("BGM pipeline script remains in package.json");

if (failures.length > 0) throw new Error(`Final media validation failed:\n${failures.join("\n")}`);
console.log("Final media PASS: 76.000s, 1920x1080, 30fps, H.264, burned-in subtitles, no audio stream, no BGM runtime.");
