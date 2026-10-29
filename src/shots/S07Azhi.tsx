import {useCurrentFrame, useVideoConfig} from "remotion";
import {frozenAssets} from "../assets/frozenAssets";
import {filmCopy} from "../content/filmCopy";
import {MASTER_WIDTH} from "../content/shotTiming";
import {fadeIn, fadeOut, motionValue} from "../motion/motion";
import {Body, ControlHandoffBridge, Eyebrow, Field, FilmCanvas, FilmSurface, GrowthSignal, Heading, ProductStateTransition} from "../primitives";
import {filmTokens} from "../tokens/filmTokens";

export const S07Azhi = () => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const isAnchor = frame === 195;
  const isProtectedAnchor = isAnchor && width === MASTER_WIDTH;
  const activeRow = frame < 66 ? 0 : frame < 124 ? 1 : 2;
  const pathProgress = motionValue(frame, [20, 177], [0.06, 1]);
  const checkpointOpacity = motionValue(frame, [150, 177], [0, 1]);
  const entryOpacity = fadeIn(frame, 0, 18);
  const controlHandoff = fadeIn(frame, 312, 329);
  const contentTailOpacity = 1 - controlHandoff;
  const titleOpacity = isProtectedAnchor ? undefined : fadeIn(frame, 4, 34) * fadeOut(frame, 306, 329) * contentTailOpacity;
  const surfaceEnter = fadeIn(frame, 18, 58);
  const surfaceOpacity = isProtectedAnchor ? undefined : surfaceEnter * fadeOut(frame, 308, 329) * contentTailOpacity;
  const surfaceTransform = isProtectedAnchor ? undefined : `translateY(${(1 - surfaceEnter) * 20}px) scale(${0.992 + surfaceEnter * 0.008})`;
  const sloganOpacity = isProtectedAnchor ? undefined : fadeIn(frame, 186, 195) * contentTailOpacity;

  return (
    <FilmCanvas>
      <Field mode="warm">
        <div style={{position: "absolute", left: 230, top: 150, width: 2180, opacity: titleOpacity}}>
          <Eyebrow style={{color: filmTokens.colors.growth}}>AZHI · CAPABILITY GROWTH</Eyebrow>
          <Heading style={{marginTop: 36, fontSize: 126}}>{filmCopy.azhi.title}</Heading>
          <div style={{display: "inline-flex", marginTop: 34, alignItems: "center", gap: 24, padding: "18px 30px", borderRadius: 999, border: `3px solid ${filmTokens.colors.warning}`, color: filmTokens.colors.warning, fontSize: 42, fontWeight: 600}}>
            <span style={{width: 18, height: 18, borderRadius: "50%", background: filmTokens.colors.warning}} />
            {filmCopy.azhi.state}
          </div>
        </div>

        <div style={{position: "absolute", left: 230, top: 650, width: 1900, opacity: isProtectedAnchor ? undefined : entryOpacity * contentTailOpacity}}>
          {[
            ["01", "具体实践", "把第一版收住"],
            ["02", "成果提交", "Artifact Version 1"],
            ["03", "证据候选", "尚未形成能力结论"],
          ].map(([index, label, detail], row) => (
            <div key={index} style={{display: "grid", gridTemplateColumns: "120px 430px 1fr", alignItems: "center", minHeight: 124, borderTop: `2px solid ${filmTokens.colors.hairline}`, opacity: isProtectedAnchor ? (row === 2 ? 1 : 0.54) : row === activeRow ? 1 : motionValue(frame, [124, 177], [0.22, row === 2 ? 1 : 0.54])}}>
              <Eyebrow style={{fontSize: 28, color: row === activeRow || (isProtectedAnchor && row === 2) ? filmTokens.colors.growth : filmTokens.colors.muted}}>{index}</Eyebrow>
              <div style={{fontSize: 46, color: filmTokens.colors.textNavy, fontWeight: row === activeRow || (isProtectedAnchor && row === 2) ? 600 : 400}}>{label}</div>
              <Body style={{fontSize: 38, color: filmTokens.colors.muted}}>{detail}</Body>
            </div>
          ))}
        </div>

        <div style={{position: "absolute", left: 230, bottom: 190, width: 2060, height: 500}}>
          <GrowthSignal width={1770} height={500} progress={isProtectedAnchor || pathProgress >= 1 ? undefined : pathProgress} checkpointOpacity={isProtectedAnchor ? 1 : checkpointOpacity} style={isProtectedAnchor ? undefined : {opacity: contentTailOpacity}} />
          <Eyebrow style={{position: "absolute", left: 1410, top: isProtectedAnchor ? 100 : 36, color: filmTokens.colors.growth, opacity: isProtectedAnchor ? undefined : checkpointOpacity * contentTailOpacity}}>OPEN CHECKPOINT</Eyebrow>
          <div style={{position: "absolute", left: 0, top: isProtectedAnchor ? 385 : 440, fontSize: 64, color: filmTokens.colors.textNavy, fontWeight: 500, opacity: sloganOpacity}}>{filmCopy.azhi.slogan}</div>
        </div>

        {isProtectedAnchor ? (
          <FilmSurface src={frozenAssets.azhi[0]} width={820} height={1510} radius={52} imageFit="cover" imagePosition="top" style={{position: "absolute", right: 240, top: 300, borderColor: "rgba(34,195,158,0.32)"}}>
            <div aria-hidden style={{position: "absolute", top: 92, right: 15, width: 166, height: 166, background: "#F5F6FB", boxShadow: "0 0 24px 20px #F5F6FB"}} />
          </FilmSurface>
        ) : (
          <ProductStateTransition
            states={[
              {src: frozenAssets.azhi[0], at: 0},
              {src: frozenAssets.azhi[1], at: 66},
              {src: frozenAssets.azhi[0], at: 118},
              {src: frozenAssets.azhi[2], at: 204},
            ]}
            transitionFrames={8}
            width={820}
            height={1510}
            radius={52}
            imageFit="cover"
            imagePosition="top"
            style={{position: "absolute", right: 240, top: 300, borderColor: "rgba(34,195,158,0.32)", opacity: surfaceOpacity, transform: surfaceTransform}}
          >
            <div aria-hidden style={{position: "absolute", top: 92, right: 15, width: 166, height: 166, background: "#F5F6FB", boxShadow: "0 0 24px 20px #F5F6FB"}} />
          </ProductStateTransition>
        )}
        {frame >= 312 ? <ControlHandoffBridge geometryProgress={controlHandoff} opacity={controlHandoff} /> : null}
      </Field>
    </FilmCanvas>
  );
};
