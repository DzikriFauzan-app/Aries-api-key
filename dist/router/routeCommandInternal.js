"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeCommandInternal = routeCommandInternal;
const auditLogger_1 = require("../audit/auditLogger");
const routeCommand_1 = require("./routeCommand");
async function routeCommandInternal(input, memory) {
    const audit = new auditLogger_1.AuditLogger();
    // Memenuhi kontrak AuditEvent: ts, agent, role
    audit.log({
        ts: Date.now(),
        agent: "ARIES_CORE",
        role: "SYSTEM",
        type: "INFO",
        action: `COMMAND_RECEIVED: ${input}`
    });
    const result = await (0, routeCommand_1.dispatchCommand)({
        input,
        memory,
        bus: null
    });
    audit.log({
        ts: Date.now(),
        agent: "ARIES_CORE",
        role: "SYSTEM",
        type: "INFO",
        action: `COMMAND_EXECUTED`
    });
    return result;
}
