import React, { useState, useEffect } from 'react';
import { View, Modal, Platform } from 'react-native';
import { cn } from '@/ui/utils/cn';
import { MiniPlayer } from './mini-player';
import { FullPlayer } from './full-player';
import { useMusicPlayer, useCurrentTrack } from '../hooks/use-music-player';
import { useSafeArea } from '@/utils/safe-area';

interface MusicPlayerProps {
  className?: string;
  onToggleLike?: (trackId: string) => void;
  onShare?: (trackId: string) => void;
  onAddToPlaylist?: (trackId: string) => void;
  isLiked?: boolean;
  // Layout props
  position?: 'fixed' | 'relative' | 'sticky';
  zIndex?: number;
  // Behavior props
  persistMinimized?: boolean;
  showVolumeControl?: boolean;
  showProgressBar?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  className,
  onToggleLike,
  onShare,
  onAddToPlaylist,
  isLiked = false,
  position = 'fixed',
  zIndex = 50,
  persistMinimized = true,
  showVolumeControl = true,
  showProgressBar = true,
}) => {
  const { bottom } = useSafeArea();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [isMinimized, setIsMinimized] = useState(persistMinimized);
  
  const { currentTrack } = useCurrentTrack();
  const { isInitialized } = useMusicPlayer();

  // Don't render if no track is loaded or player is not initialized
  if (!currentTrack || !isInitialized) {
    return null;
  }

  const handleExpand = () => {
    setIsExpanded(true);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsExpanded(false);
    setIsMinimized(persistMinimized);
  };

  const handleToggleQueue = () => {
    setShowQueue(!showQueue);
  };

  const handleShowQueue = () => {
    if (Platform.OS === 'web') {
      setShowQueue(true);
    } else {
      // On mobile, expand to full player and show queue
      setIsExpanded(true);
      setShowQueue(true);
    }
  };

  // Auto-minimize on track change (optional behavior)
  useEffect(() => {
    if (persistMinimized && isExpanded) {
      // Optional: auto-minimize when track changes
      // setIsExpanded(false);
    }
  }, [currentTrack?.id, persistMinimized, isExpanded]);

  // Render mini player
  const renderMiniPlayer = () => (
    <View
      className={cn(
        'w-full',
        position === 'fixed' && 'absolute bottom-0 left-0 right-0',
        position === 'sticky' && 'sticky bottom-0',
        className
      )}
      style={{
        zIndex,
        paddingBottom: position === 'fixed' ? bottom : 0,
      }}
    >
      <MiniPlayer
        onExpand={handleExpand}
        onToggleLike={onToggleLike}
        onShowQueue={handleShowQueue}
        isLiked={isLiked}
        showVolumeControl={showVolumeControl}
        showProgressBar={showProgressBar}
      />
    </View>
  );

  // Render full player
  const renderFullPlayer = () => (
    <FullPlayer
      onMinimize={handleMinimize}
      onToggleLike={onToggleLike}
      onShare={onShare}
      onAddToPlaylist={onAddToPlaylist}
      isLiked={isLiked}
      showQueue={showQueue}
      onToggleQueue={handleToggleQueue}
      className="flex-1"
    />
  );

  if (Platform.OS === 'web') {
    // Web implementation with overlay
    return (
      <>
        {/* Mini Player */}
        {!isExpanded && renderMiniPlayer()}
        
        {/* Full Player Overlay */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-spotify-black z-50"
            style={{ zIndex: zIndex + 10 }}
          >
            {renderFullPlayer()}
          </div>
        )}
        
        {/* Queue Sidebar (Web only) */}
        {showQueue && !isExpanded && (
          <div
            className="fixed right-0 top-0 bottom-20 w-80 bg-spotify-dark-gray border-l border-white/10 z-40"
            style={{ zIndex: zIndex + 5 }}
          >
            {/* Queue content would go here */}
            <div className="p-4">
              <span className="text-white font-semibold mb-4 block">Queue</span>
              {/* Queue items */}
            </div>
          </div>
        )}
      </>
    );
  } else {
    // React Native implementation with Modal
    return (
      <>
        {/* Mini Player */}
        {!isExpanded && renderMiniPlayer()}
        
        {/* Full Player Modal */}
        <Modal
          visible={isExpanded}
          animationType="slide"
          presentationStyle="fullScreen"
          statusBarTranslucent
        >
          {renderFullPlayer()}
        </Modal>
      </>
    );
  }
};

// Provider component to ensure player is available globally
export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View className="flex-1">
      {children}
      <MusicPlayer />
    </View>
  );
};