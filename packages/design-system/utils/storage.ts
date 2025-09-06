/**
 * Storage utilities for persisting player state
 */

export interface StorageAdapter {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}

// Web storage adapter using localStorage
export const webStorageAdapter: StorageAdapter = {
  getItem: async (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Failed to get item from localStorage:', error);
      return null;
    }
  },

  setItem: async (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Failed to set item in localStorage:', error);
    }
  },

  removeItem: async (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove item from localStorage:', error);
    }
  },

  clear: async () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  },
};

// React Native storage adapter (requires @react-native-async-storage/async-storage)
export const createNativeStorageAdapter = (): StorageAdapter => {
  let AsyncStorage: any;
  
  try {
    AsyncStorage = require('@react-native-async-storage/async-storage').default;
  } catch (error) {
    console.warn('AsyncStorage not available, using memory storage');
    // Fallback to memory storage
    const memoryStorage: Record<string, string> = {};
    
    return {
      getItem: async (key: string) => memoryStorage[key] || null,
      setItem: async (key: string, value: string) => {
        memoryStorage[key] = value;
      },
      removeItem: async (key: string) => {
        delete memoryStorage[key];
      },
      clear: async () => {
        Object.keys(memoryStorage).forEach(key => {
          delete memoryStorage[key];
        });
      },
    };
  }

  return {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
    removeItem: AsyncStorage.removeItem,
    clear: AsyncStorage.clear,
  };
};

// Universal storage service
class StorageService {
  private adapter: StorageAdapter;

  constructor(adapter: StorageAdapter) {
    this.adapter = adapter;
  }

  async get<T>(key: string, defaultValue?: T): Promise<T | null> {
    try {
      const value = await this.adapter.getItem(key);
      if (value === null) {
        return defaultValue || null;
      }
      return JSON.parse(value) as T;
    } catch (error) {
      console.warn(`Failed to get ${key} from storage:`, error);
      return defaultValue || null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await this.adapter.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to set ${key} in storage:`, error);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.adapter.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove ${key} from storage:`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.adapter.clear();
    } catch (error) {
      console.warn('Failed to clear storage:', error);
    }
  }
}

// Create storage instance based on platform
export const createStorageService = (): StorageService => {
  if (typeof window !== 'undefined') {
    // Web environment
    return new StorageService(webStorageAdapter);
  } else {
    // React Native environment
    return new StorageService(createNativeStorageAdapter());
  }
};

// Default storage instance
export const storage = createStorageService();