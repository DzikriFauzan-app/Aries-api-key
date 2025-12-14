import { MemoryRecord } from "./memoryTypes";

export interface MemoryBackend {
  read(key: string): MemoryRecord | undefined;
  write(rec: MemoryRecord): void;
  snapshot(): MemoryRecord[];
}
