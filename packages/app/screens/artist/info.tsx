import React from "react";
import { SolitoImage } from "solito/image";
import Gradient from "ui/gradient/gradient";
import { View } from "ui/view";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "utils/screen";
import { Image } from "expo-image";
import { useSafeArea } from "utils/safe-area";

export function ArtistInfo() {
  return (
    <View className="flex-1">
      <BackgroundImage src="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/26183141_529843450713422_6399534028755566592_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi42ODV4ODU2LnNkci5mMjg4NS5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=gE0ayr2etAoQ7kNvgGGeqzj&_nc_gid=02ab90c8349e4ca789a244a305b09a45&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MTY5NDk0MTE4MDU5NDYwNTc1Nw%3D%3D.3-ccb7-5&oh=00_AYAwc2YNAjh3vk9oYdoW82Y20msGxoFux9UGCPm02ECACA&oe=673E3F35&_nc_sid=22de04" />
    </View>
  );
}

export const BackgroundImage = ({ src }: { src: string }) => {
  const { top } = useSafeArea();
  return (
    <View className="bg-red-500">
      <SolitoImage
        src={src}
        width={SCREEN_WIDTH * 0.3}
        height={SCREEN_WIDTH * 0.3}
        style={{
          borderRadius: 9999,
          position: "absolute",
          top: top,
          right: 16,
          zIndex: 100,
          borderColor: "white",
          borderWidth: 3,
        }}
        contentFit="cover"
        alt="test"
      />
      <Image
        blurRadius={45}
        source={src}
        style={{
          width: SCREEN_WIDTH * 1.25,
          height: SCREEN_WIDTH * 0.9,
        }}
        contentFit="cover"
      />
      <Gradient
        style={{
          position: "absolute",
          left: 0,
        }}
        colors={["#FFFFFF00", "#0000007a", "#000000", "#000000"]}
        positions={[0, 0.25, 0.3, 1]}
        width={SCREEN_WIDTH * 1.25}
        height={SCREEN_HEIGHT * 1}
      />
    </View>
  );
};
