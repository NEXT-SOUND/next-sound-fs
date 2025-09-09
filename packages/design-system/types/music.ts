export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  artwork?: string;
  url: string;
  genre?: string;
  releaseDate?: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  artwork?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: RepeatMode;
  queue: Track[];
  currentIndex: number;
  error: string | null;
}

export enum RepeatMode {
  OFF = 'off',
  ONE = 'one',
  ALL = 'all',
}

export interface AudioService {
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  seek: (position: number) => void;
  setVolume: (volume: number) => void;
  loadTrack: (track: Track) => Promise<void>;
  getCurrentTime: () => number;
  getDuration: () => number;
  isPlaying: () => boolean;
  onTimeUpdate: (callback: (time: number) => void) => void;
  onTrackEnd: (callback: () => void) => void;
  onError: (callback: (error: string) => void) => void;
  cleanup: () => void;
}

export interface PlaybackControls {
  play: () => Promise<void>;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (position: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
}

export interface MusicPlayerContextValue extends PlaybackControls {
  state: PlayerState;
  isInitialized: boolean;
}