"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePublicRequest = handlePublicRequest;
const rateLimiter_1 = require("../governance/rateLimiter");
const usageMeter_1 = require("../governance/usageMeter");
const quotaGuard_1 = require("../governance/quotaGuard");
const fs_1 = __importDefault(require("fs"));
function handlePublicRequest(apiKey, input) {
    // 1. Validasi Key ada di DB
    const db = JSON.parse(fs_1.default.readFileSync("data/api_keys.json", "utf8"));
    const keyData = db.find((k) => k.key === apiKey);
    if (!keyData)
        return { error: "INVALID_API_KEY", status: 401 };
    try {
        // 2. Rate Limit Check (60s window)
        if (!(0, rateLimiter_1.checkRate)(apiKey))
            return { error: "RATE_LIMIT_EXCEEDED", status: 429 };
        // 3. Usage & Quota Check
        const used = (0, usageMeter_1.consume)(apiKey, 1); // Cost 1 per request
        (0, quotaGuard_1.enforceQuota)(used, keyData.quota);
        return {
            status: 200,
            result: `Aries processed: ${input}`,
            usage: used,
            remaining: keyData.quota - used
        };
    }
    catch (e) {
        return { error: e.message, status: 403 };
    }
}
