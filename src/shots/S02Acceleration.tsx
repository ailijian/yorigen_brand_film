import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {openingAccelerationPaths, openingMotionPaths, openingOrigin, openingOutputs} from "../content/openingWorld";
import {MASTER_WIDTH} from "../content/shotTiming";
import {cameraTransform, fadeIn, motionValue} from "../motion/motion";
import {BrandPath, Eyebrow, Field, FilmCanvas, OriginPoint} from "../primitives";
import {filmTokens} from "../tokens/filmTokens";

export const S02Acceleration = () => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const isAnchor = frame === 105;
  const isProtectedAnchor = isAnchor && width === MASTER_WIDTH;
  const approvedDensity = interpolate(6, [0, 105], [0.45, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const revealWindows = [
    [8, 28],
    [62, 78],
    [80, 94],
    [94, 102],
    [36, 58],
  ] as const;
  const cameraScale = motionValue(frame, [0, 105, 164], [1.035, 1, 0.97]);

  if (isProtectedAnchor) {
    return (
      <FilmCanvas>
        <Field mode="night">
          {openingAccelerationPaths.map((d, index) => (
            <BrandPath key={d} d={d} color={index === 4 ? filmTokens.colors.source : filmTokens.colors.darkMuted} width={index === 4 ? 5 : 3} opacity={(0.22 + index * 0.08) * approvedDensity} />
          ))}
          <OriginPoint x={openingOrigin.x} y={openingOrigin.y} size={34} onDark />
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
                opacity: Math.min(1, approvedDensity * (0.62 + index * 0.08)),
              }}
            >
              <Eyebrow onDark style={{fontSize: 31, color: index === 4 ? filmTokens.colors.darkText : filmTokens.colors.darkMuted}}>{output.label}</Eyebrow>
            </div>
          ))}
        </Field>
      </FilmCanvas>
    );
  }

  return (
    <FilmCanvas>
      <Field mode="night" contentStyle={isAnchor ? undefined : {transform: cameraTransform(cameraScale), transformOrigin: `${openingOrigin.x}px ${openingOrigin.y}px`}}>
        {openingMotionPaths.map((d, index) => {
          const approvedOpacity = (0.22 + index * 0.08) * approvedDensity;
          const [from, to] = revealWindows[index];
          const opacity = isAnchor
            ? approvedOpacity
            : index === 4 && frame <= 105
              ? motionValue(frame, [0, 105], [0.72, approvedOpacity])
            : frame <= 105
              ? approvedOpacity * fadeIn(frame, from, to)
              : motionValue(frame, [105, 150, 164], [approvedOpacity, Math.min(0.72, approvedOpacity * 2), approvedOpacity * 1.45]);
          return (
            <BrandPath
              key={d}
              d={d}
              color={index === 4 ? filmTokens.colors.source : filmTokens.colors.darkMuted}
              width={index === 4 ? 5 : 3}
              opacity={opacity}
              progress={isAnchor || index === 4 || frame >= to ? undefined : fadeIn(frame, from, to)}
            />
          );
        })}
        <OriginPoint x={openingOrigin.x} y={openingOrigin.y} size={34} onDark />
        {openingOutputs.map((output, index) => {
          const approvedOpacity = Math.min(1, approvedDensity * (0.62 + index * 0.08));
          const [from, to] = revealWindows[index];
          const opacity = isAnchor
            ? approvedOpacity
            : frame <= 105
              ? approvedOpacity * fadeIn(frame, from, to)
              : motionValue(frame, [105, 150, 164], [approvedOpacity, Math.min(1, approvedOpacity * 1.9), approvedOpacity * 1.35]);
          return (
            <div
              key={output.label}
              style={{
                position: "absolute",
                left: output.x,
                top: output.y,
                width: output.width,
                padding: "30px 42px",
                borderTop: `2px solid ${index === 4 ? filmTokens.colors.source : "rgba(174,188,198,0.30)"}`,
                opacity,
              }}
            >
              <Eyebrow onDark style={{fontSize: 31, color: index === 4 ? filmTokens.colors.darkText : filmTokens.colors.darkMuted}}>{output.label}</Eyebrow>
            </div>
          );
        })}
      </Field>
    </FilmCanvas>
  );
};
