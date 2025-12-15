import { AuditEvent } from "./auditEvent";

export class AuditLogger {
  private events: AuditEvent[] = [];

  log(event: AuditEvent): void {
    this.events.push(Object.freeze(event));
  }

  all(): readonly AuditEvent[] {
    return this.events;
  }

  byAgent(agent: string): readonly AuditEvent[] {
    return this.events.filter(e => e.agent === agent);
  }
}
