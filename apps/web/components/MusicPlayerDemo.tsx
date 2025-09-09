import React from 'react';
import { Button, Text, View } from '@/ui';
import { useMusicPlayer, Track } from 'design-system';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

// Demo tracks - replace with real data
const demoTracks: Track[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: 355,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    artwork: 'https://picsum.photos/400/400?random=1',
    genre: 'Rock',
    releaseDate: '1975-10-31',
  },
  {
    id: '2',
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    duration: 183,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    artwork: 'https://picsum.photos/400/400?random=2',
    genre: 'Rock',
    releaseDate: '1971-09-09',
  },
  {
    id: '3',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: 391,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    artwork: 'https://picsum.photos/400/400?random=3',
    genre: 'Rock',
    releaseDate: '1976-12-08',
  },
];

export const MusicPlayerDemo: React.FC = () => {
  const { playTrack, play, pause, next, previous, state } = useMusicPlayer();

  const handlePlayTrack = (track: Track) => {
    playTrack(track, demoTracks);
  };

  const handlePlayPause = async () => {
    if (state.isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  return (
    <View className="p-8 bg-spotify-dark-gray rounded-2xl border border-white/10">
      <Text className="text-white text-2xl font-bold mb-6">
        Music Player Demo
      </Text>
      
      {/* Current Track Info */}
      {state.currentTrack && (
        <View className="mb-8 p-6 bg-spotify-gray rounded-lg">
          <Text className="text-white font-semibold text-lg mb-2">
            Now Playing
          </Text>
          <Text className="text-white font-medium">
            {state.currentTrack.title}
          </Text>
          <Text className="text-spotify-light-gray">
            {state.currentTrack.artist}
          </Text>
        </View>
      )}

      {/* Playback Controls */}
      <View className="flex-row items-center justify-center space-x-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onPress={previous}
          disabled={state.currentIndex <= 0}
          className="text-white hover:bg-white/10"
        >
          <SkipBack size={20} />
        </Button>
        
        <Button
          variant="spotify"
          size="lg"
          onPress={handlePlayPause}
          disabled={!state.currentTrack || state.isLoading}
          className="rounded-full"
        >
          {state.isLoading ? (
            <View className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : state.isPlaying ? (
            <Pause size={24} className="text-black" />
          ) : (
            <Play size={24} className="text-black ml-1" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onPress={next}
          disabled={state.currentIndex >= state.queue.length - 1}
          className="text-white hover:bg-white/10"
        >
          <SkipForward size={20} />
        </Button>
      </View>

      {/* Track List */}
      <View className="space-y-3">
        <Text className="text-white font-semibold text-lg mb-4">
          Demo Tracks
        </Text>
        {demoTracks.map((track, index) => (
          <Button
            key={track.id}
            variant="ghost"
            onPress={() => handlePlayTrack(track)}
            className={`
              w-full justify-start p-4 rounded-lg transition-colors
              ${state.currentTrack?.id === track.id 
                ? 'bg-spotify-green/20 text-spotify-green' 
                : 'text-white hover:bg-white/10'
              }
            `}
          >
            <View className="flex-row items-center space-x-4">
              <Text className="text-sm font-mono w-6 text-center">
                {index + 1}
              </Text>
              <View className="flex-1 min-w-0">
                <Text 
                  className={`font-medium ${
                    state.currentTrack?.id === track.id 
                      ? 'text-spotify-green' 
                      : 'text-white'
                  }`}
                  numberOfLines={1}
                >
                  {track.title}
                </Text>
                <Text className="text-spotify-light-gray text-sm" numberOfLines={1}>
                  {track.artist}
                </Text>
              </View>
              <Text className="text-spotify-light-gray text-sm font-mono">
                {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
              </Text>
            </View>
          </Button>
        ))}
      </View>

      {/* Player State Debug Info */}
      <View className="mt-8 p-4 bg-spotify-black/50 rounded-lg">
        <Text className="text-spotify-light-gray text-sm font-mono">
          Debug Info:
        </Text>
        <Text className="text-spotify-light-gray text-xs font-mono">
          Queue Length: {state.queue.length}
        </Text>
        <Text className="text-spotify-light-gray text-xs font-mono">
          Current Index: {state.currentIndex}
        </Text>
        <Text className="text-spotify-light-gray text-xs font-mono">
          Is Playing: {state.isPlaying ? 'Yes' : 'No'}
        </Text>
        <Text className="text-spotify-light-gray text-xs font-mono">
          Is Loading: {state.isLoading ? 'Yes' : 'No'}
        </Text>
      </View>
    </View>
  );
};