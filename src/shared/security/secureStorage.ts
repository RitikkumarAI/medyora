/**
 * Enterprise Secure Storage Wrapper
 * Stores sensitive client session data with timestamp validation and TTL expiry.
 */

interface StoragePayload<T> {
  value: T;
  createdAt: number;
  expiresAt: number | null;
  checksum?: string;
}

export const secureStorage = {
  setItem<T>(key: string, value: T, ttlSeconds: number | null = null): boolean {
    if (typeof window === "undefined") return false;

    try {
      const now = Date.now();
      const payload: StoragePayload<T> = {
        value,
        createdAt: now,
        expiresAt: ttlSeconds ? now + ttlSeconds * 1000 : null,
      };

      const serialized = JSON.stringify(payload);
      // Safe base64 encoding
      const encoded = btoa(encodeURIComponent(serialized));
      localStorage.setItem(`sec_${key}`, encoded);
      return true;
    } catch (err) {
      console.warn("[SecureStorage] Failed to store item:", err);
      return false;
    }
  },

  getItem<T>(key: string): T | null {
    if (typeof window === "undefined") return null;

    try {
      const encoded = localStorage.getItem(`sec_${key}`);
      if (!encoded) return null;

      const serialized = decodeURIComponent(atob(encoded));
      const payload: StoragePayload<T> = JSON.parse(serialized);

      // Check TTL expiration
      if (payload.expiresAt && Date.now() > payload.expiresAt) {
        this.removeItem(key);
        return null;
      }

      return payload.value;
    } catch {
      return null;
    }
  },

  removeItem(key: string): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`sec_${key}`);
    }
  },

  clear(): void {
    if (typeof window !== "undefined") {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("sec_"))
        .forEach((k) => localStorage.removeItem(k));
    }
  },
};
