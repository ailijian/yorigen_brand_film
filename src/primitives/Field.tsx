import type {CSSProperties, ReactNode} from "react";
import {AbsoluteFill} from "remotion";
import {filmTokens} from "../tokens/filmTokens";

type FieldProps = {
  children?: ReactNode;
  contentStyle?: CSSProperties;
  mode: "night" | "warm";
  style?: CSSProperties;
};

export const Field = ({children, contentStyle, mode, style}: FieldProps) => {
  const night = mode === "night";
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        color: night ? filmTokens.colors.darkText : filmTokens.colors.textNavy,
        fontFamily: filmTokens.typography.family,
        backgroundColor: night ? filmTokens.colors.deepestNavy : filmTokens.colors.warmCanvas,
        backgroundImage: night
          ? "none"
          : "radial-gradient(circle at 56% 34%, rgba(255,255,255,0.94), rgba(251,251,248,0) 38%), linear-gradient(180deg, #FBFBF8 0%, #F7F6F2 100%)",
        ...style,
      }}
    >
      <AbsoluteFill style={contentStyle}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
