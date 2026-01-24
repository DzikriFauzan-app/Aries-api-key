import { AriesEvent, EventHandler } from "./eventTypes";
import { ForensicLogger } from "../forensics/forensicLogger";

export class EventBus {
  private handlers = new Map<string, EventHandler[]>();
  private forensic: ForensicLogger | null = null;

  constructor(
    enableForensics = true,
    private strictMode = false // 🔒 strict = throw, non-strict = isolate
  ) {
    if (enableForensics) {
      this.forensic = new ForensicLogger();
    }
  }

  subscribe(eventType: string, handler: EventHandler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }

  unsubscribe(eventType: string, handler: EventHandler) {
    const list = this.handlers.get(eventType);
    if (!list) return;
    const i = list.indexOf(handler);
    if (i !== -1) list.splice(i, 1);
  }

  listenerCount(eventType: string): number {
    return this.handlers.get(eventType)?.length || 0;
  }

  async publish(event: AriesEvent) {
    // 1. FORENSIC RECORD (IMMUTABLE)
    if (this.forensic) {
      this.forensic.record(event);
    }

    // 2. HANDLER RESOLUTION
    // Support specific event type AND wildcard "*"
    const specific = this.handlers.get(event.type) || [];
    const wildcard = this.handlers.get("*") || [];
    const handlers = [...specific, ...wildcard];

    // 3. FAULT-ISOLATED EXECUTION
    await Promise.all(
      handlers.map(async (handler) => {
        try {
          await handler(event);
        } catch (err: any) {
          // 🔍 Tetap direkam sebagai insiden, tapi tidak crash loop utama
          if (this.forensic) {
            this.forensic.record({
              ...event,
              type: "HANDLER_ERROR",
              payload: {
                originalEvent: event.type,
                error: err?.message || String(err)
              }
            });
          }

          // 🔕 Non-strict (Default): jangan spam log console, cukup di forensic log
          // 🔔 Strict Mode: throw error untuk debugging/CI ketat
          if (this.strictMode) {
            throw err;
          }
        }
      })
    );
  }
}
