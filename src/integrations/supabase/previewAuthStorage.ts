// Safe Auth Storage broker for Supabase Client that works in SSR and restricted iframes
const memoryStore: Record<string, string> = {};

const safeStorageAdapter = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Ignored
    }
    return memoryStore[key] ?? null;
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Ignored
    }
    memoryStore[key] = value;
  },
  removeItem(key: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignored
    }
    delete memoryStore[key];
  },
};

export function brokeredPreviewStorage() {
  if (typeof window === "undefined") return undefined;
  return safeStorageAdapter;
}
