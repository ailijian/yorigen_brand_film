import type {CSSProperties, ReactNode} from "react";
import {filmTokens, typeScale} from "../tokens/filmTokens";

type TextProps = {
  children: ReactNode;
  style?: CSSProperties;
  onDark?: boolean;
};

export const Eyebrow = ({children, style, onDark = false}: TextProps) => (
  <div
    style={{
      fontFamily: filmTokens.typography.mono,
      fontSize: typeScale.eyebrow,
      lineHeight: 1.2,
      letterSpacing: 4.5,
      textTransform: "uppercase",
      color: onDark ? filmTokens.colors.darkMuted : filmTokens.colors.muted,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Heading = ({children, style, onDark = false}: TextProps) => (
  <div
    style={{
      fontSize: typeScale.heading,
      lineHeight: 1.12,
      letterSpacing: -3.6,
      fontWeight: filmTokens.typography.weight.medium,
      color: onDark ? filmTokens.colors.darkText : filmTokens.colors.textNavy,
      whiteSpace: "pre-line",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Body = ({children, style, onDark = false}: TextProps) => (
  <div
    style={{
      fontSize: typeScale.body,
      lineHeight: 1.5,
      fontWeight: filmTokens.typography.weight.regular,
      color: onDark ? filmTokens.colors.darkMuted : filmTokens.colors.muted,
      whiteSpace: "pre-line",
      ...style,
    }}
  >
    {children}
  </div>
);
