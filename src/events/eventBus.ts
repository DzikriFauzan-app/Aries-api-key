import { AriesEvent, EventHandler, EventType } from "./eventTypes";

export class EventBus {
  private subscribers = new Map<EventType, EventHandler[]>();

  subscribe(type: EventType, handler: EventHandler): void {
    const handlers = this.subscribers.get(type) || [];
    if (!handlers.includes(handler)) {
      handlers.push(handler);
      this.subscribers.set(type, handlers);
    }
  }

  unsubscribe(type: EventType, handler: EventHandler): void {
    const handlers = this.subscribers.get(type);
    if (!handlers) return;
    const idx = handlers.indexOf(handler);
    if (idx >= 0) handlers.splice(idx, 1);
    if (handlers.length === 0) this.subscribers.delete(type);
  }

  listenerCount(type: EventType): number {
    return this.subscribers.get(type)?.length || 0;
  }

  async publish(event: AriesEvent): Promise<void> {
    const specific = this.subscribers.get(event.type) || [];
    const wildcard = this.subscribers.get("*") || [];
    const all = [...specific, ...wildcard];

    await Promise.allSettled(
      all.map(async (h) => {
        try {
          await h(event);
        } catch (err) {
          console.error(
            `[EventBus] CRITICAL ERROR on handler for ${event.type}:`,
            err
          );
        }
      })
    );
  }
}
