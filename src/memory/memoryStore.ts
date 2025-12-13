export interface MemoryRecord {
  key: string;
  value: string;
  timestamp: number;
}

export class MemoryStore {
  private store: Map<string, MemoryRecord> = new Map();

  public write(key: string, value: string): void {
    const record: MemoryRecord = {
      key,
      value,
      timestamp: Date.now()
    };
    this.store.set(key, record);
  }

  public read(key: string): MemoryRecord | null {
    return this.store.get(key) || null;
  }

  public clear(): void {
    this.store.clear();
  }
}
