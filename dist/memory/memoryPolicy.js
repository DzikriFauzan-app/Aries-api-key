"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceMemoryPolicy = enforceMemoryPolicy;
function enforceMemoryPolicy(payload, sessionId) {
    // 1. Cek Authority Dasar
    if (!payload.authority?.signature) {
        throw new Error("Unsigned memory access");
    }
    // 2. Cek Session Boundary
    // Memory Session tidak boleh menyeberang ke Session ID lain
    if (payload.scope === "SESSION") {
        if (!payload.key.startsWith(sessionId + ":")) {
            throw new Error(`Session boundary violation: Key ${payload.key} outside session ${sessionId}`);
        }
    }
    return true;
}
