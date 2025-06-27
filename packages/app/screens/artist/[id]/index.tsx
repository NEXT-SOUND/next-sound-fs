import React from "react";
import Gradient from "components/gradient";
import { View } from "ui/view";
import { IS_WEB, useWindowSize } from "utils/screen";
import { useSafeArea } from "utils/safe-area";
import { BlurImage } from "components/blur-image";
import useAverageColor from "utils/useAverageColor";
import { Text } from "@/ui/text";
import { ProfileLayout } from "@/components/profile-layout";
import { PopularTracks } from "./overview/popular-tracks";
import Tabs from "@/ui/tabs";
import { SectionTitle } from "@/ui/typography";
import { useTranslation } from "@/utils/i18n";
import { Button } from "@/ui/button";
import ArtistOverview from "./overview";

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
          { label: t("overview"), content: <ArtistOverview /> },
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
            label: t("feeds"),
            content: (
              <SectionTitle>{t("allFeeds", { artist: "Rose" })}</SectionTitle>
            ),
          },
          {
            label: t("forFans", { fanName: "블링크" }),
            content: (
              <View>
                <SectionTitle>
                  {t("onlyForFans", { fanName: "블링크" })}
                </SectionTitle>
                <Text className="dark:text-white-50 text-black-50 text-base sm:text-lg font-readex mt-1">
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
