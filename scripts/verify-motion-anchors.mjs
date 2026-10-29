import {createHash} from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {bundle} from "@remotion/bundler";
import {getCompositions, renderStill} from "@remotion/renderer";
import {projectRoot} from "./render-lib.mjs";

const anchors = [
  {id: "KF01", frame: 75, sha256: "4593846e29e8c078711f565437592191ba5b375c3b8854defeab6f7d7f6f121a"},
  {id: "KF02", frame: 210, sha256: "5f22bba38c974e298e955231b94c9bf7794bcb3b44fb3ff6e7b4b70e14db5dc9"},
  {id: "KF03", frame: 756, sha256: "a426c8a10f8d5b62cebe2c4d550426e82d6ddca6887e43c9d0bab3c73e6e1342"},
  {id: "KF04", frame: 1110, sha256: "d9ae0e09e4fd2289e9b33b0d26e60aa2409eda97d81247723bfd890b990ae21a"},
  {id: "KF05", frame: 1440, sha256: "d4e055112b98554872f190ed5237fbcab8fec9bb0dafc331805842dd8c9c0c2e"},
  {id: "KF06", frame: 1770, sha256: "25f2f96d0ba600179fd90dc2f76699ed7e7364bd97a0d316cc0b43993aa00978"},
  {id: "KF07", frame: 2235, sha256: "0da1b492a880c3431dc5cc421099c4cda1a05d243e2d53f269d052f537e4c9ec"},
];

const sha256 = async (file) => createHash("sha256").update(await fs.readFile(file)).digest("hex");
const verificationDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "yorigen-motion-anchors-"));

const serveUrl = await bundle({
  entryPoint: path.join(projectRoot, "src/index.ts"),
  publicDir: path.join(projectRoot, "public"),
  onProgress: () => undefined,
});
const compositions = await getCompositions(serveUrl, {logLevel: "warn"});
const composition = compositions.find((item) => item.id === "YorigenMaster4K");
if (!composition) {
  throw new Error("YorigenMaster4K composition was not discovered.");
}

const failures = [];
try {
  for (const anchor of anchors) {
    const renderedFile = path.join(verificationDirectory, `${anchor.id}_master.png`);
    await renderStill({
      composition,
      serveUrl,
      output: renderedFile,
      frame: anchor.frame,
      imageFormat: "png",
      logLevel: "warn",
      overwrite: true,
    });
    const renderedHash = await sha256(renderedFile);
    if (renderedHash !== anchor.sha256) {
      failures.push(`${anchor.id} master frame ${anchor.frame} drifted: ${renderedHash} !== ${anchor.sha256}`);
      console.error(`${anchor.id} frame ${anchor.frame} FAIL ${renderedHash}`);
      continue;
    }
    console.log(`${anchor.id} frame ${anchor.frame} PASS ${renderedHash}`);
  }
} finally {
  await fs.rm(verificationDirectory, {recursive: true, force: true});
}

if (failures.length > 0) {
  throw new Error(`Motion anchor verification failed:\n${failures.join("\n")}`);
}

console.log("Motion anchors 7/7 bit-identical PASS.");
