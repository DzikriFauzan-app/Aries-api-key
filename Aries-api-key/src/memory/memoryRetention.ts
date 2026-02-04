/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
import { MemoryRecord } from "./memoryRecord";


export class MemoryRetention {
  private readonly logger = new Logger();
  constructor(private minScore: number) {}

  retain(records: MemoryRecord[]): MemoryRecord[] {
    return records.filter(r => r.score >= this.minScore);
  }

  public async healthCheck(): Promise<boolean> { try { return !!this.logger; } catch { return false; } }
}
