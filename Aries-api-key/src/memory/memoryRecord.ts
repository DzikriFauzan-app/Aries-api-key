/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


export interface MemoryRecord {
  key: string;
  value: string;
  ts: number;

  // learning metadata
  score: number;
  hits: number;
  lastAccess: number;
}
