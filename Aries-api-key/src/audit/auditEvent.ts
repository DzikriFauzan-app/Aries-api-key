export type AuditEventType =
  | "AGENT_COMMAND"
  | "TOOL_INVOKE"
  | "POLICY_DENY";

export interface AuditEvent {
  readonly ts: number;
  readonly type: AuditEventType;
  readonly agent: string;
  readonly role: string;
  readonly action: string;
  readonly detail?: string;
}
