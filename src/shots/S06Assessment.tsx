import {useCurrentFrame} from "remotion";
import {frozenAssets} from "../assets/frozenAssets";
import {filmCopy} from "../content/filmCopy";
import {cameraTransform, fadeIn, fadeOut, motionValue} from "../motion/motion";
import {AssessmentOriginBridge, Body, BrandPath, Eyebrow, Field, FilmCanvas, FilmSurface, GrowthSignal, Heading, OriginPoint, ProductStateTransition} from "../primitives";
import {filmTokens} from "../tokens/filmTokens";

const modelNodes = [
  {label: "AI 01", x: 410, y: 720},
  {label: "AI 02", x: 790, y: 720},
  {label: "AI 03", x: 1170, y: 720},
] as const;

export const S06Assessment = () => {
  const frame = useCurrentFrame();
  const isAnchor = frame === 165;
  const cameraScale = motionValue(frame, [0, 18, 165, 260, 299], [1, 1.015, 1, 0.992, 1]);
  const judgmentTailOpacity = fadeOut(frame, 282, 299);
  const growthHandoff = fadeIn(frame, 282, 299);
  const headingOpacity = isAnchor ? undefined : fadeIn(frame, 0, 22) * fadeOut(frame, 268, 299) * judgmentTailOpacity;
  const convergence = fadeIn(frame, 46, 88);
  const sourceProgress = fadeIn(frame, 62, 98);
  const sourceTextOpacity = isAnchor ? undefined : sourceProgress * judgmentTailOpacity;
  const originOpacity = isAnchor ? undefined : (frame < 98 ? 1 : sourceProgress) * judgmentTailOpacity;
  const surfaceEnter = fadeIn(frame, 82, 124);
  const surfaceExit = fadeOut(frame, 272, 299);
  const surfaceOpacity = isAnchor ? undefined : surfaceEnter * surfaceExit;
  const surfaceTransform = isAnchor ? undefined : `translateY(${(1 - surfaceEnter) * 22}px) scale(${0.992 + surfaceEnter * 0.008 - (1 - surfaceExit) * 0.04})`;
  const actionsOpacity = isAnchor ? undefined : fadeIn(frame, 112, 144) * fadeOut(frame, 272, 299);
  const ahaOpacity = isAnchor ? undefined : fadeIn(frame, 148, 165) * fadeOut(frame, 276, 299);
  const stopActive = frame >= 145;

  return (
    <FilmCanvas>
      <Field mode="warm" contentStyle={isAnchor ? undefined : {transform: cameraTransform(cameraScale), transformOrigin: "56% 52%"}}>
        <div style={{position: "absolute", left: 220, top: 150, width: 1900, opacity: headingOpacity}}>
          <Eyebrow>ASSESSMENT · JUDGMENT</Eyebrow>
          <Heading style={{marginTop: 36, fontSize: 126}}>三个 AI，{"\n"}同一个答案。</Heading>
        </div>

        {modelNodes.map((node, index) => (
          <div key={node.label} style={{position: "absolute", left: node.x, top: node.y, transform: "translate(-50%, -50%)", width: 170, textAlign: "center", opacity: isAnchor ? undefined : fadeIn(frame, 10 + index * 10, 28 + index * 10) * fadeOut(frame, 260, 294) * judgmentTailOpacity}}>
            <div style={{width: 86, height: 86, margin: "0 auto 25px", borderRadius: "50%", border: `7px solid ${filmTokens.colors.deepNavy}`, background: filmTokens.colors.surface}} />
            <Eyebrow style={{fontSize: 26, color: filmTokens.colors.deepNavy}}>{node.label}</Eyebrow>
          </div>
        ))}
        <BrandPath d="M 410 770 C 480 960, 700 1030, 990 1080 M 790 770 C 820 910, 880 1000, 990 1080 M 1170 770 C 1120 920, 1070 1000, 990 1080" color={filmTokens.colors.ghost} width={6} opacity={isAnchor ? 0.9 : 0.9 * convergence * judgmentTailOpacity} progress={isAnchor || convergence >= 1 ? undefined : convergence} />
        {frame < 17 ? <AssessmentOriginBridge progress={1} opacity={fadeOut(frame, 0, 16)} showOrigin={false} /> : null}
        <div style={{opacity: originOpacity}}>
          <OriginPoint x={990} y={1080} size={34} />
        </div>
        <div style={{position: "absolute", left: 1210, top: 1016, width: 700, opacity: sourceTextOpacity}}>
          <Eyebrow style={{color: filmTokens.colors.deepNavy}}>ONE SOURCE</Eyebrow>
          <Body style={{marginTop: 16, color: filmTokens.colors.textNavy, fontSize: 46}}>它们读的是同一份说明</Body>
        </div>
        <BrandPath d="M 990 1080 C 1110 1250, 1260 1355, 1490 1430" color={filmTokens.colors.source} width={8} opacity={isAnchor ? 1 : convergence * judgmentTailOpacity} progress={isAnchor || convergence >= 1 ? undefined : convergence} />

        <div style={{position: "absolute", left: 220, bottom: 175, width: 1950, opacity: actionsOpacity}}>
          <div style={{display: "flex", gap: 20, marginBottom: 46}}>
            {["信", "改", "查", "停"].map((action) => (
              <div key={action} style={{width: 190, height: 112, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 28, border: `3px solid ${filmTokens.colors.deepNavy}`, color: action === "停" && stopActive ? filmTokens.colors.warmCanvas : filmTokens.colors.deepNavy, background: action === "停" && stopActive ? filmTokens.colors.deepNavy : "transparent", fontSize: 50, fontWeight: 600}}>{action}</div>
            ))}
          </div>
          <div style={{fontSize: 68, lineHeight: 1.3, whiteSpace: "pre-line", color: filmTokens.colors.textNavy, fontWeight: 500, opacity: ahaOpacity}}>{filmCopy.assessment.insight}</div>
        </div>

        {isAnchor ? (
          <FilmSurface src={frozenAssets.judgment[0]} width={770} height={1666} radius={54} imageFit="cover" imagePosition="top" style={{position: "absolute", right: 235, top: 245, borderColor: "rgba(13,43,69,0.18)"}} />
        ) : (
          <ProductStateTransition
            states={[
              {src: frozenAssets.judgment[0], at: 0},
              {src: frozenAssets.judgment[1], at: 190},
              {src: frozenAssets.judgment[2], at: 225},
              {src: frozenAssets.judgment[3], at: 265},
            ]}
            transitionFrames={8}
            width={770}
            height={1666}
            radius={54}
            imageFit="cover"
            imagePosition="top"
            style={{position: "absolute", right: 235, top: 245, borderColor: "rgba(13,43,69,0.18)", opacity: surfaceOpacity, transform: surfaceTransform}}
          />
        )}
        <div style={{position: "absolute", right: 270, top: 1775, width: 700, padding: "34px 42px", borderRadius: 30, background: filmTokens.colors.deepNavy, color: filmTokens.colors.warmCanvas, fontSize: 32, letterSpacing: 1.1, textAlign: "center", boxShadow: filmTokens.shadow.soft, opacity: ahaOpacity}}>
          {filmCopy.assessment.belief}
        </div>
        {frame >= 282 ? (
          <div style={{position: "absolute", left: 230, bottom: 190, width: 2060, height: 500, opacity: growthHandoff}}>
            <GrowthSignal width={1770} height={500} progress={0.06} checkpointOpacity={0} />
          </div>
        ) : null}
      </Field>
    </FilmCanvas>
  );
};
