import * as fs from "fs";
import * as path from "path";

export class MemoryStore {
  private store = new Map<string, any>();
  private filePath: string;

  constructor(filePath: string = ".aries_memory_v2.json") {
    this.filePath = path.resolve(process.cwd(), filePath);
    this.load();
  }

  private load() {
    if (fs.existsSync(this.filePath)) {
      try {
        const data = fs.readFileSync(this.filePath, "utf-8");
        const raw = JSON.parse(data);
        for (const [k, v] of Object.entries(raw)) {
          this.store.set(k, v);
        }
      } catch (e) {
        console.error("Failed to load memory store:", e);
      }
    }
  }

  private save() {
    // Simple Sync Save for now (Optimize later to Async/Debounce)
    const obj = Object.fromEntries(this.store);
    fs.writeFileSync(this.filePath, JSON.stringify(obj, null, 2));
  }

  read(key: string) {
    return this.store.get(key);
  }

  write(key: string, value: any) {
    this.store.set(key, value);
    this.save();
  }

  clearByPrefix(prefix: string) {
    let changed = false;
    for (const k of this.store.keys()) {
      if (k.startsWith(prefix)) {
        this.store.delete(k);
        changed = true;
      }
    }
    if (changed) this.save();
  }
}
