import React, { useCallback, useRef, useState } from 'react';
import { View, Pressable, Platform } from 'react-native';
import { cn } from '@/ui/utils/cn';
import { PLAYER_DIMENSIONS, PLAYER_SPACING } from '../constants/player';
import { clamp } from '../utils/audio';

interface ProgressBarProps {
  progress: number; // 0-100
  duration: number; // in seconds
  currentTime: number; // in seconds
  onSeek?: (time: number) => void;
  className?: string;
  showThumb?: boolean;
  thumbClassName?: string;
  trackClassName?: string;
  fillClassName?: string;
  disabled?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  duration,
  currentTime,
  onSeek,
  className,
  showThumb = true,
  thumbClassName,
  trackClassName,
  fillClassName,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const containerRef = useRef<View>(null);

  const currentProgress = isDragging ? dragProgress : progress;

  const handlePress = useCallback((event: any) => {
    if (disabled || !onSeek) return;

    const { locationX, target } = event.nativeEvent;
    const width = target?.width || 0;
    
    if (width > 0) {
      const newProgress = clamp((locationX / width) * 100, 0, 100);
      const newTime = (newProgress / 100) * duration;
      onSeek(newTime);
    }
  }, [disabled, onSeek, duration]);

  // Simplified gesture handling for React Native
  const handlePressIn = useCallback(() => {
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handlePressOut = useCallback(() => {
    if (!disabled) {
      setIsDragging(false);
    }
  }, [disabled]);

  return (
    <View className={cn('relative', className)}>
      <Pressable
        ref={containerRef}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        className="w-full flex justify-center"
        style={{ height: PLAYER_DIMENSIONS.PROGRESS_HEIGHT + PLAYER_SPACING.LG }}
      >
        {/* Track */}
        <View
          className={cn(
            'w-full bg-white/20 rounded-full',
            trackClassName
          )}
          style={{ height: PLAYER_DIMENSIONS.PROGRESS_HEIGHT }}
        >
          {/* Fill */}
          <View
            className={cn(
              'h-full bg-spotify-green rounded-full transition-all duration-150',
              fillClassName
            )}
            style={{ 
              width: `${currentProgress}%`,
              minWidth: currentProgress > 0 ? PLAYER_DIMENSIONS.PROGRESS_HEIGHT : 0
            }}
          />
        </View>

        {/* Thumb */}
        {showThumb && (
          <View
            className={cn(
              'absolute bg-white rounded-full shadow-lg transform -translate-x-1/2',
              'transition-all duration-150',
              isDragging ? 'scale-125' : 'scale-100',
              disabled && 'opacity-50',
              thumbClassName
            )}
            style={{
              width: PLAYER_DIMENSIONS.PROGRESS_THUMB_SIZE,
              height: PLAYER_DIMENSIONS.PROGRESS_THUMB_SIZE,
              left: `${currentProgress}%`,
              top: '50%',
              transform: [
                { translateX: -PLAYER_DIMENSIONS.PROGRESS_THUMB_SIZE / 2 },
                { translateY: -PLAYER_DIMENSIONS.PROGRESS_THUMB_SIZE / 2 },
              ],
            }}
          />
        )}
      </Pressable>
    </View>
  );
};