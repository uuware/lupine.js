export class LocalStorageWrapper {
  private prefix: string;

  /**
   * Creates an instance of LocStorage.
   * @param prefix - The prefix applied to all storage keys.
   */
  constructor(prefix: string) {
    this.prefix = prefix;
  }

  set(key: string, value: string | null) {
    if (typeof window === 'undefined') return;
    if (value === null) {
      window.localStorage.removeItem(this.makeKey(key));
      return;
    }
    window.localStorage.setItem(this.makeKey(key), value);
  }
  get(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(this.makeKey(key));
  }
  setJson(key: string, value: object | null) {
    if (typeof window === 'undefined') return;
    if (value === null) {
      window.localStorage.removeItem(this.makeKey(key));
      return;
    }
    window.localStorage.setItem(this.makeKey(key), JSON.stringify(value));
  }
  getJson(key: string): object | null {
    if (typeof window === 'undefined') return null;
    const val = window.localStorage.getItem(this.makeKey(key));
    try {
      if (!val) return null;
      return JSON.parse(val);
    } catch (error) {
      console.error(`[LocalStorage Error] Failed to get key "${key}":`, error);
      return null;
    }
  }

  private makeKey(key: string): string {
    return `${this.prefix}${key}`;
  }
}
