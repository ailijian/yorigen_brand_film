import {Composition} from "remotion";
import {FinalSubtitleNoBgmFilm} from "./compositions/FinalFilm";
import {MasterFilm} from "./compositions/MasterFilm";
import {
  FPS,
  MASTER_DURATION_IN_FRAMES,
  MASTER_HEIGHT,
  MASTER_WIDTH,
  PREVIEW_HEIGHT,
  PREVIEW_WIDTH,
} from "./content/shotTiming";

export const RemotionRoot = () => (
  <>
    <Composition
      id="YorigenMaster4K"
      component={MasterFilm}
      durationInFrames={MASTER_DURATION_IN_FRAMES}
      fps={FPS}
      width={MASTER_WIDTH}
      height={MASTER_HEIGHT}
    />
    <Composition
      id="YorigenFinalSubtitleNoBgm1080"
      component={FinalSubtitleNoBgmFilm}
      durationInFrames={MASTER_DURATION_IN_FRAMES}
      fps={FPS}
      width={PREVIEW_WIDTH}
      height={PREVIEW_HEIGHT}
    />
  </>
);
