"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceMemoryPolicy = enforceMemoryPolicy;
const memoryPolicy_1 = require("./memoryPolicy");
function enforceMemoryPolicy(plan, action, currentSize) {
    const policy = memoryPolicy_1.MEMORY_POLICY[plan];
    if (action === "WRITE" && !policy.write) {
        throw new Error("MEMORY_WRITE_FORBIDDEN");
    }
    if (currentSize >= policy.maxRecords) {
        throw new Error("MEMORY_LIMIT_EXCEEDED");
    }
}
