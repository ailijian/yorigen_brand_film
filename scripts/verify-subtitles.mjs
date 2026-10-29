import fs from "node:fs/promises";
import path from "node:path";
import {narrationSegments} from "../src/audio/narrationScript.ts";
import {subtitleEvents, subtitlePlacements} from "../src/subtitles/subtitleTimeline.ts";
import {projectRoot} from "./render-lib.mjs";

const failures = [];
const normalized = (text) => text.replaceAll("\n", "");
for (const [index, event] of subtitleEvents.entries()) {
  const previous = subtitleEvents[index - 1];
  if (previous && event.startSeconds < previous.endSeconds) failures.push(`${event.id} overlaps ${previous.id}`);
  if (event.startSeconds >= event.endSeconds) failures.push(`${event.id} has a non-positive duration`);
  if (event.text.split("\n").length > 2) failures.push(`${event.id} exceeds two lines`);
  const source = narrationSegments.find((segment) => segment.id === event.segmentId);
  if (!source || source.kind !== "speech") failures.push(`${event.id} does not map to a speech authority segment`);
  if (source && (event.startSeconds < source.startSeconds || event.endSeconds > source.endSeconds)) failures.push(`${event.id} falls outside segment ${source.id}`);
  for (const silence of narrationSegments.filter((segment) => segment.kind === "silence")) {
    if (event.startSeconds < silence.endSeconds && event.endSeconds > silence.startSeconds) failures.push(`${event.id} overlaps silence ${silence.id}`);
  }
}

for (const segment of narrationSegments.filter((item) => item.kind === "speech" && item.id !== "18")) {
  const combined = subtitleEvents.filter((event) => event.segmentId === segment.id).map((event) => normalized(event.text)).join("");
  if (combined !== normalized(segment.text ?? "")) failures.push(`segment ${segment.id} subtitle text drifted from narration authority`);
}
const finalEventText = subtitleEvents.filter((event) => event.segmentId === "18").map((event) => normalized(event.text)).join("");
if (finalEventText !== "源点AI。") failures.push("segment 18 must subtitle only ‘源点AI。’");
if (subtitleEvents.some((event) => event.text.includes("看清自己，织成能力，掌控成果。"))) failures.push("final on-picture lockup was duplicated as a subtitle");

for (const [name, placement] of Object.entries(subtitlePlacements)) {
  if (placement.left < 56 || placement.bottom < 48) failures.push(`${name} violates the 1080p left/bottom safe area`);
  if (placement.left + placement.maxWidth > 1920 - 56) failures.push(`${name} violates the 1080p right safe area`);
}

const outputDirectory = path.join(projectRoot, "renders/final");
for (const filename of ["Yorigen_Subtitle_Timing.json", "Yorigen_Subtitle_SRT.srt"]) {
  try {
    await fs.access(path.join(outputDirectory, filename));
  } catch {
    failures.push(`${filename} has not been generated`);
  }
}

if (failures.length > 0) throw new Error(`Subtitle validation failed:\n${failures.join("\n")}`);
console.log(`Subtitle timing PASS: ${subtitleEvents.length} events, no overlap, silence preserved, max two lines, safe-area PASS.`);
