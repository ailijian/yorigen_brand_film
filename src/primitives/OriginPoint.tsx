import type {CSSProperties} from "react";
import {filmTokens} from "../tokens/filmTokens";

type OriginPointProps = {
  x: number | string;
  y: number | string;
  size?: number;
  onDark?: boolean;
  halo?: boolean;
  style?: CSSProperties;
};

export const OriginPoint = ({x, y, size = 30, onDark = false, halo = true, style}: OriginPointProps) => {
  const core = onDark ? filmTokens.colors.darkText : filmTokens.colors.deepNavy;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        background: core,
        boxShadow: halo
          ? `0 0 0 ${Math.round(size * 0.55)}px ${onDark ? "rgba(234,240,242,0.08)" : "rgba(13,43,69,0.08)"}, 0 0 ${size * 2.8}px ${onDark ? "rgba(156,199,210,0.22)" : "rgba(13,43,69,0.16)"}`
          : undefined,
        ...style,
      }}
    />
  );
};
