"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceQuota = enforceQuota;
function enforceQuota(used, quota) {
    if (used > quota) {
        throw new Error("QUOTA_EXCEEDED");
    }
}
