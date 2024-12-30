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
import Tabs from "@/ui/tabs";
import { SectionTitle } from "@/ui/typography";
import { useTranslation } from "next-i18next";
import { Button } from "@/ui/button";

export function ArtistProfileLayout() {
  const { t } = useTranslation("artist");
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
      <Tabs
        tabs={[
          { label: t("overview"), content: <PopularTracks /> },
          {
            label: t("tracks"),
            content: (
              <>
                <SectionTitle>
                  {t("allTracks", { artist: "Rose" })}
                </SectionTitle>
              </>
            ),
          },
          {
            label: t("posts"),
            content: (
              <SectionTitle>{t("allPosts", { artist: "Rose" })}</SectionTitle>
            ),
          },
          {
            label: t("forFans", { fanName: "블링크" }),
            content: (
              <View>
                <SectionTitle>
                  {t("onlyForFans", { fanName: "블링크" })}
                </SectionTitle>
                <Text className="text-white-50 text-lg font-readex mt-1">
                  블링크가 되면 Rose의 특별한 소식을 볼 수 있어요.
                </Text>
                <Button className="mt-4 w-36">블링크 되기</Button>
              </View>
            ),
          },
        ]}
      />
      {/* <SectionTitle>포스트들</SectionTitle> */}
      {/* <SectionTitle>최신 음악</SectionTitle> */}

      {/* <SectionTitle>가장 인기있는 음악들</SectionTitle>
      <SectionTitle>오직 블링크를 위한</SectionTitle> */}
    </ProfileLayout>
  );
}
