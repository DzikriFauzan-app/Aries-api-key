import { MemoryRecord } from "./memoryRecord";

export class MemoryScorer {
  static score(rec: MemoryRecord, now: number): number {
    const age = now - rec.lastAccess;
    const freshness = Math.max(0, 100000 - age / 1000);
    return rec.hits * 2 + freshness;
  }
}
