import React from "react";
import Gradient from "ui/gradient";
import { View } from "ui/view";
import { IS_WEB, useWindowSize } from "utils/screen";
import { useSafeArea } from "utils/safe-area";
import { SolitoImage } from "solito/image";
import { BlurImage } from "ui/blur-image";
import useAverageColor from "utils/useAverageColor";
import { Text } from "@/ui/text";
import { useColorScheme } from "utils/use-color-schema";
import { Button } from "ui/button";
import { cn } from "@/ui/utils/cn";

export function ArtistInfo() {
  return (
    <View className="flex-1 bg-background">
      <BackgroundImage src="https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf" />
    </View>
  );
}

export const BackgroundImage = ({ src }: { src: string }) => {
  const { width, isDesktop, isMobile } = useWindowSize();
  const { top: safeAreaTop } = useSafeArea();

  const top = IS_WEB ? 32 : safeAreaTop;
  const imageSize = Math.min(width * 0.3, isMobile ? width * 0.232 : 300);
  const backgroundImageHeight = imageSize * 2.75 + top;
  const backgroundImageContainerHeight = isMobile
    ? imageSize * 2.75 + top
    : 535;
  const backgroundImageWidth = isDesktop ? width : width * 1.3;

  const { colors, isFetched } = useAverageColor(src);

  return (
    <View className="relative w-full h-full">
      <View className="overflow-x-hidden flex-1">
        <BlurImage
          alt="test"
          src={src}
          blurRadius={isDesktop ? 30 : 16}
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
      <View
        className={cn(
          "absolute top-0 z-50 flex flex-row container",
          IS_WEB && "left-1/2 -translate-x-1/2",
        )}
        style={{ top, height: backgroundImageContainerHeight }}
      >
        <Text className="text-white text-5xl font-bold lg:text-8xl">Rose</Text>
        <SolitoImage
          src={src}
          width={imageSize}
          height={imageSize}
          style={{
            borderRadius: 9999,
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 100,
            borderColor: "white",
            borderWidth: isDesktop ? 8 : 3,
          }}
          contentFit="cover"
          alt="test"
        />
      </View>
    </View>
  );
};