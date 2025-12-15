"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
    constructor() {
        this.subscribers = new Map();
    }
    subscribe(type, handler) {
        const handlers = this.subscribers.get(type) || [];
        if (!handlers.includes(handler)) {
            handlers.push(handler);
            this.subscribers.set(type, handlers);
        }
    }
    unsubscribe(type, handler) {
        const handlers = this.subscribers.get(type);
        if (!handlers)
            return;
        const idx = handlers.indexOf(handler);
        if (idx >= 0)
            handlers.splice(idx, 1);
        if (handlers.length === 0)
            this.subscribers.delete(type);
    }
    listenerCount(type) {
        return this.subscribers.get(type)?.length || 0;
    }
    async publish(event) {
        const specific = this.subscribers.get(event.type) || [];
        const wildcard = this.subscribers.get("*") || [];
        const all = [...specific, ...wildcard];
        await Promise.allSettled(all.map(async (h) => {
            try {
                await h(event);
            }
            catch (err) {
                console.error(`[EventBus] CRITICAL ERROR on handler for ${event.type}:`, err);
            }
        }));
    }
}
exports.EventBus = EventBus;
