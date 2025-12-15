import { MemoryRecord } from "./memoryTypes";
import { MemoryBackend } from "./memoryBackend";

export class MemoryStore {
  private records: MemoryRecord[] = [];

  constructor(private backend?: MemoryBackend) {}

  write(record: MemoryRecord): void {
    this.records.push(Object.freeze(record));
    this.backend?.write(record);
  }

  read(key: string): MemoryRecord | undefined {
    return this.backend?.read(key);
  }

  readByAgent(agent: string): readonly MemoryRecord[] {
    return this.records.filter(r => r.agent === agent);
  }

  all(): readonly MemoryRecord[] {
    return this.records;
  }
}
