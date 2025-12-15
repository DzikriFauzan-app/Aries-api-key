import { MemoryBackend } from "./memoryBackend";
import { MemoryRecord } from "./memoryTypes";
import * as fs from "fs";

export class FileMemoryBackend implements MemoryBackend {
  private map = new Map<string, MemoryRecord>();

  constructor(private file: string) {
    if (fs.existsSync(file)) {
      const raw: MemoryRecord[] = JSON.parse(
        fs.readFileSync(file, "utf-8")
      );
      raw.forEach(r => {
        if (r.key) {
          this.map.set(r.key, r);
        }
      });
    }
  }

  write(rec: MemoryRecord): void {
    if (!rec.key) return;
    this.map.set(rec.key, rec);
    this.flush();
  }

  read(key: string): MemoryRecord | undefined {
    return this.map.get(key);
  }

  snapshot(): MemoryRecord[] {
    return [...this.map.values()];
  }

  private flush(): void {
    fs.writeFileSync(
      this.file,
      JSON.stringify(this.snapshot(), null, 2)
    );
  }
}
