import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Track, PlayerState, RepeatMode } from '../types/music';
import { STORAGE_KEYS, AUDIO_SETTINGS } from '../constants/player';
import { storage } from '../utils/storage';
import { shuffleArray, getNextTrackIndex, getPreviousTrackIndex } from '../utils/audio';

interface MusicPlayerStore extends PlayerState {
  // State management
  setCurrentTrack: (track: Track | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (isMuted: boolean) => void;
  setIsShuffled: (isShuffled: boolean) => void;
  setRepeatMode: (mode: RepeatMode) => void;
  setError: (error: string | null) => void;
  
  // Queue management
  setQueue: (tracks: Track[]) => void;
  addToQueue: (track: Track, position?: number) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  setCurrentIndex: (index: number) => void;
  
  // Playback controls
  playTrack: (track: Track, queue?: Track[]) => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  
  // Utility functions
  getCurrentTrack: () => Track | null;
  getNextTrack: () => Track | null;
  getPreviousTrack: () => Track | null;
  
  // Persistence
  loadPersistedState: () => Promise<void>;
  persistState: () => Promise<void>;
  
  // Internal state
  shuffledIndices: number[];
  setShuffledIndices: (indices: number[]) => void;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  isLoading: false,
  currentTime: 0,
  duration: 0,
  volume: AUDIO_SETTINGS.DEFAULT_VOLUME,
  isMuted: false,
  isShuffled: false,
  repeatMode: RepeatMode.OFF,
  queue: [],
  currentIndex: -1,
  error: null,
};

export const useMusicPlayerStore = create<MusicPlayerStore>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    shuffledIndices: [],

    // State setters
    setCurrentTrack: (track) => set({ currentTrack: track }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setCurrentTime: (time) => set({ currentTime: time }),
    setDuration: (duration) => set({ duration }),
    setVolume: (volume) => {
      set({ volume: Math.max(0, Math.min(1, volume)) });
      get().persistState();
    },
    setIsMuted: (isMuted) => set({ isMuted }),
    setIsShuffled: (isShuffled) => {
      const state = get();
      const newShuffledIndices = isShuffled 
        ? shuffleArray(Array.from({ length: state.queue.length }, (_, i) => i))
        : [];
      
      set({ 
        isShuffled, 
        shuffledIndices: newShuffledIndices 
      });
      get().persistState();
    },
    setRepeatMode: (mode) => {
      set({ repeatMode: mode });
      get().persistState();
    },
    setError: (error) => set({ error }),
    setShuffledIndices: (indices) => set({ shuffledIndices: indices }),

    // Queue management
    setQueue: (tracks) => {
      const state = get();
      const newShuffledIndices = state.isShuffled 
        ? shuffleArray(Array.from({ length: tracks.length }, (_, i) => i))
        : [];
      
      set({ 
        queue: tracks, 
        shuffledIndices: newShuffledIndices,
        currentIndex: tracks.length > 0 ? 0 : -1 
      });
      get().persistState();
    },

    addToQueue: (track, position) => {
      const state = get();
      const newQueue = [...state.queue];
      const insertPosition = position !== undefined ? position : newQueue.length;
      
      newQueue.splice(insertPosition, 0, track);
      
      const newShuffledIndices = state.isShuffled 
        ? shuffleArray(Array.from({ length: newQueue.length }, (_, i) => i))
        : state.shuffledIndices;
      
      // Adjust current index if needed
      let newCurrentIndex = state.currentIndex;
      if (position !== undefined && position <= state.currentIndex) {
        newCurrentIndex += 1;
      }
      
      set({ 
        queue: newQueue, 
        shuffledIndices: newShuffledIndices,
        currentIndex: newCurrentIndex
      });
      get().persistState();
    },

    removeFromQueue: (index) => {
      const state = get();
      const newQueue = state.queue.filter((_, i) => i !== index);
      
      let newCurrentIndex = state.currentIndex;
      if (index < state.currentIndex) {
        newCurrentIndex -= 1;
      } else if (index === state.currentIndex) {
        // If we're removing the current track, stop playback
        newCurrentIndex = Math.min(newCurrentIndex, newQueue.length - 1);
      }
      
      const newShuffledIndices = state.isShuffled 
        ? shuffleArray(Array.from({ length: newQueue.length }, (_, i) => i))
        : [];
      
      set({ 
        queue: newQueue, 
        shuffledIndices: newShuffledIndices,
        currentIndex: newQueue.length > 0 ? Math.max(0, newCurrentIndex) : -1,
        currentTrack: newQueue.length > 0 && newCurrentIndex >= 0 
          ? newQueue[newCurrentIndex] 
          : null
      });
      get().persistState();
    },

    clearQueue: () => {
      set({ 
        queue: [], 
        shuffledIndices: [],
        currentIndex: -1,
        currentTrack: null,
        isPlaying: false
      });
      get().persistState();
    },

    setCurrentIndex: (index) => {
      const state = get();
      if (index >= 0 && index < state.queue.length) {
        set({ 
          currentIndex: index,
          currentTrack: state.queue[index]
        });
      }
    },

    // Playback controls
    playTrack: (track, queue) => {
      const state = get();
      
      if (queue) {
        const trackIndex = queue.findIndex(t => t.id === track.id);
        const newShuffledIndices = state.isShuffled 
          ? shuffleArray(Array.from({ length: queue.length }, (_, i) => i))
          : [];
        
        set({ 
          queue,
          shuffledIndices: newShuffledIndices,
          currentTrack: track,
          currentIndex: trackIndex >= 0 ? trackIndex : 0,
          error: null
        });
      } else {
        set({ 
          currentTrack: track,
          error: null
        });
      }
      
      get().persistState();
    },

    playNext: () => {
      const state = get();
      const nextIndex = getNextTrackIndex(
        state.currentIndex,
        state.queue.length,
        state.isShuffled,
        state.repeatMode,
        state.shuffledIndices
      );
      
      if (nextIndex >= 0 && nextIndex < state.queue.length) {
        set({
          currentIndex: nextIndex,
          currentTrack: state.queue[nextIndex],
          error: null
        });
      } else {
        // End of queue
        set({ 
          isPlaying: false,
          currentTime: 0
        });
      }
    },

    playPrevious: () => {
      const state = get();
      const previousIndex = getPreviousTrackIndex(
        state.currentIndex,
        state.queue.length,
        state.isShuffled,
        state.shuffledIndices
      );
      
      if (previousIndex >= 0 && previousIndex < state.queue.length) {
        set({
          currentIndex: previousIndex,
          currentTrack: state.queue[previousIndex],
          error: null
        });
      }
    },

    toggleShuffle: () => {
      const state = get();
      get().setIsShuffled(!state.isShuffled);
    },

    toggleRepeat: () => {
      const state = get();
      const modes = [RepeatMode.OFF, RepeatMode.ALL, RepeatMode.ONE];
      const currentIndex = modes.indexOf(state.repeatMode);
      const nextMode = modes[(currentIndex + 1) % modes.length];
      get().setRepeatMode(nextMode);
    },

    // Utility functions
    getCurrentTrack: () => get().currentTrack,

    getNextTrack: () => {
      const state = get();
      const nextIndex = getNextTrackIndex(
        state.currentIndex,
        state.queue.length,
        state.isShuffled,
        state.repeatMode,
        state.shuffledIndices
      );
      
      return nextIndex >= 0 ? state.queue[nextIndex] : null;
    },

    getPreviousTrack: () => {
      const state = get();
      const previousIndex = getPreviousTrackIndex(
        state.currentIndex,
        state.queue.length,
        state.isShuffled,
        state.shuffledIndices
      );
      
      return previousIndex >= 0 ? state.queue[previousIndex] : null;
    },

    // Persistence
    loadPersistedState: async () => {
      try {
        const [volume, repeatMode, isShuffled, queue, currentTrack] = await Promise.all([
          storage.get<number>(STORAGE_KEYS.VOLUME, AUDIO_SETTINGS.DEFAULT_VOLUME),
          storage.get<RepeatMode>(STORAGE_KEYS.REPEAT_MODE, RepeatMode.OFF),
          storage.get<boolean>(STORAGE_KEYS.SHUFFLE_MODE, false),
          storage.get<Track[]>(STORAGE_KEYS.QUEUE, []),
          storage.get<Track>(STORAGE_KEYS.CURRENT_TRACK, null),
        ]);

        const currentIndex = queue && currentTrack 
          ? queue.findIndex(t => t.id === currentTrack.id)
          : -1;

        const shuffledIndices = isShuffled && queue
          ? shuffleArray(Array.from({ length: queue.length }, (_, i) => i))
          : [];

        set({
          volume: volume || AUDIO_SETTINGS.DEFAULT_VOLUME,
          repeatMode: repeatMode || RepeatMode.OFF,
          isShuffled: isShuffled || false,
          queue: queue || [],
          currentTrack: currentTrack || null,
          currentIndex: currentIndex >= 0 ? currentIndex : -1,
          shuffledIndices,
        });
      } catch (error) {
        console.warn('Failed to load persisted player state:', error);
      }
    },

    persistState: async () => {
      const state = get();
      
      try {
        await Promise.all([
          storage.set(STORAGE_KEYS.VOLUME, state.volume),
          storage.set(STORAGE_KEYS.REPEAT_MODE, state.repeatMode),
          storage.set(STORAGE_KEYS.SHUFFLE_MODE, state.isShuffled),
          storage.set(STORAGE_KEYS.QUEUE, state.queue),
          storage.set(STORAGE_KEYS.CURRENT_TRACK, state.currentTrack),
        ]);
      } catch (error) {
        console.warn('Failed to persist player state:', error);
      }
    },
  }))
);

// Subscribe to state changes for automatic persistence
useMusicPlayerStore.subscribe(
  (state) => ({
    volume: state.volume,
    repeatMode: state.repeatMode,
    isShuffled: state.isShuffled,
    queue: state.queue,
    currentTrack: state.currentTrack,
  }),
  () => {
    // Debounced persistence to avoid too frequent saves
    const persistState = useMusicPlayerStore.getState().persistState;
    setTimeout(persistState, 500);
  }
);