export type TraceEvent = {
  step: string;
  detail: string;
};

export class TraceLogger {
  private traces: TraceEvent[] = [];

  log(step: string, detail: string) {
    // ❌ NO TIMESTAMP
    // ❌ NO RANDOM ID
    this.traces.push({ step, detail });
  }

  snapshot(): TraceEvent[] {
    // RETURN COPY — deterministic
    return this.traces.map(t => ({ step: t.step, detail: t.detail }));
  }

  reset() {
    this.traces = [];
  }
}
