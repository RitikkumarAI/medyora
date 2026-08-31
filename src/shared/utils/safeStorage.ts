// Safe storage wrapper that guards against SSR and iframe SecurityError exceptions
const memoryStore: Record<string, string> = {};
const sessionMemoryStore: Record<string, string> = {};

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Ignored: Fallback to memory
    }
    return memoryStore[key] ?? null;
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Ignored: Fallback to memory
    }
    memoryStore[key] = value;
  },
  removeItem(key: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignored: Fallback to memory
    }
    delete memoryStore[key];
  },
};

export const safeSessionStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch {
      // Ignored: Fallback to memory
    }
    return sessionMemoryStore[key] ?? null;
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
      }
    } catch {
      // Ignored: Fallback to memory
    }
    sessionMemoryStore[key] = value;
  },
  removeItem(key: string): void {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
      }
    } catch {
      // Ignored: Fallback to memory
    }
    delete sessionMemoryStore[key];
  },
};
