import {useCurrentFrame, useVideoConfig} from "remotion";
import {BrandPath, Eyebrow, Field, FilmCanvas, OriginPoint, Signal} from "../primitives";
import {filmCopy} from "../content/filmCopy";
import {MASTER_WIDTH} from "../content/shotTiming";
import {getS04NarrativeState, s04NarrativeFrames} from "../content/s04Narrative";
import {filmTokens} from "../tokens/filmTokens";

type QuestionProps = {
  index: string;
  label: string;
  text: string;
  x: number;
  y: number;
  width: number;
  color: string;
  opacity?: number;
};

const Question = ({index, label, text, x, y, width, color, opacity}: QuestionProps) => (
  <div style={{position: "absolute", left: x, top: y, width, opacity}}>
    <div style={{display: "flex", alignItems: "center", gap: 22, marginBottom: 34}}>
      <span style={{fontFamily: filmTokens.typography.mono, fontSize: 28, color}}>{index}</span>
      <span style={{width: 86, height: 3, background: color, borderRadius: 9}} />
      <Eyebrow onDark style={{fontSize: 28, color}}>{label}</Eyebrow>
    </div>
    <div style={{whiteSpace: "pre-line", fontSize: 74, lineHeight: 1.28, letterSpacing: -2.2, color: filmTokens.colors.darkText, fontWeight: 400}}>{text}</div>
  </div>
);

export const S04Questions = () => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const isAnchor = frame === s04NarrativeFrames.approvedAnchor;
  const isProtectedAnchor = isAnchor && width === MASTER_WIDTH;
  const {judgment, growth, control, judgmentProgress, growthProgress, controlProgress, synthesis} = getS04NarrativeState(frame);
  const anchorOpacity = (value: number) => isAnchor ? undefined : value;
  const judgmentQuestion = isProtectedAnchor ? "AI给出的结论，\n我到底该不该信？" : filmCopy.questions.judgment;
  return (
    <FilmCanvas>
      <Field mode="night">
        <BrandPath d="M 1920 1410 C 1570 1280, 1170 1070, 850 770" color={filmTokens.colors.source} width={5} opacity={0.64 * judgment} progress={isAnchor || frame >= s04NarrativeFrames.synthesisStart ? undefined : judgmentProgress} />
        <BrandPath d="M 1920 1410 C 1918 1160, 1930 850, 1940 560" color={filmTokens.colors.growth} width={6} opacity={0.72 * growth} progress={isAnchor || frame >= s04NarrativeFrames.synthesisStart ? undefined : growthProgress} />
        <BrandPath d="M 1920 1410 C 2300 1280, 2650 1060, 3010 770" color={filmTokens.colors.control} width={6} opacity={0.72 * control} progress={isAnchor ? undefined : controlProgress} />
        <BrandPath d="M 1920 1410 C 1920 1580, 1922 1770, 1922 1950" color={filmTokens.colors.darkMuted} width={3} opacity={0.22} />
        <OriginPoint x={1920} y={1410} size={38} onDark />
        <Signal color={filmTokens.colors.source} x={855} y={773} size={26} open style={isAnchor ? undefined : {opacity: judgment}} />
        <Signal color={filmTokens.colors.growth} x={1940} y={560} size={26} open style={isAnchor ? undefined : {opacity: growth}} />
        <Signal color={filmTokens.colors.control} x={3010} y={770} size={26} open style={isAnchor ? undefined : {opacity: control}} />

        <Question index="01" label="JUDGMENT" text={judgmentQuestion} x={250} y={270} width={1030} color={filmTokens.colors.source} opacity={anchorOpacity(judgment)} />
        <Question index="02" label="GROWTH" text={filmCopy.questions.growth} x={1415} y={150} width={1030} color={filmTokens.colors.growth} opacity={anchorOpacity(growth)} />
        <Question index="03" label="CONTROL" text={filmCopy.questions.control} x={2580} y={270} width={1040} color={filmTokens.colors.control} opacity={anchorOpacity(control)} />

        <Eyebrow onDark style={{position: "absolute", left: 1920, bottom: 155, transform: "translateX(-50%)", letterSpacing: 6, opacity: isAnchor ? undefined : synthesis}}>THREE DIRECTIONS · ONE HUMAN ORIGIN</Eyebrow>
      </Field>
    </FilmCanvas>
  );
};
