import React from 'react';
import { View, Image } from 'react-native';
import { cn } from '@/ui/utils/cn';
import { PLAYER_DIMENSIONS } from '../constants/player';
import { Music } from 'lucide-react';

interface TrackArtworkProps {
  src?: string;
  alt?: string;
  size?: 'mini' | 'small' | 'medium' | 'large';
  className?: string;
  showPlaceholder?: boolean;
  rounded?: boolean;
}

const sizeMap = {
  mini: PLAYER_DIMENSIONS.ARTWORK_SIZE_MINI,
  small: PLAYER_DIMENSIONS.ARTWORK_SIZE_SMALL,
  medium: PLAYER_DIMENSIONS.ARTWORK_SIZE_MEDIUM,
  large: PLAYER_DIMENSIONS.ARTWORK_SIZE_LARGE,
} as const;

export const TrackArtwork: React.FC<TrackArtworkProps> = ({
  src,
  alt = 'Track artwork',
  size = 'medium',
  className,
  showPlaceholder = true,
  rounded = true,
}) => {
  const dimensions = sizeMap[size];
  const iconSize = Math.max(dimensions * 0.4, 24);

  return (
    <View
      className={cn(
        'relative overflow-hidden bg-spotify-gray flex items-center justify-center',
        rounded && 'rounded-lg',
        className
      )}
      style={{ width: dimensions, height: dimensions }}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ width: dimensions, height: dimensions }}
        />
      ) : showPlaceholder ? (
        <Music 
          className="text-spotify-light-gray opacity-60" 
          size={iconSize}
        />
      ) : null}
      
      {/* Subtle overlay for better text readability when used as background */}
      <View className="absolute inset-0 bg-black/10" />
    </View>
  );
};