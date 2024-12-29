import { Button } from "@/ui/button";
import { Carousel } from "@/ui/carousel";
import { Text } from "@/ui/text";
import { H1, SectionTitle } from "@/ui/typography";
import { View } from "@/ui/view";
import { useTranslation } from "@/utils/i18n";
import { useWindowSize } from "@/utils/screen";
import { SolitoImage } from "solito/image";

type Track = {
  id: string;
  name: string;
  description: string;
  artists: { id: string; name: string }[];
  imageUrl: string;
};

const DummyData = [
  {
    id: "1",
    name: "APT",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f8c8297efc6022534f1357e1",
  },
  {
    id: "2",
    name: "number one girl",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731f4e52a9789b9fa4f30d16dc",
  },
  {
    id: "3",
    name: "toxic till the end",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2735074bd0894cb1340b8d8a678",
  },
  {
    id: "4",
    name: "Gone",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ff70b164939b70b696ddb8ae",
  },
  {
    id: "5",
    name: "on the ground",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ff70b164939b70b696ddb8ae",
  },
  {
    id: "6",
    name: "Rose Test Track",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
  },
  {
    id: "7",
    name: "Rose Test Track",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
  },
  {
    id: "8",
    name: "Rose Test Track",
    description: "test",
    artists: [{ id: "1", name: "test" }],
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
  },
];

const PopularTracks = () => {
  const { width, isTablet, isMobile, isLargeScreen, isDesktop } =
    useWindowSize();

  const [t] = useTranslation("artist");
  const [commonT] = useTranslation("common");

  const itemSize = isLargeScreen
    ? width / 10
    : isDesktop
      ? width / 6
      : isTablet || isMobile
        ? width / 3
        : width / 5;

  return (
    <>
      <View className="flex flex-row justify-between mb-4 items-center">
        <SectionTitle>{t("mostPopularTracks")}</SectionTitle>
        <Button variant="link">
          <Text>{commonT("more")}</Text>
        </Button>
      </View>
      <Carousel
        data={[...DummyData, ...DummyData, ...DummyData]}
        renderItem={({ item }) => (
          <View
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300"
            key={item.id}
          >
            <SolitoImage
              src={item.imageUrl}
              width={itemSize}
              height={itemSize}
              alt={item.name}
              // @ts-ignore
              className="rounded-lg"
            />
            <Text className="text-white text-md font-readex mt-2 md:text-lg text-center">
              {item.name}
            </Text>
          </View>
        )}
      />
    </>
  );
};

export { PopularTracks };
