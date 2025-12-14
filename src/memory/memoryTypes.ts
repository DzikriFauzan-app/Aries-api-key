export interface MemoryRecord {
  key: string;
  value: string;
  ts: number; // Timestamp
}

export interface MemoryStore {
  write(key: string, value: string): void;
  read(key: string): MemoryRecord | null;
  dump(): MemoryRecord[];
}
