/**
 * This is an implementation of persistant storage where web-app stores
 * currently selected vocabulary, app settings, WaniKani credentials and everything else.
 * This code is quite obscure, so I will not recommend spending any time trying to read
 * and understand it (and yep, this code is a reinvented wheel).
 */
import { ref, reactive, watch, type Ref } from "vue";

export type StorageRef<T> = Ref<T | undefined>;

export type RemoteData = {
  version: number;
  data: Map<string, any>;
};

export interface RemoteStorage {
  loadAll: () => Promise<RemoteData>;
  setVersion: (version: number) => void;
  save: (key: string, value: any) => void;
}

/**
 * Completely reactive persistant storage powered by browser local storage.
 */
export class Storage {
  // in-memory storage of primitive values
  static cacheValues = new Map<string, Ref<any>>();

  // in-memory storage of objects
  static cacheObjects = new Map<string, any>();

  // requited version of the storage
  static requiredVersion = 6;

  /**
   * Verifies that storage is not oudated
   * and if it is, then performs a full cleanup.
   */
  public static verify() {
    try {
      const rawVersion = localStorage.getItem("version");
      if (rawVersion) {
        const version = JSON.parse(rawVersion) as number;
        if (version === this.requiredVersion) {
          return;
        }
      }
    } catch (e) {
      console.error("Failed to parse storage version", e);
    }
    this.clearStorage();
    console.info("Storage is cleared due to not being valid.");
  }

  /**
   * Removes all saved data in the browser storage.
   * And updates storage version to the latest one.
   */
  private static clearStorage() {
    localStorage.clear();
    localStorage.setItem("version", this.requiredVersion + "");
  }

  /**
   * Removes all data from the local caches and clears
   * the browser storage completely.
   */
  public static clear() {
    this.cacheValues.forEach((r) => (r.value = undefined));
    this.cacheObjects.clear();
    this.clearStorage();
  }

  /**
   * Get a reference to the value in the storage.
   */
  public static get<T>(key: string): StorageRef<T> {
    const ref = this.getCachedRef<T>(key);
    if (ref.value) {
      return ref;
    }
    const saved = this.getLocalStorageItem<T>(key);
    if (saved) {
      ref.value = saved;
    }
    return ref;
  }

  /**
   * Get an object from the storage. If missing
   * initialize with provided object.
   */
  public static getObject<T extends object>(key: string, init: T): T {
    let saved: T | undefined = undefined as T | undefined;

    if (!this.cacheObjects.has(key)) {
      saved = this.getLocalStorageItem<T>(key);
    }

    const object = Storage.getCachedObject<T>(key, saved ? saved : init);
    this.localStorageSet(key, object);
    return object;
  }

  /**
   * Remove a value from the storage
   */
  public static delete(key: string) {
    this.getCachedRef(key).value = undefined;
    this.cacheObjects.delete(key);
    localStorage.removeItem(key);
  }

  /**
   * Reads a value from the browser local storage.
   * @param key key for that value
   * @returns value or undefined if it's not present in the storage
   */
  private static getLocalStorageItem<T>(key: string): T | undefined {
    try {
      const storageEntry = localStorage.getItem(key);
      if (storageEntry) {
        const value = JSON.parse(storageEntry);
        return value;
      }
    } catch (error) {
      console.error(
        "Failed to read data from the local storage for key=" + key,
        error
      );
    }
    return undefined;
  }

  /**
   * Loads an object from the local cache (browser local storage).
   * @param key key for the object
   * @param init initial value if object is not present
   * @returns an object itself
   */
  private static getCachedObject<T extends object>(
    key: string,
    init: object
  ): T {
    return this.getCached<T, T>(
      key,
      this.cacheObjects,
      () => reactive<object>(init) as T,
      (r, onChange) => watch(r, (v) => onChange(v))
    );
  }

  /**
   * Loads ref of the value from the local cache (browser local storage).
   * @param key key of the value
   * @returns reference to the value
   */
  private static getCachedRef<T>(key: string): StorageRef<T> {
    return this.getCached<StorageRef<T>, T | undefined>(
      key,
      this.cacheValues,
      () => ref<T | undefined>(undefined) as StorageRef<T>,
      (r, onChange) => watch(r, (v) => onChange(v))
    );
  }

  private static getCached<S, R>(
    key: string,
    collection: Map<string, S>,
    initializer: () => S,
    watcher: (r: S, onChange: (v: R) => void) => void
  ): S {
    const cachedObject = collection.get(key);
    if (cachedObject) {
      return cachedObject;
    }

    const newObject = initializer();
    collection.set(key, newObject);
    // watch() is bound to the component lifetime by default
    // we want to avoid that by calling watch in setTimeout() function
    setTimeout(
      () => watcher(newObject, (v) => this.localStorageSet(key, v)),
      0
    );
    return newObject;
  }

  private static localStorageSet<T>(key: string, value: T) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }
}

// Verify the storage on the startup
Storage.verify();
