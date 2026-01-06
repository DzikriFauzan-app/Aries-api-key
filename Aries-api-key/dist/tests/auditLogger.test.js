"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auditLogger_1 = require("../audit/auditLogger");
(() => {
    const log = new auditLogger_1.AuditLogger();
    log.log({
        ts: Date.now(),
        type: "AGENT_COMMAND",
        agent: "alpha",
        role: "WORKER",
        action: "PING"
    });
    const events = log.all();
    if (events.length !== 1) {
        throw new Error("AUDIT LOGGER FAILED");
    }
    console.log("AUDIT LOGGER TEST PASSED");
})();
