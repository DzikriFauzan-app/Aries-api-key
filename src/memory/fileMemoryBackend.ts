import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { MemoryBackend } from "./memoryBackend";

export class FileMemoryBackend implements MemoryBackend {
  private path: string;
  private cache: Record<string, string> = {};

  constructor(path: string) {
    this.path = path;
    this.ensure();
    this.load();
  }

  private ensure() {
    const dir = dirname(this.path);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    if (!existsSync(this.path)) writeFileSync(this.path, "{}");
  }

  private load() {
    this.cache = JSON.parse(readFileSync(this.path, "utf-8") || "{}");
  }

  private flush() {
    const ordered: Record<string, string> = {};
    Object.keys(this.cache).sort().forEach(k => ordered[k] = this.cache[k]);
    writeFileSync(this.path, JSON.stringify(ordered, null, 2));
  }

  read(key: string): string | null {
    return this.cache[key] ?? null;
  }

  write(key: string, value: string): void {
    this.cache[key] = value;
    this.flush();
  }

  snapshot(): Record<string, string> {
    return { ...this.cache };
  }
}
