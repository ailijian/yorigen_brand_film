import fs from "node:fs/promises";
import path from "node:path";
import {subtitleEvents} from "../src/subtitles/subtitleTimeline.ts";
import {projectRoot} from "./render-lib.mjs";

const outputDirectory = path.join(projectRoot, "renders/final");
await fs.mkdir(outputDirectory, {recursive: true});

const formatSrtTime = (seconds) => {
  const milliseconds = Math.round(seconds * 1000);
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const secs = Math.floor((milliseconds % 60000) / 1000);
  const millis = milliseconds % 1000;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(millis).padStart(3, "0")}`;
};

const timing = subtitleEvents.map((event) => ({
  id: event.id,
  segmentId: event.segmentId,
  start: event.startSeconds,
  end: event.endSeconds,
  text: event.text,
}));
const srt = subtitleEvents.map((event, index) => [
  String(index + 1),
  `${formatSrtTime(event.startSeconds)} --> ${formatSrtTime(event.endSeconds)}`,
  event.text,
].join("\n")).join("\n\n");

await Promise.all([
  fs.writeFile(path.join(outputDirectory, "Yorigen_Subtitle_Timing.json"), `${JSON.stringify(timing, null, 2)}\n`, "utf8"),
  fs.writeFile(path.join(outputDirectory, "Yorigen_Subtitle_SRT.srt"), `${srt}\n`, "utf8"),
]);
console.log(`Generated ${subtitleEvents.length} subtitle events.`);
