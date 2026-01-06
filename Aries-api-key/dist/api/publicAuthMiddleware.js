"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicAuth = publicAuth;
const fs_1 = __importDefault(require("fs"));
const licenseStore_1 = require("./licenseStore");
const usageMeter_1 = require("./usageMeter");
const billingEngine_1 = require("./billingEngine");
const KEY_DB = "data/api_keys.json";
function loadKeys() {
    if (!fs_1.default.existsSync(KEY_DB))
        return [];
    return JSON.parse(fs_1.default.readFileSync(KEY_DB, "utf8"));
}
function publicAuth(req, res, next) {
    const apiKey = req.headers["x-aries-key"];
    if (!apiKey) {
        return res.status(401).json({ error: "API_KEY_REQUIRED" });
    }
    const keys = loadKeys();
    const rec = keys.find((k) => k.key === apiKey);
    if (!rec) {
        return res.status(403).json({ error: "API_KEY_INVALID" });
    }
    /** LICENSE CHECK */
    const license = (0, licenseStore_1.getLicense)(apiKey);
    if (license.status !== "ACTIVE") {
        return res.status(403).json({ error: "LICENSE_INACTIVE" });
    }
    /** BILLING LIMIT */
    const billing = { limit: rec.quota || 0 };
    (0, billingEngine_1.applyPlanLimit)(license.plan, billing);
    /** USAGE CHECK (HARD BLOCK) */
    const usage = (0, usageMeter_1.getUsage)(apiKey);
    if (usage.used >= billing.limit) {
        return res.status(429).json({
            error: "QUOTA_EXCEEDED",
            used: usage.used,
            limit: billing.limit
        });
    }
    /** ATTACH CONTEXT */
    req.apiKey = apiKey;
    req.billing = billing;
    req.usage = usage;
    next();
}
