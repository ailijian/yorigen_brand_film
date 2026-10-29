import type {ReactNode} from "react";
import {AbsoluteFill, useVideoConfig} from "remotion";
import {MASTER_HEIGHT, MASTER_WIDTH} from "../content/shotTiming";

export const FilmCanvas = ({children}: {children: ReactNode}) => {
  const {width, height} = useVideoConfig();
  const scale = Math.min(width / MASTER_WIDTH, height / MASTER_HEIGHT);

  return (
    <AbsoluteFill style={{overflow: "hidden", background: "#071722"}}>
      <div
        style={{
          position: "absolute",
          width: MASTER_WIDTH,
          height: MASTER_HEIGHT,
          left: (width - MASTER_WIDTH * scale) / 2,
          top: (height - MASTER_HEIGHT * scale) / 2,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
