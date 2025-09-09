import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Track, Playlist } from '../types/music';

// Mock API functions - replace with actual API calls
const fetchTrack = async (id: string): Promise<Track> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    id,
    title: `Track ${id}`,
    artist: 'Sample Artist',
    album: 'Sample Album',
    duration: 180,
    url: `https://example.com/tracks/${id}.mp3`,
    artwork: `https://example.com/artwork/${id}.jpg`,
    genre: 'Pop',
    releaseDate: '2023-01-01',
  };
};

const fetchTracks = async (ids: string[]): Promise<Track[]> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 800));
  return ids.map(id => ({
    id,
    title: `Track ${id}`,
    artist: 'Sample Artist',
    album: 'Sample Album',
    duration: Math.floor(Math.random() * 300) + 60,
    url: `https://example.com/tracks/${id}.mp3`,
    artwork: `https://example.com/artwork/${id}.jpg`,
    genre: 'Pop',
    releaseDate: '2023-01-01',
  }));
};

const fetchPlaylist = async (id: string): Promise<Playlist> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 600));
  const tracks = await fetchTracks(['1', '2', '3', '4', '5']);
  return {
    id,
    name: `Playlist ${id}`,
    tracks,
    artwork: `https://example.com/playlists/${id}.jpg`,
    description: 'A sample playlist',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };
};

const searchTracks = async (query: string): Promise<Track[]> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 400));
  return Array.from({ length: 10 }, (_, i) => ({
    id: `search-${i}`,
    title: `${query} Result ${i + 1}`,
    artist: 'Search Artist',
    album: 'Search Album',
    duration: Math.floor(Math.random() * 300) + 60,
    url: `https://example.com/search/${i}.mp3`,
    artwork: `https://example.com/search-artwork/${i}.jpg`,
    genre: 'Pop',
    releaseDate: '2023-01-01',
  }));
};

const addTrackToPlaylist = async (playlistId: string, trackId: string): Promise<void> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 300));
};

const removeTrackFromPlaylist = async (playlistId: string, trackId: string): Promise<void> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 300));
};

// Query keys
export const trackQueryKeys = {
  all: ['tracks'] as const,
  track: (id: string) => [...trackQueryKeys.all, 'track', id] as const,
  tracks: (ids: string[]) => [...trackQueryKeys.all, 'tracks', ids] as const,
  playlist: (id: string) => ['playlists', id] as const,
  search: (query: string) => ['search', query] as const,
};

// Hook to fetch a single track
export const useTrack = (id: string) => {
  return useQuery({
    queryKey: trackQueryKeys.track(id),
    queryFn: () => fetchTrack(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to fetch multiple tracks
export const useTracks = (ids: string[]) => {
  return useQuery({
    queryKey: trackQueryKeys.tracks(ids),
    queryFn: () => fetchTracks(ids),
    enabled: ids.length > 0,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// Hook to fetch a playlist
export const usePlaylist = (id: string) => {
  return useQuery({
    queryKey: trackQueryKeys.playlist(id),
    queryFn: () => fetchPlaylist(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes (playlists change more frequently)
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to search tracks
export const useSearchTracks = (query: string) => {
  return useQuery({
    queryKey: trackQueryKeys.search(query),
    queryFn: () => searchTracks(query),
    enabled: query.length >= 2, // Only search with 2+ characters
    staleTime: 1 * 60 * 1000, // 1 minute
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to add track to playlist
export const useAddTrackToPlaylist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ playlistId, trackId }: { playlistId: string; trackId: string }) =>
      addTrackToPlaylist(playlistId, trackId),
    onSuccess: (_, { playlistId }) => {
      // Invalidate playlist query to refetch updated data
      queryClient.invalidateQueries({ queryKey: trackQueryKeys.playlist(playlistId) });
    },
  });
};

// Hook to remove track from playlist
export const useRemoveTrackFromPlaylist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ playlistId, trackId }: { playlistId: string; trackId: string }) =>
      removeTrackFromPlaylist(playlistId, trackId),
    onSuccess: (_, { playlistId }) => {
      // Invalidate playlist query to refetch updated data
      queryClient.invalidateQueries({ queryKey: trackQueryKeys.playlist(playlistId) });
    },
  });
};

// Hook for prefetching tracks
export const usePrefetchTracks = () => {
  const queryClient = useQueryClient();
  
  const prefetchTrack = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: trackQueryKeys.track(id),
      queryFn: () => fetchTrack(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchPlaylist = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: trackQueryKeys.playlist(id),
      queryFn: () => fetchPlaylist(id),
      staleTime: 2 * 60 * 1000,
    });
  };

  return {
    prefetchTrack,
    prefetchPlaylist,
  };
};

// Hook for optimistic updates
export const useOptimisticTrackUpdate = () => {
  const queryClient = useQueryClient();
  
  const updateTrackCache = (trackId: string, updater: (track: Track) => Track) => {
    queryClient.setQueryData(trackQueryKeys.track(trackId), updater);
  };

  const updatePlaylistCache = (playlistId: string, updater: (playlist: Playlist) => Playlist) => {
    queryClient.setQueryData(trackQueryKeys.playlist(playlistId), updater);
  };

  return {
    updateTrackCache,
    updatePlaylistCache,
  };
};