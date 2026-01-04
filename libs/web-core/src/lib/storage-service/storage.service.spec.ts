import { StorageServiceCore, createBrowserStorageProvider, StorageProvider, StorageLike } from './storage.service';

class MockStorage implements StorageLike {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  clear(): void {
    this.store = {};
  }
}

describe('StorageServiceCore', () => {
  let mockProvider: StorageProvider;
  let mockLocalStorage: MockStorage;
  let mockSessionStorage: MockStorage;
  let storageService: StorageServiceCore;

  beforeEach(() => {
    mockLocalStorage = new MockStorage();
    mockSessionStorage = new MockStorage();
    mockProvider = {
      local: mockLocalStorage,
      session: mockSessionStorage,
    };
    storageService = new StorageServiceCore(mockProvider);
  });

  describe('Local Storage Methods', () => {
    it('should get item from local storage', () => {
      mockLocalStorage.setItem('testKey', 'testValue');
      
      const result = storageService.getLocalItem('testKey');
      
      expect(result).toBe('testValue');
    });

    it('should return null for non-existent local storage item', () => {
      const result = storageService.getLocalItem('nonExistent');
      
      expect(result).toBeNull();
    });

    it('should set item in local storage', () => {
      storageService.setLocalItem('testKey', 'testValue');
      
      expect(mockLocalStorage.getItem('testKey')).toBe('testValue');
    });

    it('should clear local storage', () => {
      mockLocalStorage.setItem('key1', 'value1');
      mockLocalStorage.setItem('key2', 'value2');
      
      storageService.clearLocal();
      
      expect(mockLocalStorage.getItem('key1')).toBeNull();
      expect(mockLocalStorage.getItem('key2')).toBeNull();
    });

    it('should handle null local storage provider', () => {
      const serviceWithNullLocal = new StorageServiceCore({ local: null, session: mockSessionStorage });
      
      const result = serviceWithNullLocal.getLocalItem('testKey');
      
      expect(result).toBeNull();
    });
  });

  describe('Session Storage Methods', () => {
    it('should get item from session storage', () => {
      mockSessionStorage.setItem('testKey', 'testValue');
      
      const result = storageService.getSessionItem('testKey');
      
      expect(result).toBe('testValue');
    });

    it('should return null for non-existent session storage item', () => {
      const result = storageService.getSessionItem('nonExistent');
      
      expect(result).toBeNull();
    });

    it('should set item in session storage', () => {
      storageService.setSessionItem('testKey', 'testValue');
      
      expect(mockSessionStorage.getItem('testKey')).toBe('testValue');
    });

    it('should clear session storage', () => {
      mockSessionStorage.setItem('key1', 'value1');
      mockSessionStorage.setItem('key2', 'value2');
      
      storageService.clearSession();
      
      expect(mockSessionStorage.getItem('key1')).toBeNull();
      expect(mockSessionStorage.getItem('key2')).toBeNull();
    });

    it('should check if session storage is available', () => {
      expect(storageService.isSessionStorageAvailable()).toBe(true);
    });

    it('should return false when session storage is not available', () => {
      const serviceWithNullSession = new StorageServiceCore({ local: mockLocalStorage, session: null });
      
      expect(serviceWithNullSession.isSessionStorageAvailable()).toBe(false);
    });
  });

  describe('Storage Permission Checks', () => {
    it('should not call callback when storage is accessible', () => {
      const mockCallback = jest.fn();
      
      storageService.checkStoragePermission('http://example.com', mockCallback);
      
      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should call callback when DOMException is thrown', () => {
      const mockCallback = jest.fn();
      const throwingStorage = {
        getItem: jest.fn().mockImplementation(() => {
          throw new DOMException('Storage access denied');
        }),
        setItem: jest.fn(),
        clear: jest.fn(),
      };
      
      const serviceWithThrowingStorage = new StorageServiceCore({
        local: mockLocalStorage,
        session: throwingStorage,
      });
      
      serviceWithThrowingStorage.checkStoragePermission('http://example.com', mockCallback);
      
      expect(mockCallback).toHaveBeenCalledWith('http://example.com');
    });

    it('should call callback when any error is thrown', () => {
      const mockCallback = jest.fn();
      const throwingStorage = {
        getItem: jest.fn().mockImplementation(() => {
          throw new Error('Generic storage error');
        }),
        setItem: jest.fn(),
        clear: jest.fn(),
      };
      
      const serviceWithThrowingStorage = new StorageServiceCore({
        local: mockLocalStorage,
        session: throwingStorage,
      });
      
      serviceWithThrowingStorage.checkStoragePermission('http://example.com', mockCallback);
      
      expect(mockCallback).toHaveBeenCalledWith('http://example.com');
    });

    it('should handle null session storage in permission check', () => {
      const mockCallback = jest.fn();
      const serviceWithNullSession = new StorageServiceCore({
        local: mockLocalStorage,
        session: null,
      });
      
      serviceWithNullSession.checkStoragePermission('http://example.com', mockCallback);
      
      expect(mockCallback).not.toHaveBeenCalled();
    });
  });
});

describe('createBrowserStorageProvider', () => {
  const originalWindow = global.window;

  afterEach(() => {
    global.window = originalWindow;
  });

  it('should return storage objects when window is available', () => {
    const mockLocalStorage = new MockStorage();
    const mockSessionStorage = new MockStorage();
    
    Object.defineProperty(global, 'window', {
      value: {
        localStorage: mockLocalStorage,
        sessionStorage: mockSessionStorage,
      },
      writable: true,
    });

    const provider = createBrowserStorageProvider();

    expect(provider.local).toBe(mockLocalStorage);
    expect(provider.session).toBe(mockSessionStorage);
  });

  it('should return null storage when window is not available', () => {
    delete (global as any).window;

    const provider = createBrowserStorageProvider();

    expect(provider.local).toBeNull();
    expect(provider.session).toBeNull();
  });

  it('should handle storage access errors gracefully', () => {
    Object.defineProperty(global, 'window', {
      value: {
        get localStorage() {
          throw new Error('Storage access denied');
        },
        get sessionStorage() {
          throw new Error('Storage access denied');
        },
      },
      writable: true,
    });

    const provider = createBrowserStorageProvider();

    expect(provider.local).toBeNull();
    expect(provider.session).toBeNull();
  });
});