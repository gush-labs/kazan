import { ref, reactive, watch, type Ref, type WatchSource } from "vue";

export type StorageRef<T> = Ref<T | undefined>;
export type UniversalStorageRef = object | WatchSource<unknown>;

/**
 * Completely reactive persistant storage powered by browser local storage.
 */
export class Storage {
  // in memory storage
  static cacheValues = new Map<string, Ref<any>>();
  static cacheObjects = new Map<string, any>();
  static version = 3;

  /**
   * Verifies that storage is not oudated
   * and if it is, then performs a full cleanup
   */
  static verify() {
    const rawVersion = localStorage.getItem("version");
    if (rawVersion) {
      const version = JSON.parse(rawVersion) as number;
      if (version == this.version) {
        return;
      }
    }
    localStorage.clear();
    localStorage.setItem("version", this.version + "");
  }

  /**
   * Get reference to the value in the storage.
   * If value is missing, call the retriever to get a value.
   */
  static cached<T>(
    key: string,
    retriever: () => Promise<T>
  ): Promise<Ref<T | undefined>> {
    const ref = Storage.get<T>(key);
    if (ref.value) {
      return Promise.resolve(ref);
    }

    return retriever().then((v) => {
      ref.value = v;
      return ref;
    });
  }

  /**
   * Get a reference to the value in the storage
   */
  static get<T>(key: string): StorageRef<T> {
    const ref = Storage.getCachedRef<T>(key);
    if (ref.value) {
      return ref;
    }
    this.getLocalStorageItem<T>(key, (value) => (ref.value = value));
    return ref;
  }

  /**
   * Get an object from the storage. If missing
   * initialize with provided object.
   */
  static getObject<T>(key: string, init: object): T {
    let saved: T | undefined = undefined;
    if (!this.cacheObjects.has(key)) {
      this.getLocalStorageItem<T>(key, (newValue) => (saved = newValue));
    }
    const object = Storage.getCachedObject<T>(key, saved ? saved : init);
    this.localStorageSet(key, object);
    return object as unknown as T;
  }

  /**
   * Remove a value from the storage
   */
  static delete(key: string) {
    this.getCachedRef(key).value = undefined;
    this.cacheObjects.delete(key);
  }

  /**
   * Removes all data from the storage
   */
  static clear() {
    this.cacheValues.forEach((value) => {
      value.value = undefined;
    });
    this.cacheObjects.clear();
    localStorage.clear();
    localStorage.setItem("version", this.version + "");
  }

  private static getLocalStorageItem<T>(
    key: string,
    setter: (value: T) => void
  ) {
    try {
      const storageEntry = localStorage.getItem(key);
      if (storageEntry) {
        const value = JSON.parse(storageEntry);
        setter(value);
      }
    } catch (error) {
      console.error("Failed to read data from the storage", error);
    }
  }

  private static getCachedObject<T>(key: string, init: object): T {
    return this.getCached<T>(key, this.cacheObjects, () =>
      reactive<object>(init)
    );
  }

  /**
   * Gets a reference for a specific value
   */
  private static getCachedRef<T>(key: string): StorageRef<T> {
    return this.getCached<StorageRef<T | undefined>>(
      key,
      this.cacheValues,
      () => ref<T | undefined>(undefined)
    );
  }

  private static getCached<R>(
    key: string,
    collection: Map<string, UniversalStorageRef>,
    initializer: () => UniversalStorageRef
  ): R {
    const cachedObject = collection.get(key);
    if (cachedObject) {
      return cachedObject as unknown as R;
    }

    const newObject = initializer();
    collection.set(key, newObject);
    watch(newObject, (value) => this.localStorageSet(key, value));
    return newObject as unknown as R;
  }

  private static localStorageSet<T>(key: string, value: T) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }
}
