"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAN_CONFIGS = void 0;
exports.getPlanLimit = getPlanLimit;
exports.PLAN_CONFIGS = {
    "FREE": { userQuota: 1, maxIpSlots: 1, verifierRole: "SELF" },
    "PRO": { userQuota: 1, maxIpSlots: 2, verifierRole: "PRIMARY_DEVICE" },
    "ENTERPRISE_1": { userQuota: 50, maxIpSlots: 15, verifierRole: "MANAGER" },
    "ENTERPRISE_2": { userQuota: 75, maxIpSlots: 15, verifierRole: "MANAGER" },
    "ENTERPRISE_3": { userQuota: 100, maxIpSlots: 15, verifierRole: "MANAGER" },
    "ENTERPRISE_4": { userQuota: 125, maxIpSlots: 15, verifierRole: "MANAGER" },
    "ENTERPRISE_5": { userQuota: 150, maxIpSlots: 15, verifierRole: "MANAGER" },
    "ENTERPRISE_6": { userQuota: 175, maxIpSlots: 15, verifierRole: "MANAGER" },
    "ENTERPRISE_7": { userQuota: 200, maxIpSlots: 15, verifierRole: "MANAGER" },
    "ENTERPRISE_8": { userQuota: 225, maxIpSlots: 15, verifierRole: "MANAGER" },
    "ENTERPRISE_9": { userQuota: 250, maxIpSlots: 15, verifierRole: "MANAGER" },
    "ENTERPRISE_10": { userQuota: 275, maxIpSlots: 15, verifierRole: "MANAGER" },
    "PLATINUM": { userQuota: 500, maxIpSlots: 30, verifierRole: "DIRECTOR/STAFF_HIGH" }
};
function getPlanLimit(plan) {
    return exports.PLAN_CONFIGS[plan] || exports.PLAN_CONFIGS["FREE"];
}
