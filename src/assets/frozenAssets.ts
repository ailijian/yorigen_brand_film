import {staticFile} from "remotion";

export const frozenAssets = {
  judgment: [
    staticFile("assets/judgment/J3-01.png"),
    staticFile("assets/judgment/J3-02.png"),
    staticFile("assets/judgment/J3-03.png"),
    staticFile("assets/judgment/J3-04.png"),
  ],
  azhi: [
    staticFile("assets/azhi/AZ1.png"),
    staticFile("assets/azhi/AZ2.png"),
    staticFile("assets/azhi/AZ3.png"),
  ],
  azao: [
    staticFile("assets/azao/ZA2-01-claim.png"),
    staticFile("assets/azao/ZA2-02-preview.png"),
    staticFile("assets/azao/ZA2-03-boundary.png"),
    staticFile("assets/azao/ZA2-04-evidence.png"),
  ],
} as const;
