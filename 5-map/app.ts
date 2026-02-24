class HashMap<K, V> {
  private _buckets: Array<BucketNode<K, V> | null>;
  private _size: number;
  private _capacity: number;
  private readonly _loadFactor: number = 0.75;

  constructor(initialCapacity: number = 16) {
    this._capacity = initialCapacity;
    this._buckets = Array.from({ length: this._capacity }, () => null);
    this._size = 0;
  }

  private hash(key: K): number {
    const keyStr = String(key);
    let hash = 17;

    for (let i = 0; i < keyStr.length; i++) {
      const charCode = keyStr.charCodeAt(i);
      hash = hash * 31 + charCode;
      hash |= 0; // 32‑битное целое
    }

    return Math.abs(hash) % this._capacity;
  }

  private findInBucket(bucketIndex: number, key: K): BucketNode<K, V> | null {
    // Проверка границ массива — исключаем undefined
    if (bucketIndex < 0 || bucketIndex >= this._buckets.length) {
      return null;
    }

    // Явно указываем тип и используем nullish coalescing
    let current: BucketNode<K, V> | null = this._buckets[bucketIndex] ?? null;

    while (current !== null) {
      if (this.keysEqual(current.key, key)) {
        return current;
      }
      // Гарантируем null, если next был undefined
      current = current.next ?? null;
    }

    return null;
  }

  private keysEqual(key1: K, key2: K): boolean {
    if (key1 === key2) return true;

    if (
      typeof key1 === "object" &&
      key1 !== null &&
      typeof key2 === "object" &&
      key2 !== null
    ) {
      return this.deepEqual(key1, key2);
    }

    return false;
  }

  private deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return false;
    if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key) || !this.deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  private resize(): void {
    const oldBuckets = this._buckets;
    this._capacity *= 2;
    this._buckets = Array.from({ length: this._capacity }, () => null);
    this._size = 0;

    for (const bucket of oldBuckets) {
      let current: BucketNode<K, V> | null = bucket ?? null; // Явное приведение
      while (current !== null) {
        this.set(current.key, current.value);
        current = current.next ?? null; // Гарантируем null
      }
    }
  }

  set(key: K, value: V): void {
    if (this._size >= this._capacity * this._loadFactor) {
      this.resize();
    }

    const bucketIndex = this.hash(key);

    // Проверяем границы перед использованием
    if (bucketIndex < 0 || bucketIndex >= this._buckets.length) {
      throw new Error("Invalid bucket index");
    }

    const existingNode = this.findInBucket(bucketIndex, key);

    if (existingNode !== null) {
      existingNode.value = value;
    } else {
      const newNode: BucketNode<K, V> = {
        key,
        value,
        next: this._buckets[bucketIndex] ?? null, // Гарантируем null
      };

      this._buckets[bucketIndex] = newNode;
      this._size++;
    }
  }

  get(key: K): V | undefined {
    const bucketIndex = this.hash(key);

    if (bucketIndex < 0 || bucketIndex >= this._buckets.length) {
      return undefined;
    }

    const node = this.findInBucket(bucketIndex, key);
    return node ? node.value : undefined;
  }

  delete(key: K): boolean {
    const bucketIndex = this.hash(key);

    // Проверка границ
    if (bucketIndex < 0 || bucketIndex >= this._buckets.length) {
      return false;
    }

    let current: BucketNode<K, V> | null = this._buckets[bucketIndex] ?? null;
    let prev: BucketNode<K, V> | null = null;

    while (current !== null) {
      if (this.keysEqual(current.key, key)) {
        if (prev === null) {
          this._buckets[bucketIndex] = current.next ?? null;
        } else {
          prev.next = current.next ?? null;
        }
        this._size--;
        return true;
      }

      prev = current;
      current = current.next ?? null; // Ключевое исправление
    }

    return false;
  }

  clear(): void {
    this._buckets = Array.from({ length: this._capacity }, () => null);
    this._size = 0;
  }

  getSize(): number {
    return this._size;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }
}

interface BucketNode<K, V> {
  key: K;
  value: V;
  next: BucketNode<K, V> | null;
}
