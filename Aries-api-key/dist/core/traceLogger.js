"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceLogger = void 0;
class TraceLogger {
    constructor() {
        this.traces = [];
    }
    log(step, detail) {
        // ❌ NO TIMESTAMP
        // ❌ NO RANDOM ID
        this.traces.push({ step, detail });
    }
    snapshot() {
        // RETURN COPY — deterministic
        return this.traces.map(t => ({ step: t.step, detail: t.detail }));
    }
    reset() {
        this.traces = [];
    }
}
exports.TraceLogger = TraceLogger;
