"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceQuota = enforceQuota;
const apiKeyStore_1 = require("./apiKeyStore");
function enforceQuota(apiKey, tokens = 1) {
    const usage = (0, apiKeyStore_1.recordUsage)(apiKey.key, tokens);
    if (apiKey.banned === "HARD") {
        throw new Error("API_KEY_HARD_BANNED");
    }
    if (apiKey.banned === "SOFT") {
        throw new Error("API_KEY_SOFT_BANNED");
    }
    if (usage.tokens > apiKey.quota) {
        throw new Error("API_QUOTA_EXCEEDED");
    }
    return true;
}
