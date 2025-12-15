import { MemoryBackend } from "./memoryBackend";
import { MemoryRecord } from "./memoryRecord";

export class MemoryStore {
  constructor(private backend: MemoryBackend) {}

  read(key: string): MemoryRecord | undefined {
    return this.backend.read(key);
  }

  write(rec: MemoryRecord): void {
    this.backend.write(rec);
  }

  delete(key: string): void {
    this.backend.delete(key);
  }

  snapshot(): MemoryRecord[] {
    return this.backend.snapshot();
  }

  replace(all: MemoryRecord[]): void {
    this.backend.replace(all);
  }
}
