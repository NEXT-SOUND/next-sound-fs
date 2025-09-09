# Design System - Music Player

A comprehensive music player design system built for universal React Native and Web applications, featuring Spotify-like modern design and functionality.

## Features

### 🎵 Core Player Features
- **Universal Compatibility**: Works seamlessly on both Web and React Native
- **Background Audio**: Full background audio support for React Native apps
- **Modern UI**: Spotify-inspired design with dark theme and green accents
- **Responsive Design**: Optimized for all screen sizes with 4px grid system
- **TypeScript**: Full type safety throughout the system

### 🎛️ Player Controls
- Play/Pause with loading states
- Skip forward/backward
- Shuffle and repeat modes
- Volume control with mute
- Seek/scrub functionality
- Progress tracking

### 📱 Components
- **MiniPlayer**: Bottom bar player for continuous playback
- **FullPlayer**: Expanded player with full controls and artwork
- **PlaybackControls**: Reusable control buttons
- **ProgressBar**: Interactive progress/seek bar
- **VolumeControl**: Volume slider with mute toggle
- **TrackArtwork**: Responsive artwork display

### 🔄 State Management
- **Zustand Store**: Global player state management
- **Persistence**: Automatic state persistence across sessions
- **Queue Management**: Full queue control with shuffle support
- **Real-time Updates**: Live progress and state synchronization

### 🌐 Data Management
- **TanStack Query**: Efficient data fetching and caching
- **Custom Hooks**: Simplified player interaction hooks
- **Optimistic Updates**: Smooth UI interactions
- **Prefetching**: Smart data preloading

## Installation

```bash
# Install dependencies
yarn add design-system

# For React Native, also install audio dependencies
yarn add react-native-track-player expo-av @react-native-async-storage/async-storage
```

## Quick Start

### 1. Wrap your app with providers

```tsx
import { MusicPlayerProvider } from 'design-system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MusicPlayerProvider>
        {/* Your app content */}
      </MusicPlayerProvider>
    </QueryClientProvider>
  );
}
```

### 2. Use the music player

```tsx
import { useMusicPlayer, Track } from 'design-system';

function MyComponent() {
  const { playTrack, state } = useMusicPlayer();
  
  const handlePlayTrack = (track: Track) => {
    playTrack(track, [track]); // Play track with queue
  };
  
  return (
    <div>
      <h3>Now Playing: {state.currentTrack?.title}</h3>
      {/* MusicPlayer component is automatically rendered globally */}
    </div>
  );
}
```

### 3. Control playback

```tsx
import { usePlaybackControls } from 'design-system';

function PlaybackButton() {
  const { togglePlayPause, isPlaying } = usePlaybackControls();
  
  return (
    <button onClick={togglePlayPause}>
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  );
}
```

## Architecture

### State Management
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Zustand       │    │   Audio Service  │    │   TanStack      │
│   Store         │◄──►│   (Web/Native)   │    │   Query         │
│                 │    │                  │    │                 │
│ • Player State  │    │ • Audio Control  │    │ • Track Data    │
│ • Queue         │    │ • Progress       │    │ • Caching       │
│ • Settings      │    │ • Events         │    │ • Mutations     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Component Hierarchy
```
MusicPlayerProvider
├── MusicPlayer (Global)
│   ├── MiniPlayer (Bottom bar)
│   └── FullPlayer (Expanded view)
│       ├── PlaybackControls
│       ├── ProgressBar
│       ├── VolumeControl
│       └── TrackArtwork
└── Your App Components
```

## Configuration

### Permissions (React Native)

Add to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      ["expo-av", { "microphonePermission": false }],
      ["react-native-track-player", { "playInBackground": true }]
    ],
    "ios": {
      "infoPlist": {
        "UIBackgroundModes": ["audio"]
      }
    },
    "android": {
      "permissions": [
        "WAKE_LOCK",
        "FOREGROUND_SERVICE",
        "MODIFY_AUDIO_SETTINGS"
      ]
    }
  }
}
```

### Styling

The design system uses Tailwind CSS with custom Spotify-inspired colors:

```css
:root {
  --spotify-green: 141, 76%, 48%;
  --spotify-black: 0, 0%, 7%;
  --spotify-dark-gray: 0, 0%, 11%;
  --spotify-gray: 0, 0%, 18%;
  --spotify-light-gray: 0, 0%, 58%;
}
```

All spacing follows a 4px grid system:
- `PLAYER_SPACING.XS`: 4px
- `PLAYER_SPACING.SM`: 8px
- `PLAYER_SPACING.MD`: 12px
- `PLAYER_SPACING.LG`: 16px
- etc.

## API Reference

### Hooks

#### `useMusicPlayer()`
Main hook for player control and state access.

```tsx
const {
  state,           // Complete player state
  play,           // Play current track
  pause,          // Pause playback
  next,           // Skip to next track
  previous,       // Skip to previous track
  seek,           // Seek to position (seconds)
  playTrack,      // Play specific track with queue
  // ... more methods
} = useMusicPlayer();
```

#### `usePlaybackControls()`
Simplified playback controls.

```tsx
const {
  togglePlayPause,  // Toggle play/pause
  skipForward,      // Skip forward 10s
  skipBackward,     // Skip backward 10s
  isPlaying,        // Current playing state
  currentTime,      // Current position
  duration,         // Track duration
} = usePlaybackControls();
```

#### `useQueue()`
Queue management utilities.

```tsx
const {
  queue,            // Current queue
  addToQueue,       // Add track to queue
  removeFromQueue,  // Remove track from queue
  clearQueue,       // Clear entire queue
  moveTrackInQueue, // Reorder queue
} = useQueue();
```

#### `useVolumeControl()`
Volume control utilities.

```tsx
const {
  volume,           // Current volume (0-1)
  isMuted,          // Mute state
  setVolume,        // Set volume
  toggleMute,       // Toggle mute
  adjustVolume,     // Adjust by delta
} = useVolumeControl();
```

### Components

#### `<MusicPlayer />`
Global music player component (automatically included in MusicPlayerProvider).

Props:
- `position?: 'fixed' | 'relative' | 'sticky'` - Player positioning
- `showVolumeControl?: boolean` - Show/hide volume control
- `showProgressBar?: boolean` - Show/hide progress bar
- `onToggleLike?: (trackId: string) => void` - Like button handler
- `onShare?: (trackId: string) => void` - Share button handler

#### `<PlaybackControls />`
Playback control buttons.

Props:
- `size?: 'small' | 'medium' | 'large'` - Control size
- `variant?: 'minimal' | 'full'` - Control set variant
- `isPlaying: boolean` - Playing state
- `onPlay?: () => void` - Play handler
- `onPause?: () => void` - Pause handler
- etc.

## Examples

### Basic Player Setup

```tsx
// App.tsx
import { MusicPlayerProvider } from 'design-system';

export default function App() {
  return (
    <MusicPlayerProvider>
      <MyApp />
    </MusicPlayerProvider>
  );
}

// MyComponent.tsx
import { useMusicPlayer, Track } from 'design-system';

const tracks: Track[] = [
  {
    id: '1',
    title: 'Song Title',
    artist: 'Artist Name',
    duration: 180,
    url: 'https://example.com/song.mp3',
    artwork: 'https://example.com/artwork.jpg',
  }
];

function TrackList() {
  const { playTrack } = useMusicPlayer();
  
  return (
    <div>
      {tracks.map(track => (
        <button 
          key={track.id}
          onClick={() => playTrack(track, tracks)}
        >
          {track.title} - {track.artist}
        </button>
      ))}
    </div>
  );
}
```

### Custom Controls

```tsx
import { usePlaybackControls } from 'design-system';
import { Play, Pause, SkipForward } from 'lucide-react';

function CustomControls() {
  const { togglePlayPause, next, isPlaying } = usePlaybackControls();
  
  return (
    <div className="flex items-center space-x-4">
      <button onClick={togglePlayPause}>
        {isPlaying ? <Pause /> : <Play />}
      </button>
      <button onClick={next}>
        <SkipForward />
      </button>
    </div>
  );
}
```

## Contributing

1. Follow the 4px grid system for all spacing
2. Use Spotify color palette for consistency
3. Ensure cross-platform compatibility
4. Add TypeScript types for all new features
5. Test on both web and React Native

## License

MIT License - see LICENSE file for details.