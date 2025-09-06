import { useEffect, useCallback, useRef } from 'react';
import { useMusicPlayerStore } from '../stores/music-player';
import { getAudioService } from '../services/audio-service';
import { Track, PlaybackControls, MusicPlayerContextValue } from '../types/music';
import { AUDIO_SETTINGS } from '../constants/player';
import { throttle } from '../utils/time';

export const useMusicPlayer = (): MusicPlayerContextValue => {
  const audioService = useRef(getAudioService());
  const isInitializedRef = useRef(false);
  
  // Get store state and actions
  const state = useMusicPlayerStore();
  const {
    setIsPlaying,
    setIsLoading,
    setCurrentTime,
    setDuration,
    setError,
    playNext,
    playPrevious,
    playTrack,
    setVolume,
    setIsMuted,
    toggleShuffle,
    toggleRepeat,
    addToQueue,
    removeFromQueue,
    clearQueue,
    loadPersistedState,
  } = useMusicPlayerStore();

  // Throttled time update to prevent excessive re-renders
  const throttledTimeUpdate = useCallback(
    throttle((time: number) => {
      setCurrentTime(time);
    }, AUDIO_SETTINGS.UPDATE_INTERVAL),
    [setCurrentTime]
  );

  // Initialize audio service
  useEffect(() => {
    if (!isInitializedRef.current) {
      // Load persisted state
      loadPersistedState();
      
      // Setup audio service callbacks
      audioService.current.onTimeUpdate(throttledTimeUpdate);
      
      audioService.current.onTrackEnd(() => {
        setCurrentTime(0);
        playNext();
      });
      
      audioService.current.onError((error) => {
        setError(error);
        setIsPlaying(false);
        setIsLoading(false);
      });
      
      isInitializedRef.current = true;
    }

    return () => {
      if (isInitializedRef.current) {
        audioService.current.cleanup();
        isInitializedRef.current = false;
      }
    };
  }, [loadPersistedState, throttledTimeUpdate, playNext, setCurrentTime, setError, setIsPlaying, setIsLoading]);

  // Load track when currentTrack changes
  useEffect(() => {
    const loadCurrentTrack = async () => {
      if (state.currentTrack && state.currentTrack.url) {
        setIsLoading(true);
        setError(null);
        
        try {
          await audioService.current.loadTrack(state.currentTrack);
          const duration = audioService.current.getDuration();
          if (duration > 0) {
            setDuration(duration);
          } else {
            // Fallback to track duration from metadata
            setDuration(state.currentTrack.duration || 0);
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to load track');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadCurrentTrack();
  }, [state.currentTrack, setIsLoading, setDuration, setError]);

  // Sync volume changes
  useEffect(() => {
    if (state.isMuted) {
      audioService.current.setVolume(0);
    } else {
      audioService.current.setVolume(state.volume);
    }
  }, [state.volume, state.isMuted]);

  // Playback controls implementation
  const play = useCallback(async () => {
    if (!state.currentTrack) return;
    
    setError(null);
    
    try {
      await audioService.current.play();
      setIsPlaying(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to play track');
      setIsPlaying(false);
    }
  }, [state.currentTrack, setError, setIsPlaying]);

  const pause = useCallback(() => {
    audioService.current.pause();
    setIsPlaying(false);
  }, [setIsPlaying]);

  const next = useCallback(() => {
    playNext();
  }, [playNext]);

  const previous = useCallback(() => {
    playPrevious();
  }, [playPrevious]);

  const seek = useCallback((position: number) => {
    audioService.current.seek(position);
    setCurrentTime(position);
  }, [setCurrentTime]);

  const setVolumeControl = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setVolume(clampedVolume);
    
    if (state.isMuted && clampedVolume > 0) {
      setIsMuted(false);
    }
  }, [setVolume, setIsMuted, state.isMuted]);

  const controls: PlaybackControls = {
    play,
    pause,
    next,
    previous,
    seek,
    setVolume: setVolumeControl,
    toggleShuffle,
    toggleRepeat,
    addToQueue,
    removeFromQueue,
    clearQueue,
  };

  return {
    state,
    isInitialized: isInitializedRef.current,
    ...controls,
    playTrack,
  };
};

// Hook for simplified playback controls
export const usePlaybackControls = () => {
  const { play, pause, next, previous, seek, state } = useMusicPlayer();
  
  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const skipForward = useCallback((seconds: number = AUDIO_SETTINGS.SEEK_STEP) => {
    const newTime = Math.min(state.duration, state.currentTime + seconds);
    seek(newTime);
  }, [state.currentTime, state.duration, seek]);

  const skipBackward = useCallback((seconds: number = AUDIO_SETTINGS.SEEK_STEP) => {
    const newTime = Math.max(0, state.currentTime - seconds);
    seek(newTime);
  }, [state.currentTime, seek]);

  return {
    togglePlayPause,
    skipForward,
    skipBackward,
    next,
    previous,
    seek,
    isPlaying: state.isPlaying,
    currentTime: state.currentTime,
    duration: state.duration,
  };
};

// Hook for queue management
export const useQueue = () => {
  const { state, addToQueue, removeFromQueue, clearQueue } = useMusicPlayer();
  
  const addTracksToQueue = useCallback((tracks: Track[], position?: number) => {
    tracks.forEach((track, index) => {
      const insertPosition = position !== undefined ? position + index : undefined;
      addToQueue(track, insertPosition);
    });
  }, [addToQueue]);

  const moveTrackInQueue = useCallback((fromIndex: number, toIndex: number) => {
    const { queue } = useMusicPlayerStore.getState();
    if (fromIndex < 0 || fromIndex >= queue.length || toIndex < 0 || toIndex >= queue.length) {
      return;
    }

    const track = queue[fromIndex];
    removeFromQueue(fromIndex);
    addToQueue(track, toIndex);
  }, [addToQueue, removeFromQueue]);

  return {
    queue: state.queue,
    currentIndex: state.currentIndex,
    addToQueue,
    addTracksToQueue,
    removeFromQueue,
    moveTrackInQueue,
    clearQueue,
  };
};

// Hook for current track information
export const useCurrentTrack = () => {
  const { state } = useMusicPlayer();
  
  return {
    currentTrack: state.currentTrack,
    isPlaying: state.isPlaying,
    isLoading: state.isLoading,
    currentTime: state.currentTime,
    duration: state.duration,
    progress: state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0,
  };
};

// Hook for volume control
export const useVolumeControl = () => {
  const { state, setVolume } = useMusicPlayer();
  const { setIsMuted } = useMusicPlayerStore();
  
  const toggleMute = useCallback(() => {
    setIsMuted(!state.isMuted);
  }, [state.isMuted, setIsMuted]);

  const adjustVolume = useCallback((delta: number) => {
    const newVolume = Math.max(0, Math.min(1, state.volume + delta));
    setVolume(newVolume);
  }, [state.volume, setVolume]);

  return {
    volume: state.volume,
    isMuted: state.isMuted,
    setVolume,
    toggleMute,
    adjustVolume,
  };
};