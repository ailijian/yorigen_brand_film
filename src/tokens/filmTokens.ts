export const filmTokens = {
  colors: {
    warmCanvas: "#FBFBF8",
    surface: "#FFFFFF",
    neutralPlane: "#F7F6F2",
    deepestNavy: "#071722",
    deepNavy: "#0D2B45",
    textNavy: "#102A3E",
    muted: "#6D7E8C",
    hairline: "#D8E0E6",
    ghost: "#AEBCC6",
    growth: "#22C39E",
    control: "#5968F2",
    darkText: "#EAF0F2",
    darkMuted: "#8FA1AC",
    source: "#9CC7D2",
    warning: "#C68A31",
  },
  typography: {
    family: '"PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", Arial, sans-serif',
    mono: '"SFMono-Regular", Menlo, Consolas, monospace',
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
  radius: {
    small: 20,
    medium: 36,
    large: 56,
  },
  shadow: {
    soft: "0 34px 110px rgba(13, 43, 69, 0.12)",
    dark: "0 32px 96px rgba(0, 0, 0, 0.26)",
  },
  layout: {
    safeX: 224,
    safeY: 150,
  },
} as const;

export const typeScale = {
  eyebrow: 34,
  small: 40,
  body: 48,
  lead: 64,
  heading: 104,
  display: 152,
} as const;
