import { MemoryRecord } from "./memoryRecord";

export class MemoryRetention {
  constructor(private minScore: number) {}

  retain(records: MemoryRecord[]): MemoryRecord[] {
    return records.filter(r => r.score >= this.minScore);
  }
}
