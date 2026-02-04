/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


export interface AriesEvent {
  type: string;
  source: string;
  payload: any;
  timestamp: number;
  id?: string;
  correlationId?: string;
}

export enum EventType {
  LEARNING_ENABLED = "LEARNING_ENABLED",
  LEARNING_COMMITTED = "LEARNING_COMMITTED",
  BUG_REPORTED = "BUG_REPORTED",
  AUTO_REPAIR_TRIGGERED = "AUTO_REPAIR_TRIGGERED",
  INTERNAL_UPDATE = "INTERNAL_UPDATE"
}
