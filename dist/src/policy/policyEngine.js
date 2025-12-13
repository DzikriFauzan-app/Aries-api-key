"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyEngine = exports.PolicyViolationError = void 0;
class PolicyViolationError extends Error {
    constructor(message) {
        super(message);
        this.name = "PolicyViolationError";
    }
}
exports.PolicyViolationError = PolicyViolationError;
class PolicyEngine {
    preExecute(command, payload) {
        if (!payload || payload.trim().length === 0) {
            throw new PolicyViolationError("POLICY_DENY: EMPTY_PAYLOAD");
        }
        if (payload.length > 500) {
            throw new PolicyViolationError("POLICY_DENY: PAYLOAD_TOO_LONG");
        }
    }
    postExecute(output) {
        if (!output || output.trim().length === 0) {
            throw new PolicyViolationError("POLICY_DENY: EMPTY_OUTPUT");
        }
        if (!output.startsWith("ANSWER(")) {
            throw new PolicyViolationError("POLICY_DENY: INVALID_OUTPUT_FORMAT");
        }
    }
    // MEMORY POLICIES
    memoryWrite(key, value) {
        if (!key || key.trim().length === 0) {
            throw new PolicyViolationError("POLICY_DENY: EMPTY_MEMORY_KEY");
        }
        if (!value || value.trim().length === 0) {
            throw new PolicyViolationError("POLICY_DENY: EMPTY_MEMORY_VALUE");
        }
        if (value.length > 1000) {
            throw new PolicyViolationError("POLICY_DENY: MEMORY_VALUE_TOO_LONG");
        }
    }
    memoryRead(key) {
        if (!key || key.trim().length === 0) {
            throw new PolicyViolationError("POLICY_DENY: EMPTY_MEMORY_KEY");
        }
    }
}
exports.PolicyEngine = PolicyEngine;
