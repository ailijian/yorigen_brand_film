import assert from "node:assert/strict";
import {getS04NarrativeState, s04NarrativeFrames} from "../src/content/s04Narrative.ts";

const hidden = 0;
const visible = 1;
const atSemanticCheck = getS04NarrativeState(s04NarrativeFrames.semanticCheck);

assert.equal(atSemanticCheck.origin, visible, "Origin must remain visible at master frame 660.");
assert.equal(atSemanticCheck.control, visible, "Control must be fully active at master frame 660.");
assert.equal(atSemanticCheck.judgment, hidden, "Judgment must be fully hidden at master frame 660.");
assert.equal(atSemanticCheck.growth, hidden, "Growth must be fully hidden at master frame 660.");

for (let frame = s04NarrativeFrames.controlOnlyStart; frame < s04NarrativeFrames.synthesisStart; frame += 1) {
  const state = getS04NarrativeState(frame);
  assert.equal(state.origin, visible, `Origin must remain visible at S04 frame ${frame}.`);
  assert.equal(state.control, visible, `Control must remain active at S04 frame ${frame}.`);
  assert.equal(state.judgment, hidden, `Judgment reappeared early at S04 frame ${frame}.`);
  assert.equal(state.growth, hidden, `Growth reappeared early at S04 frame ${frame}.`);
}

const atApprovedAnchor = getS04NarrativeState(s04NarrativeFrames.approvedAnchor);
assert.equal(atApprovedAnchor.origin, visible);
assert.equal(atApprovedAnchor.judgment, visible);
assert.equal(atApprovedAnchor.growth, visible);
assert.equal(atApprovedAnchor.control, visible);

console.log("S04 narrative PASS: frame 660 is Control-only; frame 756 is Three Directions.");
