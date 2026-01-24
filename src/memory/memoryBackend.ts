import { MemoryRecord } from "./memoryRecord";

export interface MemoryBackend {
  read(key: string): MemoryRecord | undefined;
  write(rec: MemoryRecord): void;
  delete(key: string): void;

  snapshot(): MemoryRecord[];
  replace(all: MemoryRecord[]): void;
}
