import type {CSSProperties} from "react";
import {filmTokens} from "../tokens/filmTokens";

type GrowthSignalProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  progress?: number;
  checkpointOpacity?: number;
  style?: CSSProperties;
};

export const GrowthSignal = ({x = 0, y = 0, width = 1500, height = 420, progress, checkpointOpacity = 1, style}: GrowthSignalProps) => {
  const drawing = typeof progress === "number" && progress < 1;
  return (
  <svg width={width} height={height} viewBox="0 0 1500 420" style={{position: "absolute", left: x, top: y, overflow: "visible", ...style}}>
    <path d="M 74 318 C 320 318, 360 118, 612 172 S 980 352, 1242 140" fill="none" stroke={filmTokens.colors.hairline} strokeWidth="18" strokeLinecap="round" />
    <path
      d="M 74 318 C 320 318, 360 118, 612 172 S 980 352, 1242 140"
      fill="none"
      stroke={filmTokens.colors.growth}
      strokeWidth="18"
      strokeLinecap="round"
      strokeDasharray={drawing ? "1 1" : undefined}
      strokeDashoffset={drawing ? 1 - progress : undefined}
      pathLength={drawing ? 1 : undefined}
    />
    <circle cx="74" cy="318" r="29" fill={filmTokens.colors.growth} />
    {checkpointOpacity >= 1 ? (
      <>
        <circle cx="1242" cy="140" r="42" fill={filmTokens.colors.warmCanvas} stroke={filmTokens.colors.growth} strokeWidth="16" />
        <path d="M 1300 140 H 1450" stroke={filmTokens.colors.hairline} strokeWidth="8" strokeLinecap="round" strokeDasharray="18 24" />
      </>
    ) : (
      <g opacity={checkpointOpacity}>
        <circle cx="1242" cy="140" r="42" fill={filmTokens.colors.warmCanvas} stroke={filmTokens.colors.growth} strokeWidth="16" />
        <path d="M 1300 140 H 1450" stroke={filmTokens.colors.hairline} strokeWidth="8" strokeLinecap="round" strokeDasharray="18 24" />
      </g>
    )}
  </svg>
  );
};
