import {useCurrentFrame} from "remotion";
import {fadeIn, fadeOut, motionValue} from "../motion/motion";
import {BrandAssetView, BrandPath, Eyebrow, Field, FilmCanvas, OriginPoint, Signal} from "../primitives";
import {filmCopy} from "../content/filmCopy";
import {filmTokens} from "../tokens/filmTokens";

export const S10BrandLock = () => {
  const frame = useCurrentFrame();
  const isAnchor = frame === 120;
  const settled = frame >= 120;
  const geometryHandoff = settled ? 1 : fadeIn(frame, 48, 76);
  const signalOpacity = settled ? 0 : fadeOut(frame, 4, 48);
  const familyOpacity = isAnchor ? undefined : settled ? 1 : fadeIn(frame, 22, 62);
  const lockupProgress = settled ? 1 : fadeIn(frame, 54, 106);
  const lockupOpacity = isAnchor ? undefined : lockupProgress;
  const claimOpacity = isAnchor ? undefined : settled ? 1 : fadeIn(frame, 82, 120);
  const originYOpacity = settled ? 0 : fadeIn(frame, 24, 54) * fadeOut(frame, 72, 108);
  const originY = settled ? 1280 : motionValue(frame, [0, 76], [1260, 1280]);
  const originSize = settled ? 40 : motionValue(frame, [0, 76], [42, 40]);
  const signalLeftX = motionValue(frame, [0, 48], [880, 990]);
  const signalCenterY = motionValue(frame, [0, 48], [520, 610]);
  const signalRightX = motionValue(frame, [0, 48], [2960, 2850]);
  const signalSideY = motionValue(frame, [0, 48], [610, 650]);
  return (
    <FilmCanvas>
      <Field mode="warm">
        {!settled ? (
          <>
            <BrandPath d="M 1920 1260 C 1540 1140, 1200 880, 880 610" color={filmTokens.colors.deepNavy} width={6} opacity={0.74 * signalOpacity} />
            <BrandPath d="M 1920 1260 C 1920 1010, 1920 770, 1920 520" color={filmTokens.colors.growth} width={7} opacity={0.82 * signalOpacity} />
            <BrandPath d="M 1920 1260 C 2300 1140, 2640 880, 2960 610" color={filmTokens.colors.control} width={7} opacity={0.82 * signalOpacity} />
            <BrandPath d="M 1920 1260 C 1540 1140, 1200 880, 880 610" color={filmTokens.colors.ghost} width={5} opacity={0.26 * (1 - signalOpacity) * (1 - geometryHandoff)} />
            <BrandPath d="M 1920 1260 C 1920 1010, 1920 770, 1920 520" color={filmTokens.colors.ghost} width={5} opacity={0.22 * (1 - signalOpacity) * (1 - geometryHandoff)} />
            <BrandPath d="M 1920 1260 C 2300 1140, 2640 880, 2960 610" color={filmTokens.colors.ghost} width={5} opacity={0.26 * (1 - signalOpacity) * (1 - geometryHandoff)} />
          </>
        ) : null}
        <BrandPath d="M 1920 1280 C 1510 1180, 1220 910, 990 650" color={filmTokens.colors.ghost} width={5} opacity={settled ? 0.26 : 0.26 * geometryHandoff} />
        <BrandPath d="M 1920 1280 C 1920 1040, 1920 810, 1920 610" color={filmTokens.colors.ghost} width={5} opacity={settled ? 0.22 : 0.22 * geometryHandoff} />
        <BrandPath d="M 1920 1280 C 2330 1180, 2620 910, 2850 650" color={filmTokens.colors.ghost} width={5} opacity={settled ? 0.26 : 0.26 * geometryHandoff} />
        <Signal color={filmTokens.colors.deepNavy} x={settled ? 990 : signalLeftX} y={settled ? 650 : signalSideY} open style={{opacity: signalOpacity}} label={!settled ? <Eyebrow style={{color: filmTokens.colors.deepNavy}}>JUDGMENT</Eyebrow> : undefined} />
        <Signal color={filmTokens.colors.growth} x={1920} y={settled ? 610 : signalCenterY} open style={{opacity: signalOpacity}} label={!settled ? <Eyebrow style={{color: filmTokens.colors.growth}}>GROWTH</Eyebrow> : undefined} />
        <Signal color={filmTokens.colors.control} x={settled ? 2850 : signalRightX} y={settled ? 650 : signalSideY} open style={{opacity: signalOpacity}} label={!settled ? <Eyebrow style={{color: filmTokens.colors.control}}>CONTROL</Eyebrow> : undefined} />
        <OriginPoint x={1920} y={originY} size={originSize} halo={false} />
        {!settled ? (
          <div style={{position: "absolute", left: 620, bottom: 230, width: 2600, textAlign: "center", fontSize: 106, lineHeight: 1.2, color: filmTokens.colors.textNavy, fontWeight: 500, opacity: fadeOut(frame, 0, 16)}}>
            {filmCopy.parallel.second}
          </div>
        ) : null}
        <BrandAssetView asset="origin-y" style={{position: "absolute", left: 1770, top: 480, width: 300, height: 300, opacity: originYOpacity}} />
        <div style={{position: "absolute", left: 420, top: 250, width: 3000, textAlign: "center", fontSize: 126, lineHeight: 1.18, letterSpacing: -4.5, color: filmTokens.colors.textNavy, fontWeight: 500, opacity: familyOpacity}}>
          {filmCopy.familyLine}
        </div>
        <BrandAssetView asset="master-lockup" style={{position: "absolute", left: 1350, top: 790, width: 1140, height: 405, opacity: lockupOpacity, clipPath: isAnchor || settled ? undefined : `inset(0 ${100 - lockupProgress * 100}% 0 0)`}} />
        <div style={{position: "absolute", left: 800, bottom: 250, width: 2240, textAlign: "center"}}>
          <div style={{fontSize: 54, letterSpacing: 1.8, color: filmTokens.colors.textNavy, opacity: claimOpacity}}>{filmCopy.brandClaim}</div>
        </div>
      </Field>
    </FilmCanvas>
  );
};
