import { AudioService, Track } from '../types/music';
import { AUDIO_SETTINGS } from '../constants/player';
import { debounce } from '../utils/time';

export class WebAudioService implements AudioService {
  private audio: HTMLAudioElement;
  private timeUpdateCallback?: (time: number) => void;
  private trackEndCallback?: () => void;
  private errorCallback?: (error: string) => void;
  private isInitialized = false;

  constructor() {
    this.audio = new Audio();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Time update with debouncing for performance
    const debouncedTimeUpdate = debounce(() => {
      if (this.timeUpdateCallback) {
        this.timeUpdateCallback(this.audio.currentTime);
      }
    }, AUDIO_SETTINGS.UPDATE_INTERVAL);

    this.audio.addEventListener('timeupdate', debouncedTimeUpdate);
    
    this.audio.addEventListener('ended', () => {
      if (this.trackEndCallback) {
        this.trackEndCallback();
      }
    });

    this.audio.addEventListener('error', (event) => {
      const errorMessage = this.getErrorMessage(this.audio.error);
      if (this.errorCallback) {
        this.errorCallback(errorMessage);
      }
    });

    this.audio.addEventListener('loadstart', () => {
      // Track loading started
    });

    this.audio.addEventListener('canplay', () => {
      // Track can start playing
      this.isInitialized = true;
    });

    this.audio.addEventListener('waiting', () => {
      // Buffering
    });

    this.audio.addEventListener('playing', () => {
      // Playback resumed
    });

    this.audio.addEventListener('pause', () => {
      // Playback paused
    });

    // Handle media session API for better browser integration
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.play());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('stop', () => this.stop());
      navigator.mediaSession.setActionHandler('seekbackward', () => {
        this.seek(Math.max(0, this.audio.currentTime - AUDIO_SETTINGS.SEEK_STEP));
      });
      navigator.mediaSession.setActionHandler('seekforward', () => {
        this.seek(Math.min(this.audio.duration, this.audio.currentTime + AUDIO_SETTINGS.SEEK_STEP));
      });
    }
  }

  private getErrorMessage(error: MediaError | null): string {
    if (!error) return 'Unknown audio error';

    switch (error.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        return 'Audio playback was aborted';
      case MediaError.MEDIA_ERR_NETWORK:
        return 'Network error occurred while loading audio';
      case MediaError.MEDIA_ERR_DECODE:
        return 'Audio decoding failed';
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        return 'Audio format not supported';
      default:
        return 'Unknown audio error';
    }
  }

  async loadTrack(track: Track): Promise<void> {
    return new Promise((resolve, reject) => {
      this.isInitialized = false;
      this.audio.src = track.url;
      
      const onCanPlay = () => {
        this.audio.removeEventListener('canplay', onCanPlay);
        this.audio.removeEventListener('error', onError);
        this.isInitialized = true;
        
        // Update media session metadata
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist,
            album: track.album || 'Unknown Album',
            artwork: track.artwork ? [
              { src: track.artwork, sizes: '96x96', type: 'image/png' },
              { src: track.artwork, sizes: '128x128', type: 'image/png' },
              { src: track.artwork, sizes: '192x192', type: 'image/png' },
              { src: track.artwork, sizes: '256x256', type: 'image/png' },
              { src: track.artwork, sizes: '384x384', type: 'image/png' },
              { src: track.artwork, sizes: '512x512', type: 'image/png' },
            ] : undefined,
          });
        }
        
        resolve();
      };

      const onError = () => {
        this.audio.removeEventListener('canplay', onCanPlay);
        this.audio.removeEventListener('error', onError);
        reject(new Error(this.getErrorMessage(this.audio.error)));
      };

      this.audio.addEventListener('canplay', onCanPlay);
      this.audio.addEventListener('error', onError);
      
      this.audio.load();
    });
  }

  async play(): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Audio not loaded');
    }

    try {
      await this.audio.play();
      
      // Update media session playback state
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
    } catch (error) {
      throw new Error(`Failed to play audio: ${error}`);
    }
  }

  pause(): void {
    this.audio.pause();
    
    // Update media session playback state
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused';
    }
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    
    // Update media session playback state
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'none';
    }
  }

  seek(position: number): void {
    if (this.isInitialized && isFinite(position)) {
      this.audio.currentTime = Math.max(0, Math.min(this.audio.duration || 0, position));
      
      // Update media session position
      if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
        navigator.mediaSession.setPositionState({
          duration: this.audio.duration,
          playbackRate: this.audio.playbackRate,
          position: this.audio.currentTime,
        });
      }
    }
  }

  setVolume(volume: number): void {
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  getCurrentTime(): number {
    return this.audio.currentTime || 0;
  }

  getDuration(): number {
    return this.audio.duration || 0;
  }

  isPlaying(): boolean {
    return !this.audio.paused && !this.audio.ended && this.audio.readyState > 2;
  }

  onTimeUpdate(callback: (time: number) => void): void {
    this.timeUpdateCallback = callback;
  }

  onTrackEnd(callback: () => void): void {
    this.trackEndCallback = callback;
  }

  onError(callback: (error: string) => void): void {
    this.errorCallback = callback;
  }

  cleanup(): void {
    this.audio.pause();
    this.audio.src = '';
    this.audio.load();
    this.timeUpdateCallback = undefined;
    this.trackEndCallback = undefined;
    this.errorCallback = undefined;
    this.isInitialized = false;
    
    // Clear media session
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = 'none';
    }
  }
}