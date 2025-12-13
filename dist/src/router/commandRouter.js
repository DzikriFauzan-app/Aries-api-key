"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeCommand = routeCommand;
const reasoningEngine_1 = require("../core/reasoningEngine");
const policyEngine_1 = require("../policy/policyEngine");
const memoryStore_1 = require("../memory/memoryStore");
const engine = new reasoningEngine_1.ReasoningEngine();
const policy = new policyEngine_1.PolicyEngine();
const memory = new memoryStore_1.MemoryStore();
async function routeCommand(input) {
    if (!input || input.trim().length === 0) {
        return "ERROR: EMPTY_COMMAND";
    }
    const parts = input.split("::");
    if (parts.length !== 2) {
        return "ERROR: INVALID_COMMAND_FORMAT";
    }
    const command = parts[0].toUpperCase();
    const payload = parts[1].trim();
    try {
        switch (command) {
            case "MEM_WRITE": {
                const kv = payload.split("=");
                if (kv.length !== 2) {
                    return "ERROR: INVALID_MEMORY_FORMAT";
                }
                const key = kv[0].trim();
                const value = kv[1].trim();
                policy.memoryWrite(key, value);
                memory.write(key, value);
                return "MEMORY_WRITE_OK";
            }
            case "MEM_READ": {
                const key = payload.trim();
                policy.memoryRead(key);
                const record = memory.read(key);
                if (!record) {
                    return "MEMORY_NOT_FOUND";
                }
                return record.value;
            }
            case "REASON":
                policy.preExecute(command, payload);
                const outReason = engine.execute("generic_reasoning", payload).finalAnswer;
                policy.postExecute(outReason);
                return outReason;
            case "CHECK":
                policy.preExecute(command, payload);
                const outCheck = engine.execute("consistency_check", payload).finalAnswer;
                policy.postExecute(outCheck);
                return outCheck;
            default:
                return "ERROR: UNKNOWN_COMMAND";
        }
    }
    catch (err) {
        if (err instanceof policyEngine_1.PolicyViolationError) {
            return err.message;
        }
        throw err;
    }
}
