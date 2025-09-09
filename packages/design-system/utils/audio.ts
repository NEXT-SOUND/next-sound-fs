import { Track } from '../types/music';

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get next track index based on current index and repeat mode
 */
export const getNextTrackIndex = (
  currentIndex: number,
  queueLength: number,
  isShuffled: boolean,
  repeatMode: 'off' | 'one' | 'all',
  shuffledIndices?: number[]
): number => {
  if (queueLength === 0) return -1;
  
  if (repeatMode === 'one') {
    return currentIndex;
  }
  
  if (isShuffled && shuffledIndices) {
    const currentShuffledPosition = shuffledIndices.indexOf(currentIndex);
    const nextShuffledPosition = (currentShuffledPosition + 1) % shuffledIndices.length;
    
    if (nextShuffledPosition === 0 && repeatMode === 'off') {
      return -1; // End of shuffled queue
    }
    
    return shuffledIndices[nextShuffledPosition];
  }
  
  const nextIndex = currentIndex + 1;
  
  if (nextIndex >= queueLength) {
    return repeatMode === 'all' ? 0 : -1;
  }
  
  return nextIndex;
};

/**
 * Get previous track index
 */
export const getPreviousTrackIndex = (
  currentIndex: number,
  queueLength: number,
  isShuffled: boolean,
  shuffledIndices?: number[]
): number => {
  if (queueLength === 0) return -1;
  
  if (isShuffled && shuffledIndices) {
    const currentShuffledPosition = shuffledIndices.indexOf(currentIndex);
    const previousShuffledPosition = currentShuffledPosition === 0 
      ? shuffledIndices.length - 1 
      : currentShuffledPosition - 1;
    
    return shuffledIndices[previousShuffledPosition];
  }
  
  return currentIndex === 0 ? queueLength - 1 : currentIndex - 1;
};

/**
 * Validate audio URL
 */
export const isValidAudioUrl = (url: string): boolean => {
  const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'];
  const lowercaseUrl = url.toLowerCase();
  
  return audioExtensions.some(ext => lowercaseUrl.includes(ext)) || 
         url.startsWith('http') || 
         url.startsWith('https');
};

/**
 * Extract file extension from URL
 */
export const getFileExtension = (url: string): string => {
  const match = url.match(/\.([^./?#]+)(?:[?#]|$)/);
  return match ? match[1].toLowerCase() : '';
};

/**
 * Generate a unique ID for tracks
 */
export const generateTrackId = (track: Partial<Track>): string => {
  const { title, artist, album } = track;
  const baseString = `${title}-${artist}-${album || ''}`;
  return btoa(baseString).replace(/[+/=]/g, '').substring(0, 16);
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (currentTime: number, duration: number): number => {
  if (duration === 0 || isNaN(currentTime) || isNaN(duration)) {
    return 0;
  }
  return Math.min(100, Math.max(0, (currentTime / duration) * 100));
};

/**
 * Clamp value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};

/**
 * Linear interpolation
 */
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

/**
 * Convert volume (0-1) to decibels
 */
export const volumeToDecibels = (volume: number): number => {
  if (volume === 0) return -Infinity;
  return 20 * Math.log10(volume);
};

/**
 * Convert decibels to volume (0-1)
 */
export const decibelsToVolume = (decibels: number): number => {
  if (decibels === -Infinity) return 0;
  return Math.pow(10, decibels / 20);
};