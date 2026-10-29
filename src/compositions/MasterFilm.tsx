import {AbsoluteFill, Sequence} from "remotion";
import {shotTiming} from "../content/shotTiming";
import {S01Origin} from "../shots/S01Origin";
import {S02Acceleration} from "../shots/S02Acceleration";
import {S03Silence} from "../shots/S03Silence";
import {S04Questions} from "../shots/S04Questions";
import {S05Yorigen} from "../shots/S05Yorigen";
import {S06Assessment} from "../shots/S06Assessment";
import {S07Azhi} from "../shots/S07Azhi";
import {S08Azao} from "../shots/S08Azao";
import {S09Parallel} from "../shots/S09Parallel";
import {S10BrandLock} from "../shots/S10BrandLock";

const shots = [
  {timing: shotTiming.S01, component: S01Origin},
  {timing: shotTiming.S02, component: S02Acceleration},
  {timing: shotTiming.S03, component: S03Silence},
  {timing: shotTiming.S04, component: S04Questions},
  {timing: shotTiming.S05, component: S05Yorigen},
  {timing: shotTiming.S06, component: S06Assessment},
  {timing: shotTiming.S07, component: S07Azhi},
  {timing: shotTiming.S08, component: S08Azao},
  {timing: shotTiming.S09, component: S09Parallel},
  {timing: shotTiming.S10, component: S10BrandLock},
] as const;

export const MasterFilm = () => (
  <AbsoluteFill>
    {shots.map(({timing, component: Shot}, index) => (
      <Sequence key={index} from={timing.from} durationInFrames={timing.duration} name={`S${String(index + 1).padStart(2, "0")}`}>
        <Shot />
      </Sequence>
    ))}
  </AbsoluteFill>
);
