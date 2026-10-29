import type {CSSProperties, ReactNode} from "react";
import {Img, useCurrentFrame} from "remotion";
import {motionValue} from "../motion/motion";
import {FilmSurface} from "./FilmSurface";

export type ProductState = {
  src: string;
  at: number;
};

type ProductStateTransitionProps = {
  states: readonly ProductState[];
  transitionFrames?: number;
  children?: ReactNode;
  width: number | string;
  height: number | string;
  radius?: number;
  imageFit?: CSSProperties["objectFit"];
  imagePosition?: CSSProperties["objectPosition"];
  style?: CSSProperties;
  imageStyle?: CSSProperties;
};

export const ProductStateTransition = ({
  states,
  transitionFrames = 8,
  children,
  width,
  height,
  radius,
  imageFit = "cover",
  imagePosition = "center",
  style,
  imageStyle,
}: ProductStateTransitionProps) => {
  const frame = useCurrentFrame();
  if (states.length === 0) {
    throw new Error("ProductStateTransition requires at least one state.");
  }

  const activeIndex = states.reduce((result, state, index) => frame >= state.at ? index : result, 0);
  const active = states[activeIndex];
  if (activeIndex === 0 || frame >= active.at + transitionFrames) {
    return (
      <FilmSurface src={active.src} width={width} height={height} radius={radius} imageFit={imageFit} imagePosition={imagePosition} style={style} imageStyle={imageStyle}>
        {children}
      </FilmSurface>
    );
  }

  const previous = states[activeIndex - 1];
  const progress = motionValue(frame, [active.at, active.at + transitionFrames], [0, 1]);
  const baseImageStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: imageFit,
    objectPosition: imagePosition,
    display: "block",
    ...imageStyle,
  };

  return (
    <FilmSurface width={width} height={height} radius={radius} style={style}>
      <Img src={previous.src} style={{...baseImageStyle, opacity: 1 - progress}} />
      <Img src={active.src} style={{...baseImageStyle, opacity: progress}} />
      {children}
    </FilmSurface>
  );
};
