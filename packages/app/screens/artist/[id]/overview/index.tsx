import { View } from "@/ui/view";
import { PopularTracks } from "./popular-tracks";
import RecentThreads from "./recent-threads";

const ArtistOverview = () => {
  return (
    <View className="flex flex-col gap-6">
      <RecentThreads />
      <PopularTracks />
    </View>
  );
};

export default ArtistOverview;
