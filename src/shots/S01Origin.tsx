import {useCurrentFrame} from "remotion";
import {openingAccelerationPath, openingOrigin} from "../content/openingWorld";
import {cameraTransform, fadeIn, motionValue} from "../motion/motion";
import {BrandPath, Field, FilmCanvas, OriginPoint} from "../primitives";
import {filmTokens} from "../tokens/filmTokens";

const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;

const openingPathAt = (progress: number) => {
  const start = [openingOrigin.x, openingOrigin.y] as const;
  const approved = [1680, 1110, 1740, 1030, 1852, 958] as const;
  const continuation = [1650, 870, 1660, 620, 1760, 330] as const;
  const points = approved.map((value, index) => lerp(value, continuation[index], progress));
  return `M ${start[0]} ${start[1]} C ${points[0]} ${points[1]}, ${points[2]} ${points[3]}, ${points[4]} ${points[5]}`;
};

export const S01Origin = () => {
  const frame = useCurrentFrame();
  const isAnchor = frame === 75;
  const approvedPathOpacity = 0.08 + ((0.72 - 0.08) * 6) / 75;
  const approvedPointScale = 0.72 + ((1 - 0.72) * 6) / 75;
  const pathOpacity = isAnchor ? approvedPathOpacity : motionValue(frame, [0, 60, 75, 104], [0.01, 0.01, approvedPathOpacity, 0.72]);
  const secondaryOpacity = isAnchor ? 0.14 : motionValue(frame, [0, 60, 75, 104], [0.01, 0.02, 0.14, 0]);
  const pathProgress = isAnchor ? undefined : motionValue(frame, [60, 104], [0, 1]);
  const pointOpacity = isAnchor ? 1 : fadeIn(frame, 21, 39);
  const pulse = isAnchor ? 0 : motionValue(frame, [39, 54, 75], [0, 0.42, 0]);
  const pulseScale = motionValue(frame, [39, 75], [1, 1.85]);
  const cameraScale = motionValue(frame, [0, 75, 104], [0.985, 1, 1.035]);
  const cameraX = motionValue(frame, [0, 75, 104], [250, 250, 0]);
  const cameraY = motionValue(frame, [0, 75, 104], [50, 50, 0]);
  const pathShapeProgress = motionValue(frame, [75, 104], [0, 1]);
  const pointScale = motionValue(frame, [75, 104], [approvedPointScale, 1]);
  const primaryPath = frame >= 104 ? openingAccelerationPath : openingPathAt(pathShapeProgress);
  const worldTransform = `translate3d(${cameraX}px, ${cameraY}px, 0) ${cameraTransform(cameraScale) ?? ""}`.trim();

  if (isAnchor) {
    return (
      <FilmCanvas>
        <Field mode="night">
          <BrandPath d="M 1920 1250 C 1930 1160, 1990 1080, 2102 1008" color={filmTokens.colors.source} width={5} opacity={approvedPathOpacity} />
          <BrandPath d="M 1920 1250 C 1912 1376, 1908 1492, 1910 1650" color={filmTokens.colors.darkMuted} width={3} opacity={0.14} />
          <OriginPoint x={1920} y={1250} size={34} onDark style={{transform: `translate(-50%, -50%) scale(${approvedPointScale})`}} />
        </Field>
      </FilmCanvas>
    );
  }

  return (
    <FilmCanvas>
      <Field mode="night" contentStyle={{transform: worldTransform, transformOrigin: `${openingOrigin.x}px ${openingOrigin.y}px`}}>
        <BrandPath d={primaryPath} color={filmTokens.colors.source} width={5} opacity={pathOpacity} progress={pathProgress} />
        <BrandPath d="M 1670 1200 C 1662 1326, 1658 1442, 1660 1600" color={filmTokens.colors.darkMuted} width={3} opacity={secondaryOpacity} progress={pathProgress} />
        <div
          style={{
            position: "absolute",
            left: openingOrigin.x,
            top: openingOrigin.y,
            width: 70,
            height: 70,
            transform: `translate(-50%, -50%) scale(${pulseScale})`,
            border: `3px solid ${filmTokens.colors.source}`,
            borderRadius: "50%",
            opacity: pulse,
          }}
        />
        <OriginPoint x={openingOrigin.x} y={openingOrigin.y} size={34} onDark style={{transform: `translate(-50%, -50%) scale(${pointScale})`, opacity: pointOpacity}} />
      </Field>
    </FilmCanvas>
  );
};
