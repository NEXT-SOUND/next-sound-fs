import React, { useState } from 'react';
import { View, Pressable, Platform } from 'react-native';
import { cn } from '@/ui/utils/cn';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { ProgressBar } from './progress-bar';
import { PLAYER_DIMENSIONS, PLAYER_SPACING } from '../constants/player';

interface VolumeControlProps {
  volume: number; // 0-1
  isMuted: boolean;
  onVolumeChange?: (volume: number) => void;
  onToggleMute?: () => void;
  className?: string;
  showSlider?: boolean;
  size?: 'small' | 'medium';
  orientation?: 'horizontal' | 'vertical';
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  className,
  showSlider = true,
  size = 'medium',
  orientation = 'horizontal',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const iconSize = size === 'small' ? 16 : 20;
  const buttonSize = size === 'small' 
    ? PLAYER_DIMENSIONS.CONTROL_SIZE_SMALL 
    : PLAYER_DIMENSIONS.CONTROL_SIZE_SMALL + 8;

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX size={iconSize} className="text-white/70" />;
    } else if (volume < 0.5) {
      return <Volume1 size={iconSize} className="text-white/70" />;
    } else {
      return <Volume2 size={iconSize} className="text-white/70" />;
    }
  };

  const handleVolumeSeek = (newVolume: number) => {
    // Convert from percentage (0-100) to volume (0-1)
    const volumeValue = Math.max(0, Math.min(1, newVolume / 100));
    onVolumeChange?.(volumeValue);
  };

  const volumePercentage = isMuted ? 0 : volume * 100;

  if (orientation === 'vertical') {
    return (
      <View 
        className={cn(
          'flex items-center',
          className
        )}
        {...(Platform.OS === 'web' ? {
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false)
        } : {})}
      >
        {showSlider && (
          <View 
            className={cn(
              'mb-2 transition-opacity duration-200',
              isHovered ? 'opacity-100' : 'opacity-0 web:group-hover:opacity-100'
            )}
            style={{ height: 100 }}
          >
            <View className="transform rotate-270 origin-center" style={{ width: 100 }}>
              <ProgressBar
                progress={volumePercentage}
                duration={1}
                currentTime={volume}
                onSeek={handleVolumeSeek}
                showThumb={true}
                className="w-full"
                trackClassName="bg-white/20"
                fillClassName="bg-white"
                thumbClassName="bg-white"
              />
            </View>
          </View>
        )}
        
        <Pressable
          onPress={onToggleMute}
          disabled={!onToggleMute}
          className={cn(
            'items-center justify-center rounded-full',
            'web:hover:bg-white/10 active:bg-white/10 transition-colors'
          )}
          style={{ width: buttonSize, height: buttonSize }}
        >
          {getVolumeIcon()}
        </Pressable>
      </View>
    );
  }

  return (
    <View 
      className={cn(
        'flex-row items-center space-x-3',
        className
      )}
      {...(Platform.OS === 'web' ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false)
      } : {})}
    >
      <Pressable
        onPress={onToggleMute}
        disabled={!onToggleMute}
        className={cn(
          'items-center justify-center rounded-full',
          'web:hover:bg-white/10 active:bg-white/10 transition-colors'
        )}
        style={{ width: buttonSize, height: buttonSize }}
      >
        {getVolumeIcon()}
      </Pressable>

      {showSlider && (
        <View 
          className={cn(
            'flex-1 max-w-24 transition-opacity duration-200',
            isHovered ? 'opacity-100' : 'opacity-70 web:group-hover:opacity-100'
          )}
        >
          <ProgressBar
            progress={volumePercentage}
            duration={1}
            currentTime={volume}
            onSeek={handleVolumeSeek}
            showThumb={false}
            className="w-full"
            trackClassName="bg-white/20"
            fillClassName="bg-white"
          />
        </View>
      )}
    </View>
  );
};