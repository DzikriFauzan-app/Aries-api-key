import { AriesEvent, EventHandler } from "./eventTypes";
import { ForensicLogger } from "../forensics/forensicLogger";

export class EventBus {
  private handlers = new Map<string, EventHandler[]>();
  private forensic: ForensicLogger | null = null;

  constructor(enableForensics = true) {
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
    if (!this.handlers.has(eventType)) return;
    
    const handlers = this.handlers.get(eventType)!;
    const index = handlers.indexOf(handler);
    
    if (index !== -1) {
      handlers.splice(index, 1);
    }
  }

  listenerCount(eventType: string): number {
    return this.handlers.get(eventType)?.length || 0;
  }

  async publish(event: AriesEvent) {
    // 1. REKAM FORENSIK (Jika aktif)
    if (this.forensic) {
      this.forensic.record(event);
    }

    // 2. GABUNGKAN HANDLER SPESIFIK DAN WILDCARD (*)
    const specificHandlers = this.handlers.get(event.type) || [];
    const wildcardHandlers = this.handlers.get("*") || [];
    const allHandlers = [...specificHandlers, ...wildcardHandlers];

    // 3. EKSEKUSI HANDLER
    await Promise.all(
      allHandlers.map(async (handler) => {
        try {
          await handler(event);
        } catch (error) {
          console.error(
            "[EventBus] CRITICAL ERROR on handler for " + event.type + ":",
            error
          );
        }
      })
    );
  }
}