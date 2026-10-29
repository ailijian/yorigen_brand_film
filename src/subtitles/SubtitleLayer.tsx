import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {filmTokens} from "../tokens/filmTokens";
import {subtitleAtSeconds, subtitlePlacements} from "./subtitleTimeline";

const FADE_IN_FRAMES = 8;
const FADE_OUT_FRAMES = 6;

export const SubtitleLayer = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const event = subtitleAtSeconds(frame / fps);

  if (!event) {
    return null;
  }

  const startFrame = Math.round(event.startSeconds * fps);
  const endFrame = Math.round(event.endSeconds * fps);
  const fadeIn = interpolate(frame, [startFrame, startFrame + FADE_IN_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [endFrame - FADE_OUT_FRAMES, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [startFrame, startFrame + FADE_IN_FRAMES], [6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const placement = subtitlePlacements[event.placement];

  return (
    <AbsoluteFill style={{pointerEvents: "none", fontFamily: filmTokens.typography.family}}>
      <div
        data-subtitle-id={event.id}
        style={{
          position: "absolute",
          left: placement.left,
          bottom: placement.bottom,
          width: "fit-content",
          maxWidth: placement.maxWidth,
          padding: "17px 24px 18px",
          borderRadius: 14,
          background: "rgba(7, 23, 34, 0.82)",
          backdropFilter: "blur(5px)",
          boxShadow: "0 12px 30px rgba(7, 23, 34, 0.12)",
          color: "#F5F7F7",
          fontSize: 32,
          fontWeight: filmTokens.typography.weight.medium,
          lineHeight: 1.42,
          letterSpacing: 0.2,
          whiteSpace: "pre-line",
          opacity: Math.min(fadeIn, fadeOut),
          transform: `translateY(${translateY}px)`,
        }}
      >
        {event.text}
      </div>
    </AbsoluteFill>
  );
};
