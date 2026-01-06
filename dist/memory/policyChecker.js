"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyChecker = void 0;
const governanceLaw_1 = require("./governanceLaw");
const localQuota_1 = require("./localQuota");
const localSovereign_1 = require("./localSovereign");
class PolicyChecker {
    /**
     * Validasi apakah user diijinkan untuk mengirim pesan baru
     */
    static async canChat(plan, level = 1) {
        const policy = plan.startsWith('ENTERPRISE') ? (0, governanceLaw_1.getPlanByLevel)(level) : governanceLaw_1.ARIES_LAWS[plan];
        // Cek kuota harian (Reset 00:00 diatur di dalam LocalQuotaManager)
        const quota = await localQuota_1.LocalQuotaManager.checkAndIncrement(policy.dailyChatLimit);
        if (!quota.allowed) {
            return {
                allowed: false,
                message: `Limit chat harian (${policy.dailyChatLimit}) tercapai. Upgrade atau tunggu reset pukul 00:00.`
            };
        }
        return { allowed: true, message: "Authorized" };
    }
    /**
     * Validasi apakah masih ada slot untuk memori permanen
     */
    static canSaveMemory(plan, level = 1) {
        const policy = plan.startsWith('ENTERPRISE') ? (0, governanceLaw_1.getPlanByLevel)(level) : governanceLaw_1.ARIES_LAWS[plan];
        const currentMemoryCount = localSovereign_1.LocalSovereignStorage.getCount();
        return currentMemoryCount < policy.maxExplicitMemory;
    }
}
exports.PolicyChecker = PolicyChecker;
