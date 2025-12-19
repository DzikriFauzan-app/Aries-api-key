export type TraceEventType =
  | "COMMAND_RECEIVED"
  | "ROUTED"
  | "REASONING_START"
  | "REASONING_STEP"
  | "POLICY_CHECK"
  | "MEMORY_ACCESS"
  | "OUTPUT_EMITTED"
  | "ERROR";

export interface TraceEvent {
  timestamp: number;          // epoch ms
  type: TraceEventType;
  source: string;             // module name
  payload: Record<string, any>;
}

export interface TraceSnapshot {
  traceId: string;
  events: TraceEvent[];
}
