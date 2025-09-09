import { AudioService, Track } from '../types/music';
import { AUDIO_SETTINGS } from '../constants/player';

// This service uses react-native-track-player for background audio support
export class NativeAudioService implements AudioService {
  private timeUpdateCallback?: (time: number) => void;
  private trackEndCallback?: () => void;
  private errorCallback?: (error: string) => void;
  private timeUpdateInterval?: NodeJS.Timeout;
  private isInitialized = false;
  private TrackPlayer: any;

  constructor() {
    this.initializeTrackPlayer();
  }

  private async initializeTrackPlayer(): Promise<void> {
    try {
      // Dynamic import to avoid issues when not available
      this.TrackPlayer = require('react-native-track-player').default;
      
      // Setup the player
      await this.TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 1024 * 50, // 50MB cache
      });

      // Register playback service
      this.TrackPlayer.registerPlaybackService(() => require('./playback-service'));

      // Setup event listeners
      this.setupEventListeners();
      
      this.isInitialized = true;
    } catch (error) {
      console.warn('TrackPlayer not available, falling back to basic audio');
      this.initializeFallbackAudio();
    }
  }

  private initializeFallbackAudio(): void {
    // Fallback to basic React Native audio if TrackPlayer is not available
    try {
      const { Audio } = require('expo-av');
      this.initializeExpoAudio(Audio);
    } catch (error) {
      console.error('No audio service available');
      this.isInitialized = false;
    }
  }

  private async initializeExpoAudio(Audio: any): Promise<void> {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Expo Audio:', error);
    }
  }

  private setupEventListeners(): void {
    if (!this.TrackPlayer) return;

    // Import events
    const Event = require('react-native-track-player').Event;

    // Track ended
    this.TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (data: any) => {
      if (data.nextTrack === null && this.trackEndCallback) {
        this.trackEndCallback();
      }
    });

    // Playback errors
    this.TrackPlayer.addEventListener(Event.PlaybackError, (data: any) => {
      if (this.errorCallback) {
        this.errorCallback(data.message || 'Playback error occurred');
      }
    });

    // Remote control events
    this.TrackPlayer.addEventListener(Event.RemotePlay, () => this.play());
    this.TrackPlayer.addEventListener(Event.RemotePause, () => this.pause());
    this.TrackPlayer.addEventListener(Event.RemoteStop, () => this.stop());
    this.TrackPlayer.addEventListener(Event.RemoteSeek, (data: any) => {
      this.seek(data.position);
    });

    // Start time update interval
    this.startTimeUpdateInterval();
  }

  private startTimeUpdateInterval(): void {
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }

    this.timeUpdateInterval = setInterval(async () => {
      if (this.timeUpdateCallback && this.TrackPlayer) {
        try {
          const position = await this.TrackPlayer.getPosition();
          this.timeUpdateCallback(position);
        } catch (error) {
          // Ignore errors during position updates
        }
      }
    }, AUDIO_SETTINGS.UPDATE_INTERVAL);
  }

  async loadTrack(track: Track): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Audio service not initialized');
    }

    if (this.TrackPlayer) {
      try {
        // Reset the player
        await this.TrackPlayer.reset();
        
        // Add the track
        await this.TrackPlayer.add({
          id: track.id,
          url: track.url,
          title: track.title,
          artist: track.artist,
          album: track.album || 'Unknown Album',
          artwork: track.artwork,
          duration: track.duration,
        });

        // Set up for background playback
        await this.TrackPlayer.updateOptions({
          stopWithApp: false,
          capabilities: [
            this.TrackPlayer.CAPABILITY_PLAY,
            this.TrackPlayer.CAPABILITY_PAUSE,
            this.TrackPlayer.CAPABILITY_STOP,
            this.TrackPlayer.CAPABILITY_SEEK_TO,
            this.TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            this.TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          ],
          compactCapabilities: [
            this.TrackPlayer.CAPABILITY_PLAY,
            this.TrackPlayer.CAPABILITY_PAUSE,
            this.TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            this.TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          ],
          notificationCapabilities: [
            this.TrackPlayer.CAPABILITY_PLAY,
            this.TrackPlayer.CAPABILITY_PAUSE,
            this.TrackPlayer.CAPABILITY_STOP,
          ],
        });
      } catch (error) {
        throw new Error(`Failed to load track: ${error}`);
      }
    } else {
      // Fallback implementation
      throw new Error('TrackPlayer not available');
    }
  }

  async play(): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Audio service not initialized');
    }

    if (this.TrackPlayer) {
      try {
        await this.TrackPlayer.play();
      } catch (error) {
        throw new Error(`Failed to play: ${error}`);
      }
    }
  }

  pause(): void {
    if (this.TrackPlayer) {
      this.TrackPlayer.pause().catch(() => {
        // Ignore pause errors
      });
    }
  }

  stop(): void {
    if (this.TrackPlayer) {
      this.TrackPlayer.stop().catch(() => {
        // Ignore stop errors
      });
    }
  }

  seek(position: number): void {
    if (this.TrackPlayer && isFinite(position)) {
      this.TrackPlayer.seekTo(Math.max(0, position)).catch(() => {
        // Ignore seek errors
      });
    }
  }

  setVolume(volume: number): void {
    if (this.TrackPlayer) {
      this.TrackPlayer.setVolume(Math.max(0, Math.min(1, volume))).catch(() => {
        // Ignore volume errors
      });
    }
  }

  getCurrentTime(): number {
    // This will be updated via the interval
    return 0;
  }

  getDuration(): number {
    // This should be set from the track data
    return 0;
  }

  isPlaying(): boolean {
    // This should be managed by the store
    return false;
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
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
      this.timeUpdateInterval = undefined;
    }

    if (this.TrackPlayer) {
      this.TrackPlayer.reset().catch(() => {
        // Ignore cleanup errors
      });
    }

    this.timeUpdateCallback = undefined;
    this.trackEndCallback = undefined;
    this.errorCallback = undefined;
  }
}