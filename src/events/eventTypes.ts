export type CoreEventType =
  | "SYSTEM_START"
  | "SYSTEM_SHUTDOWN"
  | "AGENT_COMMAND"
  | "AGENT_RESPONSE"
  | "TASK_ASSIGNED"
  | "TASK_APPROVED"
  | "TASK_REJECTED";

export type SystemEventType =
  | "AUDIT_LOG"
  | "*";

export type EventType = CoreEventType | SystemEventType;

export type AriesEvent = {
  id: string;
  type: EventType;
  source: string;
  timestamp: number;
  correlationId?: string;
  payload: unknown;
};

export type EventHandler = (event: AriesEvent) => Promise<void>;
