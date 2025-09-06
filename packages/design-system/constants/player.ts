import { RepeatMode } from '../types/music';

// Player dimensions (all values in multiples of 4)
export const PLAYER_DIMENSIONS = {
  // Mini player (bottom bar)
  MINI_HEIGHT: 80, // 20 * 4
  MINI_PADDING: 16, // 4 * 4
  MINI_MARGIN: 8, // 2 * 4
  
  // Full player
  FULL_PADDING: 24, // 6 * 4
  FULL_MARGIN: 16, // 4 * 4
  
  // Controls
  CONTROL_SIZE: 48, // 12 * 4
  CONTROL_SIZE_SMALL: 32, // 8 * 4
  CONTROL_SIZE_LARGE: 64, // 16 * 4
  
  // Progress bar
  PROGRESS_HEIGHT: 4, // 1 * 4
  PROGRESS_THUMB_SIZE: 16, // 4 * 4
  
  // Artwork
  ARTWORK_SIZE_MINI: 64, // 16 * 4
  ARTWORK_SIZE_SMALL: 120, // 30 * 4
  ARTWORK_SIZE_MEDIUM: 200, // 50 * 4
  ARTWORK_SIZE_LARGE: 320, // 80 * 4
} as const;

// Player spacing (all values in multiples of 4)
export const PLAYER_SPACING = {
  XS: 4,   // 1 * 4
  SM: 8,   // 2 * 4
  MD: 12,  // 3 * 4
  LG: 16,  // 4 * 4
  XL: 20,  // 5 * 4
  XXL: 24, // 6 * 4
  XXXL: 32, // 8 * 4
} as const;

// Audio settings
export const AUDIO_SETTINGS = {
  DEFAULT_VOLUME: 0.7,
  VOLUME_STEP: 0.1,
  SEEK_STEP: 10, // seconds
  CROSSFADE_DURATION: 3, // seconds
  PRELOAD_NEXT_TRACK: true,
  UPDATE_INTERVAL: 100, // milliseconds
} as const;

// Player states
export const PLAYER_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  PLAYING: 'playing',
  PAUSED: 'paused',
  BUFFERING: 'buffering',
  ERROR: 'error',
} as const;

// Repeat modes
export const REPEAT_MODES = {
  OFF: RepeatMode.OFF,
  ONE: RepeatMode.ONE,
  ALL: RepeatMode.ALL,
} as const;

// Storage keys
export const STORAGE_KEYS = {
  PLAYER_STATE: 'music_player_state',
  VOLUME: 'music_player_volume',
  REPEAT_MODE: 'music_player_repeat_mode',
  SHUFFLE_MODE: 'music_player_shuffle_mode',
  QUEUE: 'music_player_queue',
  CURRENT_TRACK: 'music_player_current_track',
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;