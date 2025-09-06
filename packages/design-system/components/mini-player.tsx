import React from 'react';
import { View, Pressable } from 'react-native';
import { cn } from '@/ui/utils/cn';
import { Text } from '@/ui';
import { TrackArtwork } from './track-artwork';
import { PlaybackControls } from './playback-controls';
import { VolumeControl } from './volume-control';
import { ProgressBar } from './progress-bar';
import { useMusicPlayer, useVolumeControl, useCurrentTrack } from '../hooks/use-music-player';
import { PLAYER_DIMENSIONS, PLAYER_SPACING } from '../constants/player';
import { formatTime } from '../utils/time';
import { Heart, MoreHorizontal, Maximize2 } from 'lucide-react';

interface MiniPlayerProps {
  onExpand?: () => void;
  onToggleLike?: (trackId: string) => void;
  onShowQueue?: () => void;
  className?: string;
  showVolumeControl?: boolean;
  showProgressBar?: boolean;
  isLiked?: boolean;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  onExpand,
  onToggleLike,
  onShowQueue,
  className,
  showVolumeControl = true,
  showProgressBar = true,
  isLiked = false,
}) => {
  const { play, pause, next, previous, seek, toggleShuffle, toggleRepeat, state } = useMusicPlayer();
  const { volume, isMuted, setVolume, toggleMute } = useVolumeControl();
  const { currentTrack, isPlaying, isLoading, currentTime, duration, progress } = useCurrentTrack();

  if (!currentTrack) {
    return null;
  }

  const canPlayPrevious = state.currentIndex > 0 || state.repeatMode !== 'off';
  const canPlayNext = state.currentIndex < state.queue.length - 1 || state.repeatMode !== 'off';

  return (
    <View 
      className={cn(
        'bg-spotify-dark-gray border-t border-white/10',
        'web:backdrop-blur-xl web:bg-spotify-dark-gray/95',
        className
      )}
      style={{ height: PLAYER_DIMENSIONS.MINI_HEIGHT }}
    >
      {/* Progress Bar */}
      {showProgressBar && (
        <View className="absolute top-0 left-0 right-0">
          <ProgressBar
            progress={progress}
            duration={duration}
            currentTime={currentTime}
            onSeek={seek}
            showThumb={false}
            className="h-1"
            trackClassName="bg-white/10"
            fillClassName="bg-spotify-green"
          />
        </View>
      )}

      <View 
        className="flex-1 flex-row items-center px-4"
        style={{ paddingTop: showProgressBar ? 4 : 0 }}
      >
        {/* Track Info */}
        <View className="flex-row items-center flex-1 min-w-0">
          <Pressable onPress={onExpand} className="mr-3">
            <TrackArtwork
              src={currentTrack.artwork}
              alt={`${currentTrack.title} artwork`}
              size="mini"
              className="web:hover:opacity-80 transition-opacity"
            />
          </Pressable>

          <View className="flex-1 min-w-0 mr-3">
            <Pressable onPress={onExpand}>
              <Text 
                className="text-white font-medium text-sm truncate web:hover:underline"
                numberOfLines={1}
              >
                {currentTrack.title}
              </Text>
              <Text 
                className="text-spotify-light-gray text-xs truncate web:hover:underline web:hover:text-white transition-colors"
                numberOfLines={1}
              >
                {currentTrack.artist}
              </Text>
            </Pressable>
          </View>

          {/* Like Button */}
          <Pressable
            onPress={() => onToggleLike?.(currentTrack.id)}
            className={cn(
              'p-2 rounded-full web:hover:bg-white/10 active:bg-white/10 transition-colors',
              isLiked && 'text-spotify-green'
            )}
          >
            <Heart 
              size={16} 
              className={cn(
                'transition-colors',
                isLiked ? 'text-spotify-green fill-current' : 'text-white/70'
              )}
            />
          </Pressable>
        </View>

        {/* Playback Controls */}
        <View className="flex-shrink-0 mx-4">
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
            size="small"
            variant="minimal"
          />
        </View>

        {/* Right Controls */}
        <View className="flex-row items-center flex-shrink-0 space-x-2">
          {/* Time Display */}
          <Text className="text-xs text-spotify-light-gray font-mono min-w-16 text-center">
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>

          {/* Volume Control */}
          {showVolumeControl && (
            <View className="group">
              <VolumeControl
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={setVolume}
                onToggleMute={toggleMute}
                size="small"
                showSlider={true}
                className="w-32"
              />
            </View>
          )}

          {/* Queue Button */}
          <Pressable
            onPress={onShowQueue}
            className="p-2 rounded-full web:hover:bg-white/10 active:bg-white/10 transition-colors"
          >
            <MoreHorizontal size={16} className="text-white/70" />
          </Pressable>

          {/* Expand Button */}
          <Pressable
            onPress={onExpand}
            className="p-2 rounded-full web:hover:bg-white/10 active:bg-white/10 transition-colors"
          >
            <Maximize2 size={16} className="text-white/70" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};