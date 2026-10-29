export const FPS = 30;
export const MASTER_WIDTH = 3840;
export const MASTER_HEIGHT = 2160;
export const PREVIEW_WIDTH = 1920;
export const PREVIEW_HEIGHT = 1080;
export const MASTER_DURATION_IN_FRAMES = 2280;

export const shotTiming = {
  S01: {from: 0, duration: 105},
  S02: {from: 105, duration: 165},
  S03: {from: 270, duration: 120},
  S04: {from: 390, duration: 390},
  S05: {from: 780, duration: 165},
  S06: {from: 945, duration: 300},
  S07: {from: 1245, duration: 330},
  S08: {from: 1575, duration: 390},
  S09: {from: 1965, duration: 150},
  S10: {from: 2115, duration: 165},
} as const;
