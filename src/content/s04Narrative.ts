import {Easing, interpolate} from "remotion";

const controlledEase = Easing.bezier(0.33, 0, 0.2, 1);

const value = (frame: number, inputRange: number[], outputRange: number[]) =>
  interpolate(frame, inputRange, outputRange, {
    easing: controlledEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const s04NarrativeFrames = {
  judgmentReady: 24,
  judgmentExitStart: 117,
  growthReady: 129,
  growthExitStart: 228,
  controlEnterStart: 237,
  controlOnlyStart: 243,
  semanticCheck: 270,
  synthesisStart: 348,
  approvedAnchor: 366,
  shotEnd: 390,
} as const;

export type S04NarrativeState = {
  judgment: number;
  growth: number;
  control: number;
  judgmentProgress: number;
  growthProgress: number;
  controlProgress: number;
  synthesis: number;
  origin: number;
};

export const getS04NarrativeState = (frame: number): S04NarrativeState => {
  const {
    judgmentReady,
    judgmentExitStart,
    growthReady,
    growthExitStart,
    controlEnterStart,
    controlOnlyStart,
    synthesisStart,
    approvedAnchor,
  } = s04NarrativeFrames;

  const judgment = frame < judgmentExitStart
    ? value(frame, [0, judgmentReady], [0, 1])
    : frame < growthReady
      ? value(frame, [judgmentExitStart, growthReady], [1, 0])
      : frame < synthesisStart
        ? 0
        : value(frame, [synthesisStart, approvedAnchor], [0, 1]);

  const growth = frame < judgmentExitStart
    ? 0
    : frame < growthReady
      ? value(frame, [judgmentExitStart, growthReady], [0, 1])
      : frame < growthExitStart
        ? 1
        : frame < controlOnlyStart
          ? value(frame, [growthExitStart, controlOnlyStart], [1, 0])
          : frame < synthesisStart
            ? 0
            : value(frame, [synthesisStart, approvedAnchor], [0, 1]);

  const control = frame < controlEnterStart
    ? 0
    : value(frame, [controlEnterStart, controlOnlyStart], [0, 1]);

  return {
    judgment,
    growth,
    control,
    judgmentProgress: value(frame, [0, judgmentReady], [0, 1]),
    growthProgress: value(frame, [judgmentExitStart, growthReady], [0, 1]),
    controlProgress: value(frame, [controlEnterStart, controlOnlyStart], [0, 1]),
    synthesis: value(frame, [synthesisStart, approvedAnchor], [0, 1]),
    origin: 1,
  };
};
