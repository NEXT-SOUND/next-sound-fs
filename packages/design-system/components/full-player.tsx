import React, { useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { cn } from '@/ui/utils/cn';
import { Text, Button } from '@/ui';
import { TrackArtwork } from './track-artwork';
import { PlaybackControls } from './playback-controls';
import { VolumeControl } from './volume-control';
import { ProgressBar } from './progress-bar';
import { useMusicPlayer, useVolumeControl, useCurrentTrack, useQueue } from '../hooks/use-music-player';
import { PLAYER_DIMENSIONS, PLAYER_SPACING } from '../constants/player';
import { formatTime } from '../utils/time';
import { 
  ChevronDown, 
  Heart, 
  MoreHorizontal, 
  List, 
  Share,
  Download,
  Plus
} from 'lucide-react';
import { useSafeArea } from '@/utils/safe-area';

interface FullPlayerProps {
  onMinimize?: () => void;
  onToggleLike?: (trackId: string) => void;
  onShare?: (trackId: string) => void;
  onAddToPlaylist?: (trackId: string) => void;
  className?: string;
  isLiked?: boolean;
  showQueue?: boolean;
  onToggleQueue?: () => void;
}

export const FullPlayer: React.FC<FullPlayerProps> = ({
  onMinimize,
  onToggleLike,
  onShare,
  onAddToPlaylist,
  className,
  isLiked = false,
  showQueue = false,
  onToggleQueue,
}) => {
  const { top, bottom } = useSafeArea();
  const [showLyrics, setShowLyrics] = useState(false);
  
  const { play, pause, next, previous, seek, toggleShuffle, toggleRepeat, state } = useMusicPlayer();
  const { volume, isMuted, setVolume, toggleMute } = useVolumeControl();
  const { currentTrack, isPlaying, isLoading, currentTime, duration, progress } = useCurrentTrack();
  const { queue, currentIndex } = useQueue();

  if (!currentTrack) {
    return null;
  }

  const canPlayPrevious = currentIndex > 0 || state.repeatMode !== 'off';
  const canPlayNext = currentIndex < queue.length - 1 || state.repeatMode !== 'off';

  return (
    <View 
      className={cn(
        'flex-1 bg-gradient-to-b from-spotify-black to-spotify-dark-gray',
        className
      )}
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Pressable
          onPress={onMinimize}
          className="p-2 -ml-2 rounded-full web:hover:bg-white/10 active:bg-white/10 transition-colors"
        >
          <ChevronDown size={24} className="text-white" />
        </Pressable>
        
        <Text className="text-white font-medium text-sm">
          Playing from {currentTrack.album || 'Queue'}
        </Text>
        
        <Pressable
          onPress={() => onShare?.(currentTrack.id)}
          className="p-2 -mr-2 rounded-full web:hover:bg-white/10 active:bg-white/10 transition-colors"
        >
          <MoreHorizontal size={24} className="text-white" />
        </Pressable>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: PLAYER_SPACING.XL }}
      >
        {/* Main Content */}
        <View className="flex-1 justify-center items-center py-8">
          {/* Artwork */}
          <View className="mb-8" style={{ marginBottom: PLAYER_SPACING.XXXL }}>
            <TrackArtwork
              src={currentTrack.artwork}
              alt={`${currentTrack.title} artwork`}
              size="large"
              className="shadow-2xl"
            />
          </View>

          {/* Track Info */}
          <View className="w-full mb-6" style={{ marginBottom: PLAYER_SPACING.XL }}>
            <Text 
              className="text-white font-bold text-2xl text-center mb-2"
              numberOfLines={2}
            >
              {currentTrack.title}
            </Text>
            <Text 
              className="text-spotify-light-gray text-lg text-center"
              numberOfLines={1}
            >
              {currentTrack.artist}
            </Text>
          </View>

          {/* Progress */}
          <View className="w-full mb-6" style={{ marginBottom: PLAYER_SPACING.XL }}>
            <ProgressBar
              progress={progress}
              duration={duration}
              currentTime={currentTime}
              onSeek={seek}
              className="mb-4"
              trackClassName="bg-white/20"
              fillClassName="bg-white"
              thumbClassName="bg-white shadow-lg"
            />
            
            <View className="flex-row justify-between">
              <Text className="text-spotify-light-gray text-sm font-mono">
                {formatTime(currentTime)}
              </Text>
              <Text className="text-spotify-light-gray text-sm font-mono">
                {formatTime(duration)}
              </Text>
            </View>
          </View>

          {/* Playback Controls */}
          <View className="mb-8" style={{ marginBottom: PLAYER_SPACING.XXXL }}>
            <PlaybackControls
              isPlaying={isPlaying}
              isLoading={isLoading}
              canPlayPrevious={canPlayPrevious}
              canPlayNext={canPlayNext}
              isShuffled={state.isShuffled}
              repeatMode={state.repeatMode}
              onPlay={play}
              onPause={pause}
              onPrevious={previous}
              onNext={next}
              onToggleShuffle={toggleShuffle}
              onToggleRepeat={toggleRepeat}
              size="large"
              variant="full"
            />
          </View>

          {/* Secondary Controls */}
          <View className="flex-row items-center justify-between w-full max-w-sm">
            {/* Like Button */}
            <Pressable
              onPress={() => onToggleLike?.(currentTrack.id)}
              className={cn(
                'p-3 rounded-full web:hover:bg-white/10 active:bg-white/10 transition-colors',
                isLiked && 'text-spotify-green'
              )}
            >
              <Heart 
                size={24} 
                className={cn(
                  'transition-colors',
                  isLiked ? 'text-spotify-green fill-current' : 'text-white/70'
                )}
              />
            </Pressable>

            {/* Volume Control */}
            <View className="flex-1 mx-6">
              <VolumeControl
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={setVolume}
                onToggleMute={toggleMute}
                showSlider={true}
                className="justify-center"
              />
            </View>

            {/* Queue Button */}
            <Pressable
              onPress={onToggleQueue}
              className={cn(
                'p-3 rounded-full web:hover:bg-white/10 active:bg-white/10 transition-colors',
                showQueue && 'bg-white/10'
              )}
            >
              <List size={24} className="text-white/70" />
            </Pressable>
          </View>

          {/* Action Buttons */}
          <View className="flex-row items-center justify-center space-x-4 mt-8 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              size="sm"
              onPress={() => onAddToPlaylist?.(currentTrack.id)}
              className="flex-row items-center space-x-2"
            >
              <Plus size={16} className="text-white/70" />
              <Text className="text-white/70 text-sm">Add to Playlist</Text>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onPress={() => onShare?.(currentTrack.id)}
              className="flex-row items-center space-x-2"
            >
              <Share size={16} className="text-white/70" />
              <Text className="text-white/70 text-sm">Share</Text>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex-row items-center space-x-2"
            >
              <Download size={16} className="text-white/70" />
              <Text className="text-white/70 text-sm">Download</Text>
            </Button>
          </View>

          {/* Lyrics Toggle */}
          {false && ( // Placeholder for lyrics feature
            <View className="mt-8 pt-6 border-t border-white/10 w-full">
              <Button
                variant="ghost"
                onPress={() => setShowLyrics(!showLyrics)}
                className="w-full"
              >
                <Text className="text-white/70">
                  {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
                </Text>
              </Button>
              
              {showLyrics && (
                <View className="mt-4 p-4 bg-white/5 rounded-lg">
                  <Text className="text-white/70 text-center italic">
                    Lyrics not available
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};