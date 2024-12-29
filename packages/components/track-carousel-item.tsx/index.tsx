import { SolitoImage } from "solito/image";

import { View } from "@/ui/view";
import { Text } from "@/ui/text";
import { Button } from "@/ui/button";
import { Pause, Play } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/ui/utils/cn";

export type TTrack = {
  id: string;
  name: string;
  description: string;
  artists: { id: string; name: string }[];
  imageUrl: string;
  audioUrl: string;
};

const TrackCarouselItem = ({ item }: { item: TTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(item.audioUrl);
    }
    setIsPlaying(true);
    audioRef.current.play();
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };

  return (
    <View
      className="flex flex-col items-center cursor-pointer transition-all duration-300 overflow-hidden"
      key={item.id}
    >
      <View className="group relative overflow-hidden rounded-lg">
        <SolitoImage
          src={item.imageUrl}
          width={1000}
          height={1000}
          alt={item.name}
          // @ts-ignore
          className="rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          onPress={isPlaying ? pauseAudio : playAudio}
          size="icon"
          className={cn(
            "absolute bottom-2 right-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-background",
            isPlaying && "!opacity-100 !translate-y-0",
          )}
          radius="full"
        >
          {isPlaying ? (
            <Pause className="size-4 md:size-5 text-foreground" />
          ) : (
            <Play className="size-4 md:size-5 text-foreground" />
          )}
        </Button>
      </View>
      <Text className="text-md font-readex mt-2 md:text-lg text-center">
        {item.name}
      </Text>
    </View>
  );
};

export { TrackCarouselItem };
