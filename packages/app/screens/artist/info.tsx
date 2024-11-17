import React from "react";
import Gradient from "ui/gradient";
import { View } from "ui/view";
import { IS_WEB, useWindowSize } from "utils/screen";
import { useSafeArea } from "utils/safe-area";
import { SolitoImage } from "solito/image";
import { BlurImage } from "ui/blur-image";
import useAverageColor from "utils/useAverageColor";
import { Text } from "ui/text";
import { useColorScheme } from "utils/use-color-schema";
import { Button } from "ui/button";

export function ArtistInfo() {
  return (
    <View className="flex-1 bg-background">
      <BackgroundImage src="https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf" />
    </View>
  );
}

export const BackgroundImage = ({ src }: { src: string }) => {
  const { width, isDesktop } = useWindowSize();
  const { top } = useSafeArea();

  const imageSize = Math.min(width * 0.3, isDesktop ? 300 : 100);
  const backgroundImageHeight = imageSize * 2.75 + top;
  const backgroundImageContainerHeight = isDesktop
    ? 535
    : imageSize * 2.75 + top;
  const backgroundImageWidth = isDesktop ? width : width * 1.3;

  const { colors, isFetched } = useAverageColor(src);

  return (
    <>
      <View className="overflow-x-hidden flex-1">
        <View
          className="absolute top-0 left-0 z-50 flex flex-col items-center p-4"
          style={{ top, height: backgroundImageContainerHeight }}
        >
          <Text className="text-white text-4xl font-bold">Rose</Text>
        </View>
        <SolitoImage
          src={src}
          width={imageSize}
          height={imageSize}
          style={{
            borderRadius: 9999,
            position: "absolute",
            top: top + (isDesktop ? 86 : 16),
            right: isDesktop ? 64 : 16,
            zIndex: 100,
            borderColor: "white",
            borderWidth: isDesktop ? 8 : 3,
            width: imageSize,
            height: imageSize,
          }}
          contentFit="cover"
          alt="test"
        />
        <BlurImage
          alt="test"
          src={src}
          blurRadius={24}
          backgroundColor={isFetched ? colors.background : "transparent"}
          width={backgroundImageWidth}
          height={backgroundImageContainerHeight}
          contentFit={isDesktop ? "contain" : "cover"}
          style={{
            position: "relative",
            ...(isDesktop && {
              width: width,
              height: backgroundImageHeight * 1,
              top: -backgroundImageHeight * 0.05,
              objectPosition: "right",
            }),
          }}
        />
      </View>
    </>
  );
};