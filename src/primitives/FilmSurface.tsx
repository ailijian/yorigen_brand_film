import type {CSSProperties, ReactNode} from "react";
import {Img} from "remotion";
import {filmTokens} from "../tokens/filmTokens";

type FilmSurfaceProps = {
  src?: string;
  children?: ReactNode;
  width: number | string;
  height: number | string;
  radius?: number;
  imageFit?: CSSProperties["objectFit"];
  imagePosition?: CSSProperties["objectPosition"];
  style?: CSSProperties;
  imageStyle?: CSSProperties;
};

export const FilmSurface = ({src, children, width, height, radius = filmTokens.radius.large, imageFit = "cover", imagePosition = "center", style, imageStyle}: FilmSurfaceProps) => (
  <div
    style={{
      position: "relative",
      width,
      height,
      overflow: "hidden",
      borderRadius: radius,
      border: `2px solid ${filmTokens.colors.hairline}`,
      background: filmTokens.colors.surface,
      boxShadow: filmTokens.shadow.soft,
      ...style,
    }}
  >
    {src ? (
      <Img src={src} style={{width: "100%", height: "100%", objectFit: imageFit, objectPosition: imagePosition, display: "block", ...imageStyle}} />
    ) : null}
    {children}
  </div>
);
