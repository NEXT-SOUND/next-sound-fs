import { AudioService } from '../types/music';

// Factory function to create the appropriate audio service based on platform
export const createAudioService = (): AudioService => {
  if (typeof window !== 'undefined') {
    // Web environment
    const { WebAudioService } = require('./audio-service.web');
    return new WebAudioService();
  } else {
    // React Native environment
    const { NativeAudioService } = require('./audio-service.native');
    return new NativeAudioService();
  }
};

// Singleton instance
let audioServiceInstance: AudioService | null = null;

export const getAudioService = (): AudioService => {
  if (!audioServiceInstance) {
    audioServiceInstance = createAudioService();
  }
  return audioServiceInstance;
};

export const resetAudioService = (): void => {
  if (audioServiceInstance) {
    audioServiceInstance.cleanup();
    audioServiceInstance = null;
  }
};