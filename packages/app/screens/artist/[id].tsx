import React from "react";
import Gradient from "ui/gradient";
import { View } from "ui/view";
import { IS_WEB, useWindowSize } from "utils/screen";
import { useSafeArea } from "utils/safe-area";
import { SolitoImage } from "solito/image";
import { BlurImage } from "ui/blur-image";
import useAverageColor from "utils/useAverageColor";
import { Text } from "@/ui/text";
import { useColorScheme } from "@/utils/theme";
import { Button } from "ui/button";
import { cn } from "@/ui/utils/cn";
import { MotiView } from "moti";
import { useTranslation } from "@/utils/i18n";

export function ArtistInfo() {
  return (
    <View className="flex-1 bg-background">
      <BackgroundImage src="https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf" />
    </View>
  );
}

export const BackgroundImage = ({ src }: { src: string }) => {
  const { width, isDesktop, isMobile, isServer } = useWindowSize();
  const { top: safeAreaTop } = useSafeArea();

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const top = IS_WEB ? 32 : safeAreaTop;
  const imageSize = Math.min(width * 0.3, isMobile ? width * 0.3 : 300);
  const backgroundImageHeight = imageSize * 2.75 + top;
  const backgroundImageContainerHeight = isMobile
    ? imageSize * 2.25 + top
    : 535;
  const backgroundImageWidth = isDesktop ? width : width * 1.3;

  const { colors, isFetched } = useAverageColor(src);

  const { t } = useTranslation("common");

  const { setColorScheme } = useColorScheme();

  return (
    <View className="relative w-full h-full">
      <View className="overflow-x-hidden flex-1">
        <BlurImage
          alt="background image"
          src={src}
          blurRadius={16}
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
          "absolute top-0 z-50 flex flex-row container px-[16px] pt-4 web:pt-2",
          "web:left-1/2 web:-translate-x-1/2",
        )}
        style={{ top, height: backgroundImageContainerHeight }}
      >
        <View className="flex flex-col">
          <View>
            <Text className="text-white text-5xl md:text-8xl sm:text-7xl font-readexBold">
              Rose
            </Text>
            <Text className="text-white-80 text-2xl font-readex">@rose</Text>
          </View>
        </View>
        <MotiView
          from={{
            opacity: 0,
            transform: [{ translateY: -8 }],
          }}
          animate={{
            opacity: 1,
            transform: [{ translateY: 0 }],
          }}
          transition={{ duration: 500 }}
          style={{
            width: imageSize,
            height: imageSize,
            position: "absolute",
            top: 16,
            right: 16,
          }}
        >
          <SolitoImage
            src={src}
            width={imageSize}
            height={imageSize}
            style={{
              borderRadius: 9999,
              zIndex: 100,
              borderColor: "white",
              borderWidth: isServer ? 0 : isDesktop ? 8 : 3,
            }}
            contentFit="cover"
            alt="cover image"
            priority
            transition={500}
          />
        </MotiView>
      </View>
    </View>
  );
};
