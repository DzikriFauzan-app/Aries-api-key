import { MemoryBackend } from "./memoryBackend";
import { FileMemoryBackend } from "./fileMemoryBackend";
import { homedir } from "os";
import { join } from "path";

export class MemoryStore {
  private static instance: MemoryStore;
  private backend: MemoryBackend;

  private constructor(backend: MemoryBackend) {
    this.backend = backend;
  }

  static get(): MemoryStore {
    if (!this.instance) {
      const path = join(homedir(), ".aries", "memory.json");
      this.instance = new MemoryStore(new FileMemoryBackend(path));
    }
    return this.instance;
  }

  read(key: string): string | null {
    return this.backend.read(key);
  }

  write(key: string, value: string): void {
    this.backend.write(key, value);
  }

  snapshot(): Record<string, string> {
    return this.backend.snapshot();
  }
}
