import {AbsoluteFill} from "remotion";
import {SubtitleLayer} from "../subtitles/SubtitleLayer";
import {MasterFilm} from "./MasterFilm";

export const FinalSubtitleNoBgmFilm = () => (
  <AbsoluteFill>
    <MasterFilm />
    <SubtitleLayer />
  </AbsoluteFill>
);
