/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


export interface ForensicEvent {
  id: string;
  type: string;
  source: string;
  timestamp: number;
  correlationId?: string;
  payloadHash: string;
}
