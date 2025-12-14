"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeCommand = routeCommand;
const reasoningEngine_1 = require("../core/reasoningEngine");
const policyEngine_1 = require("../policy/policyEngine");
async function routeCommand(input, memory) {
    // === HARD SHORT-CIRCUIT (CONTRACT LOCK) ===
    if (input === "PING") {
        return "PONG";
    }
    if (!input || input.trim().length === 0) {
        return "ERROR: EMPTY_COMMAND";
    }
    const parts = input.split("::");
    const command = parts[0];
    const payload = parts[1] ?? "";
    const policy = new policyEngine_1.PolicyEngine();
    const engine = new reasoningEngine_1.ReasoningEngine();
    try {
        switch (command) {
            case "MEM_WRITE": {
                const [k, v] = payload.split("=");
                policy.memoryWrite(k, v);
                memory.write(k, v);
                return "MEMORY_WRITE_OK";
            }
            case "MEM_READ": {
                policy.memoryRead(payload);
                const rec = memory.read(payload);
                return rec ? rec.value : "MEMORY_NOT_FOUND";
            }
            case "REASON": {
                policy.preExecute(command, payload);
                const out = engine.execute("generic_reasoning", payload).finalAnswer;
                policy.postExecute(out);
                return out;
            }
            case "CHECK": {
                policy.preExecute(command, payload);
                const out = engine.execute("consistency_check", payload).finalAnswer;
                policy.postExecute(out);
                return out;
            }
            default:
                return "ERROR: UNKNOWN_COMMAND";
        }
    }
    catch (err) {
        return err?.message ?? "ERROR";
    }
}
