export type EventType =
  // Core Lifecycle
  | "SYSTEM_START"
  | "SYSTEM_ERROR"
  | "TEST_EVT"
  | "TEST_EMPTY"
  
  // Agent / Task Flow
  | "AGENT_COMMAND"
  | "AGENT_RESPONSE"
  | "TASK_ASSIGNED"
  | "TASK_APPROVED"
  | "TASK_REJECTED"
  | "TASK_COMPLETED"
  | "TASK_FAILED"
  
  // LLM & Reasoning
  | "LLM_REQUEST"
  | "LLM_RESPONSE"
  | "LLM_REASONING_START"
  | "LLM_REASONING_COMPLETE"
  | "GATEWAY_REQUEST"
  
  // Memory Operations
  | "MEMORY_READ"
  | "MEMORY_WRITE"
  | "MEMORY_RESULT"
  | "MEMORY_DENIED"
  
  // Security & Audit
  | "AUDIT_LOG"
  | "SEC_VIOLATION";

export interface AriesEvent {
  id: string;
  type: EventType;
  source: string;
  timestamp: number;
  payload: any;
  correlationId?: string; // Restore correlationId (Optional)
  signature?: string;     // Security signature (Optional)
}

export type EventHandler = (event: AriesEvent) => Promise<void>;
