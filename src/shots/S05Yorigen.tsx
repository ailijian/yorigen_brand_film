import {useCurrentFrame} from "remotion";
import {cameraTransform, fadeIn, fadeOut, motionValue} from "../motion/motion";
import {AssessmentOriginBridge, BrandAssetView, BrandPath, Eyebrow, Field, FilmCanvas, OriginPoint} from "../primitives";
import {filmTokens} from "../tokens/filmTokens";

export const S05Yorigen = () => {
  const frame = useCurrentFrame();
  const warmth = motionValue(frame, [24, 146], [0, 1]);
  const cameraScale = motionValue(frame, [0, 164], [1.028, 1]);
  const cameraStyle = {transform: cameraTransform(cameraScale), transformOrigin: "50% 58%"};
  const questionOpacity = fadeOut(frame, 0, 38);
  const branchOpacity = fadeOut(frame, 18, 94);
  const sourceOpacity = fadeIn(frame, 64, 116);
  const bridgeProgress = fadeIn(frame, 149, 164);
  const identityOpacity = sourceOpacity * (1 - bridgeProgress);
  const worldOpacity = 1 - bridgeProgress;
  return (
    <FilmCanvas>
      <Field mode="night" contentStyle={cameraStyle}>
        <BrandPath d="M 1920 1380 C 1520 1210, 1210 940, 930 690" color={filmTokens.colors.source} width={5} opacity={0.48 * branchOpacity} />
        <BrandPath d="M 1920 1380 C 1920 1050, 1920 790, 1920 500" color={filmTokens.colors.growth} width={5} opacity={0.42 * branchOpacity} />
        <BrandPath d="M 1920 1380 C 2320 1210, 2650 940, 2920 690" color={filmTokens.colors.control} width={5} opacity={0.42 * branchOpacity} />
        <OriginPoint x={1920} y={1380} size={40} onDark />
        <div style={{position: "absolute", left: 260, top: 240, width: 3320, display: "flex", justifyContent: "space-between", opacity: questionOpacity}}>
          <Eyebrow onDark>JUDGMENT</Eyebrow>
          <Eyebrow onDark>GROWTH</Eyebrow>
          <Eyebrow onDark>CONTROL</Eyebrow>
        </div>
      </Field>
      <Field mode="warm" style={{opacity: warmth}} contentStyle={cameraStyle}>
        <BrandPath d="M 1920 1380 C 1520 1210, 1210 940, 930 690" color={filmTokens.colors.ghost} width={5} opacity={0.42 * branchOpacity * worldOpacity} />
        <BrandPath d="M 1920 1380 C 1920 1050, 1920 790, 1920 500" color={filmTokens.colors.growth} width={5} opacity={0.28 * branchOpacity * worldOpacity} />
        <BrandPath d="M 1920 1380 C 2320 1210, 2650 940, 2920 690" color={filmTokens.colors.control} width={5} opacity={0.28 * branchOpacity * worldOpacity} />
        <OriginPoint x={1920} y={1380} size={40} style={{opacity: worldOpacity}} />
        <BrandAssetView asset="origin-y" style={{position: "absolute", left: 1760, top: 350, width: 320, height: 320, opacity: 0.08 * identityOpacity}} />
        <div style={{position: "absolute", left: 720, top: 690, width: 2400, textAlign: "center", opacity: identityOpacity}}>
          <div style={{fontSize: 96, lineHeight: 1.15, letterSpacing: 3, color: filmTokens.colors.textNavy, fontWeight: 500}}>源点AI</div>
        </div>
        {frame >= 149 ? <AssessmentOriginBridge progress={bridgeProgress} opacity={bridgeProgress} /> : null}
      </Field>
    </FilmCanvas>
  );
};
