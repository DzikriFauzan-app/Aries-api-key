"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTenant = resolveTenant;
function resolveTenant(apiKey) {
    return {
        tenantId: "tenant-" + apiKey.slice(-12),
        memoryNamespace: "mem-" + apiKey.slice(-12),
        usageNamespace: "usage-" + apiKey.slice(-12)
    };
}
