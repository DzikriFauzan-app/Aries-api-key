"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingGuard = billingGuard;
const licenseStore_1 = require("./licenseStore");
const usageMeter_1 = require("./usageMeter");
const billingEngine_1 = require("./billingEngine");
function billingGuard(apiKey) {
    const license = (0, licenseStore_1.getLicense)(apiKey);
    if (license.status !== "ACTIVE") {
        throw new Error("LICENSE_INACTIVE");
    }
    const usage = (0, usageMeter_1.getUsage)(apiKey);
    const billing = { used: usage.used, limit: 0 };
    (0, billingEngine_1.applyPlanLimit)(license.plan, billing);
    if (billing.used >= billing.limit) {
        throw new Error("QUOTA_EXCEEDED");
    }
    return {
        plan: license.plan,
        used: billing.used,
        limit: billing.limit
    };
}
