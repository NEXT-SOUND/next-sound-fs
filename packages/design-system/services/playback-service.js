// This file is required for react-native-track-player background service
// It must be a .js file (not .ts) for react-native-track-player to work properly

import TrackPlayer, { Event } from 'react-native-track-player';

module.exports = async function() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
  TrackPlayer.addEventListener(Event.RemoteSeek, ({ position }) => TrackPlayer.seekTo(position));
  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
  
  // Handle playback state changes
  TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
    console.log('Playback state changed:', state);
  });
  
  // Handle track changes
  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, ({ nextTrack }) => {
    console.log('Track changed to:', nextTrack);
  });
  
  // Handle errors
  TrackPlayer.addEventListener(Event.PlaybackError, ({ message }) => {
    console.error('Playback error:', message);
  });
};