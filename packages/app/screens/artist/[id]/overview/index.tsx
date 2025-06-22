import { View } from "@/ui/view";
import { PopularTracks } from "./popular-tracks";

const ArtistOverview = () => {
  return (
    <View className="flex flex-col gap-6">
      <PopularTracks />
    </View>
  );
};

export default ArtistOverview;
