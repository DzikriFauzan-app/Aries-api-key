import fs from "fs";
import { MemoryBackend } from "./memoryBackend";
import { MemoryRecord } from "./memoryTypes";

export class FileMemoryBackend implements MemoryBackend {
  private file: string;
  private map = new Map<string, MemoryRecord>();

  constructor(file = "aries.memory.json") {
    this.file = file;
    if (fs.existsSync(file)) {
      const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
      raw.forEach((r: MemoryRecord) => this.map.set(r.key, r));
    }
  }

  write(rec: MemoryRecord): void {
    this.map.set(rec.key, rec);
    fs.writeFileSync(
      this.file,
      JSON.stringify(this.snapshot(), null, 2)
    );
  }

  read(key: string): MemoryRecord | undefined {
    return this.map.get(key);
  }

  snapshot(): MemoryRecord[] {
    return Array.from(this.map.values());
  }
}
