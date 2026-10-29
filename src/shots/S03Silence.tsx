import {useCurrentFrame} from "remotion";
import {openingMotionPaths, openingOrigin, openingOutputs} from "../content/openingWorld";
import {fadeOut, motionValue} from "../motion/motion";
import {BrandPath, Eyebrow, Field, FilmCanvas, OriginPoint} from "../primitives";
import {filmTokens} from "../tokens/filmTokens";

export const S03Silence = () => {
  const frame = useCurrentFrame();
  const pathExit = fadeOut(frame, 0, 52);
  const outputExit = fadeOut(frame, 0, 50);
  const cameraScale = motionValue(frame, [0, 52], [0.97, 1]);
  const cameraX = motionValue(frame, [8, 52], [0, 250]);
  const cameraY = motionValue(frame, [8, 52], [0, 210]);
  const originSize = motionValue(frame, [72, 119], [34, 38]);

  return (
    <FilmCanvas>
      <Field
        mode="night"
        contentStyle={{
          transform: `translate(${cameraX}px, ${cameraY}px) scale(${cameraScale})`,
          transformOrigin: `${openingOrigin.x}px ${openingOrigin.y}px`,
        }}
      >
        {openingMotionPaths.map((d, index) => (
          <BrandPath
            key={d}
            d={d}
            color={index === 4 ? filmTokens.colors.source : filmTokens.colors.darkMuted}
            width={index === 4 ? 5 : 3}
            opacity={(0.22 + index * 0.08) * 1.45 * pathExit}
          />
        ))}
        {openingOutputs.map((output, index) => (
          <div
            key={output.label}
            style={{
              position: "absolute",
              left: output.x,
              top: output.y,
              width: output.width,
              padding: "30px 42px",
              borderTop: `2px solid ${index === 4 ? filmTokens.colors.source : "rgba(174,188,198,0.30)"}`,
              opacity: Math.min(1, (0.62 + index * 0.08) * 1.35) * outputExit,
            }}
          >
            <Eyebrow onDark style={{fontSize: 31, color: index === 4 ? filmTokens.colors.darkText : filmTokens.colors.darkMuted}}>{output.label}</Eyebrow>
          </div>
        ))}
        <OriginPoint x={openingOrigin.x} y={openingOrigin.y} size={originSize} onDark />
      </Field>
    </FilmCanvas>
  );
};
