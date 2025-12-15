/**
 * TYPE DEFINITIONS FINAL (Step 17)
 * Mencakup seluruh siklus hidup: Gateway -> Reasoning -> FEAC -> Executor
 */

// 1. Core Events (Bisnis Logic)
export type CoreEventType =
  | "SYSTEM_START"
  | "SYSTEM_SHUTDOWN"
  | "AGENT_COMMAND"      // Gateway -> Reasoning
  | "AGENT_RESPONSE"     // Reasoning -> Gateway / Translator
  | "TASK_ASSIGNED"      // Reasoning -> FEAC
  | "TASK_APPROVED"      // FEAC -> Executor (WAJIB ADA)
  | "TASK_REJECTED"      // FEAC -> Reasoning
  | "TASK_COMPLETED"     // Executor -> System (WAJIB ADA)
  | "TASK_FAILED";       // Executor -> System (WAJIB ADA)

// 2. System Events (Wildcard & Audit)
export type SystemEventType =
  | "AUDIT_LOG"
  | "*";                 // Wildcard untuk Listener (bukan untuk emit)

// Union Type Final
export type EventType = CoreEventType | SystemEventType;

// Event Interface
export interface AriesEvent {
  id: string;
  type: EventType;
  source: string;
  timestamp: number;
  correlationId?: string;
  payload: any; // Kita pakai 'any' agar fleksibel di coding, strict di runtime check
}

// Export Handler Type yang tadi hilang
export type EventHandler = (event: AriesEvent) => Promise<void>;
