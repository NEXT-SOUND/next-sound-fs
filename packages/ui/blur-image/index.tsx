import { Image, ImageContentFit } from "expo-image";
import { BlurImageProps } from "./types";
import { View } from "react-native";
import Gradient from "ui/gradient";

export function BlurImage({
  src,
  alt,
  width,
  height,
  blurRadius = 8,
  style,
  contentFit,
}: BlurImageProps) {
  return (
    <View style={{ width, height, overflow: "hidden" }}>
      <Image
        source={src}
        alt={alt}
        blurRadius={blurRadius}
        style={[{ width, height }, style]}
        contentFit={contentFit as ImageContentFit}
      />
      <Gradient
        colors={[
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.2)",
          "rgba(255,255,255,0.4)",
          "rgba(255,255,255,0.8)",
          "rgba(255,255,255,1)",
        ]}
        width={width}
        height={height * 1.06}
        positions={[0, 0.3, 0.5, 0.75, 1]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: -height * 0.05,
        }}
      />
    </View>
  );
}
