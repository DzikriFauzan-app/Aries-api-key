"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
const forensicLogger_1 = require("../forensics/forensicLogger");
class EventBus {
    constructor(enableForensics = true) {
        this.handlers = new Map();
        this.forensic = null;
        if (enableForensics) {
            this.forensic = new forensicLogger_1.ForensicLogger();
        }
    }
    subscribe(eventType, handler) {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, []);
        }
        this.handlers.get(eventType).push(handler);
    }
    unsubscribe(eventType, handler) {
        if (!this.handlers.has(eventType))
            return;
        const handlers = this.handlers.get(eventType);
        const index = handlers.indexOf(handler);
        if (index !== -1) {
            handlers.splice(index, 1);
        }
    }
    listenerCount(eventType) {
        return this.handlers.get(eventType)?.length || 0;
    }
    async publish(event) {
        // 1. REKAM FORENSIK (Jika aktif)
        if (this.forensic) {
            this.forensic.record(event);
        }
        // 2. GABUNGKAN HANDLER SPESIFIK DAN WILDCARD (*)
        const specificHandlers = this.handlers.get(event.type) || [];
        const wildcardHandlers = this.handlers.get("*") || [];
        const allHandlers = [...specificHandlers, ...wildcardHandlers];
        // 3. EKSEKUSI HANDLER
        await Promise.all(allHandlers.map(async (handler) => {
            try {
                await handler(event);
            }
            catch (error) {
                console.error("[EventBus] CRITICAL ERROR on handler for " + event.type + ":", error);
            }
        }));
    }
}
exports.EventBus = EventBus;
