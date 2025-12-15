import fs from "fs";
import { MemoryBackend } from "./memoryBackend";
import { MemoryRecord } from "./memoryRecord";

export class FileMemoryBackend implements MemoryBackend {
  private map = new Map<string, MemoryRecord>();

  constructor(private file: string) {
    if (fs.existsSync(file)) {
      const raw = JSON.parse(fs.readFileSync(file, "utf8")) as MemoryRecord[];
      raw.forEach(r => this.map.set(r.key, r));
    }
  }

  read(key: string): MemoryRecord | undefined {
    const rec = this.map.get(key);
    if (!rec) return undefined;

    rec.hits++;
    rec.lastAccess = Date.now();
    return rec;
  }

  write(rec: MemoryRecord): void {
    this.map.set(rec.key, rec);
    this.flush();
  }

  delete(key: string): void {
    this.map.delete(key);
    this.flush();
  }

  snapshot(): MemoryRecord[] {
    return Array.from(this.map.values());
  }

  replace(all: MemoryRecord[]): void {
    this.map.clear();
    all.forEach(r => this.map.set(r.key, r));
    this.flush();
  }

  private flush(): void {
    fs.writeFileSync(this.file, JSON.stringify(this.snapshot(), null, 2));
  }
}
