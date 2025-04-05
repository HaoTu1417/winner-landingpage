const STORAGE_PREFIX = "wfs_";

export const STORAGE_KEYS = {
  STOCK: "marketJy", // Store stock info
  AUTH_TOKEN: "authToken",
};

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window !== "undefined") {
    try {
      const storageKey = STORAGE_PREFIX + key;
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(storageKey, serializedValue);
    } catch (error) {
      console.error(`Error saving ${key} to localStorage`, error);
    }
  }
}

export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== "undefined") {
    try {
      const storageKey = STORAGE_PREFIX + key;
      const item = localStorage.getItem(storageKey);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage`, error);
      return defaultValue;
    }
  }
  return defaultValue;
}

export function removeLocalStorage(key: string): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage`, error);
    }
  }
}

export function clearLocalStorage(): void {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error("Error clearing localStorage", error);
  }
}
