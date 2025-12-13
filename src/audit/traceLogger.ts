import { TraceEvent, TraceSnapshot, TraceEventType } from "./traceTypes";
import { randomUUID } from "crypto";

export class TraceLogger {
  private readonly traceId: string;
  private readonly events: TraceEvent[] = [];

  constructor(traceId?: string) {
    this.traceId = traceId ?? randomUUID();
  }

  public log(type: TraceEventType, source: string, payload: Record<string, any> = {}): void {
    const event: TraceEvent = {
      timestamp: Date.now(),
      type,
      source,
      payload
    };
    this.events.push(event);
  }

  public snapshot(): TraceSnapshot {
    return {
      traceId: this.traceId,
      events: [...this.events] // immutable copy
    };
  }

  public eventCount(): number {
    return this.events.length;
  }
}
