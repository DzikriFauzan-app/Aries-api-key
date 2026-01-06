"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogger = void 0;
class AuditLogger {
    constructor() {
        this.events = [];
    }
    log(event) {
        this.events.push(Object.freeze(event));
    }
    all() {
        return this.events;
    }
    byAgent(agent) {
        return this.events.filter(e => e.agent === agent);
    }
}
exports.AuditLogger = AuditLogger;
