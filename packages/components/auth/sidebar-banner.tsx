import AnimatedView from "@/ui/animated-view";
import Gradient from "@/ui/gradient";
import { H1, H5 } from "@/ui/typography";
import { View } from "@/ui/view";
import { useWindowSize } from "@/utils/screen";
import { SIDE_BANNER_ASSETS } from "constants/side-banner-aseets";
import * as React from "react";
import { SolitoImage } from "solito/image";
import Logo from "../logo";

interface SidebarBannerProps {
  className?: string;
}

export function SidebarBanner({ className }: SidebarBannerProps) {
  const [{ colors, image, title, name }] = React.useState(() => {
    const randomIndex = Math.floor(Math.random() * SIDE_BANNER_ASSETS.length);
    return SIDE_BANNER_ASSETS[randomIndex]!;
  });

  const { width, height } = useWindowSize();

  return (
    <AnimatedView
      className={`relative overflow-hidden h-screen ${className || ""}`}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 300 }}
    >
      <Gradient
        colors={colors || ["#5D7A97", "#000"]}
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <View className="flex items-center justify-between flex-1 mt-[10vh]">
        <View className="flex flex-col items-center justify-center gap-2">
          <H1 className="text-center text-white pb-2">
            {title?.replace("<br/>", "\n")}
          </H1>
          <Logo color="white" />
        </View>
        <SolitoImage
          src={image || "/side-banner-1.png"}
          alt="background"
          height={0}
          width={width}
        />
        <H5 className="absolute bottom-4 right-4 font-montBold text-beige-600">
          {name}
        </H5>
      </View>
    </AnimatedView>
  );
}
