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
        if (!payload || payload.length === 0) {
            throw new PolicyViolationError("POLICY_DENY: EMPTY_PAYLOAD");
        }
        if (payload.length > 512) {
            throw new PolicyViolationError("POLICY_DENY: PAYLOAD_TOO_LONG");
        }
    }
    postExecute(_output) {
        // reserved for audit / future enforcement
    }
    memoryWrite(key, value) {
        if (!key || !value) {
            throw new PolicyViolationError("POLICY_DENY: INVALID_MEMORY_WRITE");
        }
    }
    memoryRead(key) {
        if (!key || key.length === 0) {
            throw new PolicyViolationError("POLICY_DENY: EMPTY_MEMORY_KEY");
        }
    }
}
exports.PolicyEngine = PolicyEngine;
