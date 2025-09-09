import React from 'react';
import { View, Pressable } from 'react-native';
import { cn } from '@/ui/utils/cn';
import { Button } from '@/ui';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1,
  Loader2
} from 'lucide-react';
import { PLAYER_DIMENSIONS, PLAYER_SPACING } from '../constants/player';
import { RepeatMode } from '../types/music';

interface PlaybackControlsProps {
  isPlaying: boolean;
  isLoading?: boolean;
  canPlayPrevious?: boolean;
  canPlayNext?: boolean;
  isShuffled?: boolean;
  repeatMode?: RepeatMode;
  onPlay?: () => void;
  onPause?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onToggleShuffle?: () => void;
  onToggleRepeat?: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'minimal' | 'full';
  className?: string;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  isLoading = false,
  canPlayPrevious = true,
  canPlayNext = true,
  isShuffled = false,
  repeatMode = RepeatMode.OFF,
  onPlay,
  onPause,
  onPrevious,
  onNext,
  onToggleShuffle,
  onToggleRepeat,
  size = 'medium',
  variant = 'full',
  className,
}) => {
  const controlSizes = {
    small: {
      main: PLAYER_DIMENSIONS.CONTROL_SIZE_SMALL,
      secondary: PLAYER_DIMENSIONS.CONTROL_SIZE_SMALL - 8,
      icon: 16,
      iconMain: 20,
    },
    medium: {
      main: PLAYER_DIMENSIONS.CONTROL_SIZE,
      secondary: PLAYER_DIMENSIONS.CONTROL_SIZE - 8,
      icon: 20,
      iconMain: 24,
    },
    large: {
      main: PLAYER_DIMENSIONS.CONTROL_SIZE_LARGE,
      secondary: PLAYER_DIMENSIONS.CONTROL_SIZE - 4,
      icon: 24,
      iconMain: 32,
    },
  };

  const sizes = controlSizes[size];

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case RepeatMode.ONE:
        return <Repeat1 size={sizes.icon} />;
      case RepeatMode.ALL:
        return <Repeat size={sizes.icon} />;
      default:
        return <Repeat size={sizes.icon} />;
    }
  };

  return (
    <View 
      className={cn(
        'flex-row items-center justify-center',
        variant === 'full' ? 'space-x-4' : 'space-x-2',
        className
      )}
    >
      {/* Shuffle Button - Only in full variant */}
      {variant === 'full' && (
        <Pressable
          onPress={onToggleShuffle}
          disabled={!onToggleShuffle}
          className={cn(
            'items-center justify-center rounded-full',
            'web:hover:bg-white/10 active:bg-white/10 transition-colors',
            isShuffled && 'bg-spotify-green/20'
          )}
          style={{ width: sizes.secondary, height: sizes.secondary }}
        >
          <Shuffle 
            size={sizes.icon} 
            className={cn(
              'transition-colors',
              isShuffled ? 'text-spotify-green' : 'text-white/70'
            )}
          />
        </Pressable>
      )}

      {/* Previous Button */}
      <Pressable
        onPress={onPrevious}
        disabled={!canPlayPrevious || !onPrevious}
        className={cn(
          'items-center justify-center rounded-full',
          'web:hover:bg-white/10 active:bg-white/10 transition-colors',
          (!canPlayPrevious || !onPrevious) && 'opacity-40'
        )}
        style={{ width: sizes.secondary, height: sizes.secondary }}
      >
        <SkipBack 
          size={sizes.icon} 
          className="text-white fill-current" 
        />
      </Pressable>

      {/* Play/Pause Button */}
      <Pressable
        onPress={handlePlayPause}
        disabled={isLoading || (!onPlay && !onPause)}
        className={cn(
          'items-center justify-center rounded-full bg-white',
          'web:hover:scale-105 active:scale-95 transition-transform',
          'shadow-lg',
          (isLoading || (!onPlay && !onPause)) && 'opacity-60'
        )}
        style={{ width: sizes.main, height: sizes.main }}
      >
        {isLoading ? (
          <Loader2 
            size={sizes.iconMain} 
            className="text-black animate-spin" 
          />
        ) : isPlaying ? (
          <Pause 
            size={sizes.iconMain} 
            className="text-black fill-current ml-0.5" 
          />
        ) : (
          <Play 
            size={sizes.iconMain} 
            className="text-black fill-current ml-1" 
          />
        )}
      </Pressable>

      {/* Next Button */}
      <Pressable
        onPress={onNext}
        disabled={!canPlayNext || !onNext}
        className={cn(
          'items-center justify-center rounded-full',
          'web:hover:bg-white/10 active:bg-white/10 transition-colors',
          (!canPlayNext || !onNext) && 'opacity-40'
        )}
        style={{ width: sizes.secondary, height: sizes.secondary }}
      >
        <SkipForward 
          size={sizes.icon} 
          className="text-white fill-current" 
        />
      </Pressable>

      {/* Repeat Button - Only in full variant */}
      {variant === 'full' && (
        <Pressable
          onPress={onToggleRepeat}
          disabled={!onToggleRepeat}
          className={cn(
            'items-center justify-center rounded-full',
            'web:hover:bg-white/10 active:bg-white/10 transition-colors',
            repeatMode !== RepeatMode.OFF && 'bg-spotify-green/20'
          )}
          style={{ width: sizes.secondary, height: sizes.secondary }}
        >
          <View className={cn(
            'transition-colors',
            repeatMode !== RepeatMode.OFF ? 'text-spotify-green' : 'text-white/70'
          )}>
            {getRepeatIcon()}
          </View>
        </Pressable>
      )}
    </View>
  );
};