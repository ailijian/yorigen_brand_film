import {useCurrentFrame} from "remotion";
import {filmCopy} from "../content/filmCopy";
import {cameraTransform, fadeIn, fadeOut, motionValue} from "../motion/motion";
import {BrandPath, Eyebrow, Field, FilmCanvas, OriginPoint, Signal} from "../primitives";
import {filmTokens} from "../tokens/filmTokens";

type ProductLabelProps = {
  english: string;
  chinese: string;
  color: string;
};

const ProductLabel = ({english, chinese, color}: ProductLabelProps) => (
  <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, whiteSpace: "nowrap"}}>
    <Eyebrow style={{color}}>{english}</Eyebrow>
    <div style={{fontSize: 42, lineHeight: 1.2, color: filmTokens.colors.textNavy, fontWeight: 500}}>{chinese}</div>
  </div>
);

export const S09Parallel = () => {
  const frame = useCurrentFrame();
  const pathProgress = motionValue(frame, [8, 76], [0.05, 1]);
  const signalOpacity = fadeIn(frame, 18, 56);
  const firstOpacity = fadeIn(frame, 12, 32) * fadeOut(frame, 58, 70);
  const secondOpacity = fadeIn(frame, 74, 90);
  const cameraScale = motionValue(frame, [0, 149], [1.02, 1]);
  return (
    <FilmCanvas>
      <Field mode="warm" contentStyle={{transform: cameraTransform(cameraScale), transformOrigin: "50% 55%"}}>
        <BrandPath d="M 1920 1260 C 1540 1140, 1200 880, 880 610" color={filmTokens.colors.deepNavy} width={6} opacity={0.74 * signalOpacity} progress={pathProgress < 1 ? pathProgress : undefined} />
        <BrandPath d="M 1920 1260 C 1920 1010, 1920 770, 1920 520" color={filmTokens.colors.growth} width={7} opacity={0.82 * signalOpacity} progress={pathProgress < 1 ? pathProgress : undefined} />
        <BrandPath d="M 1920 1260 C 2300 1140, 2640 880, 2960 610" color={filmTokens.colors.control} width={7} opacity={0.82 * signalOpacity} progress={pathProgress < 1 ? pathProgress : undefined} />
        <OriginPoint x={1920} y={1260} size={42} />
        <Signal color={filmTokens.colors.deepNavy} x={880} y={610} open style={{opacity: signalOpacity}} label={<ProductLabel english="JUDGMENT" chinese="AI 判断力测试" color={filmTokens.colors.deepNavy} />} />
        <Signal color={filmTokens.colors.growth} x={1920} y={520} open style={{opacity: signalOpacity}} label={<ProductLabel english="GROWTH" chinese="阿织" color={filmTokens.colors.growth} />} />
        <Signal color={filmTokens.colors.control} x={2960} y={610} open style={{opacity: signalOpacity}} label={<ProductLabel english="CONTROL" chinese="阿造" color={filmTokens.colors.control} />} />
        <div style={{position: "absolute", left: 620, bottom: 230, width: 2600, textAlign: "center", fontSize: 86, lineHeight: 1.2, color: filmTokens.colors.textNavy, fontWeight: 500, opacity: firstOpacity}}>{filmCopy.parallel.first}</div>
        <div style={{position: "absolute", left: 620, bottom: 230, width: 2600, textAlign: "center", fontSize: 106, lineHeight: 1.2, color: filmTokens.colors.textNavy, fontWeight: 500, opacity: secondOpacity}}>{filmCopy.parallel.second}</div>
      </Field>
    </FilmCanvas>
  );
};
