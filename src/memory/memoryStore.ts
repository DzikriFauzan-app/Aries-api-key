import { MemoryBackend } from "./memoryBackend";
import { MemoryRecord } from "./memoryTypes";

export class MemoryStore {
  private backend: MemoryBackend;

  constructor(backend: MemoryBackend) {
    this.backend = backend;
  }

  write(key: string, value: string): void {
    const rec: MemoryRecord = {
      key,
      value,
      ts: Date.now()
    };
    this.backend.write(rec);
  }

  read(key: string): MemoryRecord | undefined {
    return this.backend.read(key);
  }

  snapshot(): MemoryRecord[] {
    return this.backend.snapshot();
  }
}
