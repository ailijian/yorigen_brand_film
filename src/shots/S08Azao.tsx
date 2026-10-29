import {useCurrentFrame, useVideoConfig} from "remotion";
import {frozenAssets} from "../assets/frozenAssets";
import {filmCopy} from "../content/filmCopy";
import {MASTER_WIDTH} from "../content/shotTiming";
import {fadeIn, fadeOut, motionValue} from "../motion/motion";
import {Body, ControlHandoffBridge, ControlSignal, Eyebrow, Field, FilmCanvas, FilmSurface, Heading, ProductStateTransition} from "../primitives";
import {filmTokens} from "../tokens/filmTokens";

export const S08Azao = () => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const isAnchor = frame === 195;
  const isProtectedAnchor = isAnchor && width === MASTER_WIDTH;
  const surfaceWidth = isProtectedAnchor ? 2440 : motionValue(frame, [0, 58], [2200, 2320]);
  const surfaceEnter = fadeIn(frame, 18, 58);
  const surfaceOpacity = isProtectedAnchor ? undefined : surfaceEnter * fadeOut(frame, 368, 389);
  const activeIndex = frame < 88 ? 0 : frame < 246 ? 1 : 2;
  const activationStart = activeIndex === 0 ? 18 : activeIndex === 1 ? 104 : 250;
  const activation = isProtectedAnchor ? 1 : fadeIn(frame, activationStart, activationStart + 20);
  const copyOpacity = isProtectedAnchor ? undefined : fadeIn(frame, 54, 96) * fadeOut(frame, 366, 389);
  const sloganOpacity = isProtectedAnchor ? undefined : fadeIn(frame, 180, 195) * fadeOut(frame, 370, 389);
  const bridgeActivation = fadeIn(frame, 0, 18);
  const bridgeOpacity = fadeOut(frame, 48, 70);
  const bridgeShift = motionValue(frame, [0, 54], [0, -124]);
  const eyebrowOpacity = isProtectedAnchor ? undefined : fadeIn(frame, 18, 54) * fadeOut(frame, 366, 389);
  const eyebrowLeft = isProtectedAnchor ? 220 : 192;
  const eyebrowTop = isProtectedAnchor ? 130 : 144;
  const surfaceLeft = isProtectedAnchor ? 220 : 192;
  const surfaceTop = isProtectedAnchor ? 315 : 335;
  const surfaceHeight = isProtectedAnchor ? 1525 : 1450;
  const copyLeft = isProtectedAnchor ? 2720 : 2600;
  const copyWidth = isProtectedAnchor ? 850 : 960;
  const sloganLeft = isProtectedAnchor ? 2720 : 2600;
  const sloganWidth = isProtectedAnchor ? 880 : 960;
  const sloganBottom = isProtectedAnchor ? 170 : 144;

  return (
    <FilmCanvas>
      <Field mode="warm">
        <div style={{position: "absolute", left: eyebrowLeft, top: eyebrowTop}}>
          <Eyebrow style={{color: filmTokens.colors.control, opacity: eyebrowOpacity}}>AZAO · DELIVERY CONTROL</Eyebrow>
        </div>
        {isProtectedAnchor ? (
          <FilmSurface src={frozenAssets.azao[0]} width={2440} height={1525} radius={44} imageFit="cover" imagePosition="center" style={{position: "absolute", left: 220, top: 315, borderColor: "rgba(89,104,242,0.30)"}} imageStyle={{transform: "scale(1.15)", transformOrigin: "48% 48%"}}>
            <div aria-hidden style={{position: "absolute", top: 0, right: 0, width: 570, height: "100%", background: "linear-gradient(90deg, rgba(251,251,248,0.04) 0%, rgba(251,251,248,0.46) 100%)"}} />
          </FilmSurface>
        ) : (
          <ProductStateTransition
            states={[
              {src: frozenAssets.azao[0], at: 0},
              {src: frozenAssets.azao[2], at: 225},
              {src: frozenAssets.azao[3], at: 278},
            ]}
            transitionFrames={8}
            width={surfaceWidth}
            height={surfaceHeight}
            radius={44}
            imageFit="cover"
            imagePosition="center"
            style={{position: "absolute", left: surfaceLeft, top: surfaceTop, borderColor: "rgba(89,104,242,0.30)", opacity: surfaceOpacity}}
          >
            <div aria-hidden style={{position: "absolute", top: 0, right: 0, width: 570, height: "100%", background: "linear-gradient(90deg, rgba(251,251,248,0.04) 0%, rgba(251,251,248,0.46) 100%)"}} />
          </ProductStateTransition>
        )}
        {frame < 71 ? (
          <div style={{position: "absolute", inset: 0, transform: `translateX(${bridgeShift}px)`}}>
            <ControlHandoffBridge geometryProgress={1} activationProgress={bridgeActivation} opacity={bridgeOpacity} />
          </div>
        ) : null}
        <div style={{position: "absolute", left: copyLeft, top: 315, width: copyWidth, opacity: copyOpacity}}>
          <Eyebrow style={{color: filmTokens.colors.control}}>BOUNDARY / HUMAN CONFIRMATION</Eyebrow>
          <Heading style={{marginTop: 48, fontSize: 84}}>{filmCopy.azao.belief}</Heading>
          <Body style={{marginTop: 46, fontSize: 42}}>{filmCopy.azao.description}</Body>
          <ControlSignal x={0} y={580} compact activeIndex={activeIndex} activation={activation} />
        </div>
        <div style={{position: "absolute", left: sloganLeft, bottom: sloganBottom, width: sloganWidth, paddingTop: 34, borderTop: `3px solid ${filmTokens.colors.control}`, fontSize: 42, lineHeight: 1.4, color: filmTokens.colors.textNavy, fontWeight: 500, opacity: sloganOpacity}}>
          {filmCopy.azao.slogan}
        </div>
      </Field>
    </FilmCanvas>
  );
};
