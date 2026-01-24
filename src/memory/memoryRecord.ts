export interface MemoryRecord {
  key: string;
  value: string;
  ts: number;

  // learning metadata
  score: number;
  hits: number;
  lastAccess: number;
}
