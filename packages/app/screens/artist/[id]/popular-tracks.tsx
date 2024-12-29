import { TrackCarouselItem } from "@/components/track-carousel-item.tsx";
import { Button } from "@/ui/button";
import { Carousel } from "@/ui/carousel";
import { Text } from "@/ui/text";
import { H1, SectionTitle } from "@/ui/typography";
import { View } from "@/ui/view";
import { useTranslation } from "@/utils/i18n";
import { useWindowSize } from "@/utils/screen";
import { SolitoImage } from "solito/image";

const DummyData = [
  {
    id: "1",
    name: "APT",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f8c8297efc6022534f1357e1",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/95/79/f5/9579f50e-ac47-1e43-acab-d422cbe17a21/mzaf_12002777810095615569.plus.aac.p.m4a",
  },
  {
    id: "2",
    name: "number one girl",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731f4e52a9789b9fa4f30d16dc",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/95/79/f5/9579f50e-ac47-1e43-acab-d422cbe17a21/mzaf_12002777810095615569.plus.aac.p.m4a",
  },
  {
    id: "3",
    name: "toxic till the end",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735074bd0894cb1340b8d8a678",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/95/79/f5/9579f50e-ac47-1e43-acab-d422cbe17a21/mzaf_12002777810095615569.plus.aac.p.m4a",
  },
  {
    id: "4",
    name: "Gone",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ff70b164939b70b696ddb8ae",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/95/79/f5/9579f50e-ac47-1e43-acab-d422cbe17a21/mzaf_12002777810095615569.plus.aac.p.m4a",
  },
  {
    id: "5",
    name: "on the ground",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ff70b164939b70b696ddb8ae",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/95/79/f5/9579f50e-ac47-1e43-acab-d422cbe17a21/mzaf_12002777810095615569.plus.aac.p.m4a",
  },
  {
    id: "6",
    name: "Rose Test Track",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/95/79/f5/9579f50e-ac47-1e43-acab-d422cbe17a21/mzaf_12002777810095615569.plus.aac.p.m4a",
  },
  {
    id: "7",
    name: "Rose Test Track",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/95/79/f5/9579f50e-ac47-1e43-acab-d422cbe17a21/mzaf_12002777810095615569.plus.aac.p.m4a",
  },
  {
    id: "8",
    name: "Rose Test Track",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/95/79/f5/9579f50e-ac47-1e43-acab-d422cbe17a21/mzaf_12002777810095615569.plus.aac.p.m4a",
  },
];

const PopularTracks = () => {
  const { width, isTablet, isMobile, isLargeScreen, isDesktop } =
    useWindowSize();

  const [t] = useTranslation("artist");
  const [commonT] = useTranslation("common");

  // const itemSize = isLargeScreen
  //   ? width / 10
  //   : isDesktop
  //     ? width / 6
  //     : isTablet || isMobile
  //       ? width / 4
  //       : width / 5;

  return (
    <>
      <View className="flex flex-row justify-between mb-1 md:mb-3">
        <SectionTitle>{t("mostPopularTracks")}</SectionTitle>
        <Button variant="link" size="fit">
          <Text className="text-sm md:text-base">{commonT("more")}</Text>
        </Button>
      </View>
      <Carousel
        data={[...DummyData, ...DummyData, ...DummyData]}
        renderItem={TrackCarouselItem}
      />
    </>
  );
};

export { PopularTracks };
