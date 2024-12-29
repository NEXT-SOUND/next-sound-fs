import React from "react";
import Gradient from "components/gradient";
import { View } from "ui/view";
import { IS_WEB, useWindowSize } from "utils/screen";
import { useSafeArea } from "utils/safe-area";
import { BlurImage } from "components/blur-image";
import useAverageColor from "utils/useAverageColor";
import { Text } from "@/ui/text";

import { ProfileLayout } from "@/components/profile-layout";

import { PopularTracks } from "./popular-tracks";
export function ArtistInfo() {
  return (
    <ProfileLayout
      imageSrc="https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf"
      header={
        <View className="flex flex-col">
          <View>
            <Text className="text-white text-5xl md:text-8xl sm:text-7xl font-readexBold">
              Rose
            </Text>
            <Text className="text-white-80 text-2xl font-readex">@rose</Text>
          </View>
          <Text className="text-white-50 text-lg font-readex mt-4">
            YG Entertainment
          </Text>
        </View>
      }
    >
      {/* <SectionTitle>포스트들</SectionTitle> */}
      {/* <SectionTitle>최신 음악</SectionTitle> */}
      <PopularTracks />
      {/* <SectionTitle>가장 인기있는 음악들</SectionTitle>
      <SectionTitle>오직 블링크를 위한</SectionTitle> */}
    </ProfileLayout>
  );
}
