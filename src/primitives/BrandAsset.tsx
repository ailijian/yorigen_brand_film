import type {CSSProperties} from "react";
import {Img, staticFile} from "remotion";

export interface BrandAsset {
  id: "origin-y" | "master-lockup";
  src: string;
  alt: string;
  sourceSha256: string;
}

const brandAssets: Record<BrandAsset["id"], BrandAsset> = {
  "origin-y": {
    id: "origin-y",
    src: staticFile("assets/brand/yorigen-origin-y.svg"),
    alt: "Yorigen Origin Y",
    sourceSha256: "e72df8a37e8211778b290c054f392fa94ee1dcc59002dc192f5fccc47d2ae863",
  },
  "master-lockup": {
    id: "master-lockup",
    src: staticFile("assets/brand/yorigen-brand-lockup.svg"),
    alt: "Yorigen AI master bilingual lockup",
    sourceSha256: "daead641ae2f2c4995e3f9985abbccb99f1910cd9e377db8e492efd7db670ef9",
  },
};

type BrandAssetViewProps = {
  asset: BrandAsset["id"];
  style?: CSSProperties;
};

export const BrandAssetView = ({asset, style}: BrandAssetViewProps) => {
  const definition = brandAssets[asset];
  return <Img src={definition.src} alt={definition.alt} style={{display: "block", objectFit: "contain", ...style}} />;
};

export const BRAND_ASSETS = brandAssets;
