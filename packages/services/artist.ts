import { useTranslation } from "@/utils/i18n";
import { gql } from "@apollo/client";

const GET_ARTIST_INFO = gql`
  query GetArtistInfo($id: String!) {
    artist(id: $id) {
      name
      imageUrl
    }
  }
`;

const useGetArtist = () => {
  const [, i18n] = useTranslation();

  if (i18n.language === "ko") {
    return {
      name: "로즈",
      imageUrl:
        "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
      followers: 1000000,
      fans: 1000000,
      label: "YG Entertainment",
      group: undefined,
      fanName: "Rose",
    };
  }

  return {
    name: "Rose",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf",
    followers: 1000000,
    fans: 1000000,
    label: "YG Entertainment",
    group: undefined,
    fanName: "Rose",
  };
};
