// storage.service.core.ts (in libs/ca-web-core or similar)

export type NavigateFn = (url: string) => void;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  clear(): void;
}

export interface StorageProvider {
  session: StorageLike | null;
  local: StorageLike | null;
}

/**
 * Default provider for browser environments.
 * Safe for SSR: returns null if window/storage is unavailable.
 */
export function createBrowserStorageProvider(): StorageProvider {
  const hasWindow = typeof window !== 'undefined';

  const safeGet = <T>(getter: () => T): T | null => {
    try {
      return getter();
    } catch {
      return null;
    }
  };

  const session = hasWindow ? safeGet(() => window.sessionStorage) : null;
  const local = hasWindow ? safeGet(() => window.localStorage) : null;

  return { session, local };
}

export class StorageServiceCore {
  constructor(
    private readonly provider: StorageProvider = createBrowserStorageProvider()
  ) { }

  // session storage
  getSessionItem(key: string): string | null {
    return this.provider.session?.getItem(key) ?? null;
  }

  setSessionItem(key: string, value: string): void {
    this.provider.session?.setItem(key, value);
  }

  clearSession(): void {
    this.provider.session?.clear();
  }

  isSessionStorageAvailable(): boolean {
    return !!this.provider.session;
  }

  // local storage
  getLocalItem(key: string): string | null {
    return this.provider.local?.getItem(key) ?? null;
  }

  setLocalItem(key: string, value: string): void {
    this.provider.local?.setItem(key, value);
  }

  clearLocal(): void {
    this.provider.local?.clear();
  }

  /**
   * Checks if storage permission is available (covers cases like blocked storage / third-party cookies).
   * If not available, triggers the provided callback.
   */
  checkStoragePermission(noPermissionUrl: string, onNoPermission?: NavigateFn): void {
    try {
      // Touch session storage to detect permission/availability issues
      this.provider.session?.getItem('');
    } catch (e) {
      // DOMException is typical, but don't rely only on instanceof for cross-realm edge cases
      const isDomException =
        typeof DOMException !== 'undefined' && e instanceof DOMException;

      if (isDomException || e) {
        onNoPermission?.(noPermissionUrl);
      }
    }
  }
}

// Keep these in core too, they’re framework-neutral:
export enum SessionStorageKey {
  merchantSessionId = 'merchantSessionId',
  preferredProduct = 'preferredProduct',
  customerNames = 'customerNames',
  facebookConnected = 'facebookConnected',
  paypalConnected = 'paypalConnected',
  originationFlow = 'originationFlow',
  institution = 'institution',
  bankConnectionResult = 'bkResult',
  merchantDetails = 'merchantDetails',
  authToken = 'authToken',
}
