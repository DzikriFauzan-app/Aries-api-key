/**
 * TYPE DEFINITIONS FINAL (Step 20)
 */

// 1. Core Events (Bisnis Logic)
export type CoreEventType =
  | "SYSTEM_START"
  | "SYSTEM_SHUTDOWN"
  | "AGENT_COMMAND"
  | "AGENT_RESPONSE"
  | "TASK_ASSIGNED"
  | "TASK_APPROVED"
  | "TASK_REJECTED"
  | "TASK_COMPLETED"
  | "TASK_FAILED"
  | "MEMORY_READ"    // NEW
  | "MEMORY_WRITE"   // NEW
  | "MEMORY_RESULT"  // NEW
  | "MEMORY_DENIED"; // NEW

// 2. System Events (Wildcard & Audit)
export type SystemEventType =
  | "AUDIT_LOG"
  | "*";

export type EventType = CoreEventType | SystemEventType;

export interface AriesEvent {
  id: string;
  type: EventType;
  source: string;
  timestamp: number;
  correlationId?: string;
  payload: any;
}

export type EventHandler = (event: AriesEvent) => Promise<void>;
