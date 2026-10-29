import {interpolateColors} from "remotion";
import {motionValue} from "../motion/motion";
import {filmTokens} from "../tokens/filmTokens";
import {BrandPath} from "./BrandPath";
import {OriginPoint} from "./OriginPoint";

type AssessmentOriginBridgeProps = {
  progress: number;
  opacity?: number;
  showOrigin?: boolean;
};

const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;

export const AssessmentOriginBridge = ({progress, opacity = 1, showOrigin = true}: AssessmentOriginBridgeProps) => {
  const points = [
    [1920, 1380, 990, 1080],
    [1520, 1210, 1110, 1250],
    [1210, 940, 1260, 1355],
    [930, 690, 1490, 1430],
  ].map(([x0, y0, x1, y1]) => [lerp(x0, x1, progress), lerp(y0, y1, progress)] as const);
  const [[x, y], [c1x, c1y], [c2x, c2y], [endX, endY]] = points;
  const originSize = lerp(40, 34, progress);
  return (
    <>
      <BrandPath d={`M ${x} ${y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`} color={filmTokens.colors.source} width={8} opacity={0.62 * opacity} />
      {showOrigin ? <OriginPoint x={x} y={y} size={originSize} style={{opacity}} /> : null}
    </>
  );
};

type ControlHandoffBridgeProps = {
  geometryProgress: number;
  activationProgress?: number;
  opacity?: number;
};

export const ControlHandoffBridge = ({geometryProgress, activationProgress = 0, opacity = 1}: ControlHandoffBridgeProps) => {
  const start = [317, 1849, 2753, 928] as const;
  const c1 = [608, 1849, 2753, 978] as const;
  const c2 = [655, 1610, 2753, 1028] as const;
  const middle = [952, 1675, 2753, 1078] as const;
  const c3 = [1250, 1739, 2753, 1128] as const;
  const c4 = [1386, 1889, 2753, 1178] as const;
  const end = [1696, 1637, 2753, 1228] as const;
  const point = (values: readonly [number, number, number, number]) => [
    lerp(values[0], values[2], geometryProgress),
    lerp(values[1], values[3], geometryProgress),
  ] as const;
  const [p0, p1, p2, p3, p4, p5, p6] = [start, c1, c2, middle, c3, c4, end].map(point);
  const neutralized = interpolateColors(geometryProgress, [0, 0.62, 1], [filmTokens.colors.growth, filmTokens.colors.ghost, filmTokens.colors.ghost]);
  const color = interpolateColors(activationProgress, [0, 1], [neutralized, filmTokens.colors.control]);
  const startFill = interpolateColors(geometryProgress, [0, 0.72, 1], [filmTokens.colors.growth, filmTokens.colors.warmCanvas, filmTokens.colors.warmCanvas]);
  const activeFill = interpolateColors(activationProgress, [0, 1], [startFill, filmTokens.colors.control]);
  const width = motionValue(geometryProgress, [0, 1], [20, 8]);
  const startRadius = motionValue(geometryProgress, [0, 1], [34, 33]);
  const middleRadius = motionValue(geometryProgress, [0, 1], [50, 33]);
  const secondX = lerp(1696, 2753, geometryProgress);
  const secondY = lerp(1637, 1078, geometryProgress);

  return (
    <svg viewBox="0 0 3840 2160" preserveAspectRatio="none" style={{position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none"}}>
      <path d={`M ${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]} C ${p4[0]} ${p4[1]}, ${p5[0]} ${p5[1]}, ${p6[0]} ${p6[1]}`} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
      <circle cx={p0[0]} cy={p0[1]} r={startRadius} fill={activeFill} stroke={color} strokeWidth="8" />
      <circle cx={secondX} cy={secondY} r={middleRadius} fill={filmTokens.colors.warmCanvas} stroke={color} strokeWidth="8" />
      <circle cx="2753" cy="1228" r="33" fill={filmTokens.colors.warmCanvas} stroke={color} strokeWidth="8" opacity={geometryProgress} />
    </svg>
  );
};
