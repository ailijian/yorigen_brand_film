import type {CSSProperties} from "react";
import {filmTokens} from "../tokens/filmTokens";

type BrandPathProps = {
  d: string;
  color?: string;
  width?: number;
  opacity?: number;
  dash?: string;
  progress?: number;
  style?: CSSProperties;
};

export const BrandPath = ({d, color = filmTokens.colors.ghost, width = 4, opacity = 1, dash, progress, style}: BrandPathProps) => {
  const drawing = typeof progress === "number" && progress < 1;
  return (
  <svg
    viewBox="0 0 3840 2160"
    preserveAspectRatio="none"
    style={{position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", ...style}}
  >
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={drawing ? "1 1" : dash}
      strokeDashoffset={drawing ? 1 - progress : undefined}
      pathLength={drawing ? 1 : undefined}
      opacity={opacity}
    />
  </svg>
  );
};
