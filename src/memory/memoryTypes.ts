export interface MemoryRecord {
  readonly ts: number;

  // KV MEMORY (LEGACY / BACKEND)
  readonly key?: string;
  readonly value?: string;

  // AGENT MEMORY (COGNITIVE)
  readonly agent?: string;
  readonly role?: string;
  readonly content?: string;
}
