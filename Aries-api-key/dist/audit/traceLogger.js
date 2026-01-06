"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceLogger = void 0;
const crypto_1 = require("crypto");
class TraceLogger {
    constructor(traceId) {
        this.events = [];
        this.traceId = traceId ?? (0, crypto_1.randomUUID)();
    }
    log(type, source, payload = {}) {
        const event = {
            timestamp: Date.now(),
            type,
            source,
            payload
        };
        this.events.push(event);
    }
    snapshot() {
        return {
            traceId: this.traceId,
            events: [...this.events] // immutable copy
        };
    }
    eventCount() {
        return this.events.length;
    }
}
exports.TraceLogger = TraceLogger;
