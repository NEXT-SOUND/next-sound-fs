import { cn } from "@/ui/utils/cn";
import { View } from "@/ui/view";
import { useTranslation } from "@/utils/i18n";
import { useSafeArea } from "@/utils/safe-area";
import { useWindowSize, IS_WEB } from "@/utils/screen";
import useAverageColor from "@/utils/useAverageColor";
import { MotiView } from "moti";
import { SolitoImage } from "solito/image";
import { BlurImage } from "../blur-image";
import { ScrollView } from "react-native";

interface Props {
  children: React.ReactNode;
  header: React.ReactNode;
  fixedHeader?: React.ReactNode;
  imageSrc: string;
}

export const ProfileLayout = ({ imageSrc, children, header }: Props) => {
  const { width, isDesktop, isMobile, isServer } = useWindowSize();
  const { top: safeAreaTop } = useSafeArea();

  const top = IS_WEB ? 32 : safeAreaTop;
  const imageSize = Math.min(width * 0.3, isMobile ? width * 0.3 : 300);
  const backgroundImageHeight = imageSize * 2.75 + top;
  const backgroundImageContainerHeight = isMobile
    ? imageSize * 2.25 + top
    : 535;
  const backgroundImageWidth = isDesktop ? width : width * 1.3;

  const { colors, isFetched } = useAverageColor(imageSrc);

  const { t } = useTranslation("common");

  return (
    <>
      <BlurImage
        alt="background image"
        src={imageSrc}
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
      <View
        className={cn(
          "absolute top-0 z-50 flex flex-row container px-[16px] pt-4 web:pt-2",
          "web:left-1/2 web:-translate-x-1/2",
        )}
        style={{ top, height: backgroundImageContainerHeight }}
      >
        {header}
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
            src={imageSrc}
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
      <ScrollView
        className={cn(
          "z-50 flex flex-col container px-[16px] pt-4 web:pt-2 absolute",
          "web:left-1/2 web:-translate-x-1/2",
          "lg:top-[420px] md:top-[380px] top-[220px]",
        )}
      >
        {children}
      </ScrollView>
    </>
  );
};
