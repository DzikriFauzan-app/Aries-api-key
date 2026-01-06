"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBilling = getBilling;
exports.consumeQuota = consumeQuota;
exports.applyPlanLimit = applyPlanLimit;
const fs_1 = __importDefault(require("fs"));
const BILLING_DB = "data/billing.json";
function loadDB() {
    if (!fs_1.default.existsSync(BILLING_DB))
        return {};
    return JSON.parse(fs_1.default.readFileSync(BILLING_DB, "utf8"));
}
function saveDB(db) {
    fs_1.default.writeFileSync(BILLING_DB, JSON.stringify(db, null, 2));
}
function getBilling(apiKey) {
    const db = loadDB();
    if (!db[apiKey]) {
        db[apiKey] = {
            plan: "FREE",
            used: 0,
            limit: 5000,
            resetAt: Date.now() + 30 * 24 * 3600 * 1000,
            status: "ACTIVE"
        };
        saveDB(db);
    }
    return db[apiKey];
}
function consumeQuota(apiKey) {
    const db = loadDB();
    const rec = getBilling(apiKey);
    if (rec.status !== "ACTIVE") {
        throw new Error(`BILLING_${rec.status}`);
    }
    rec.used += 1;
    if (rec.used > rec.limit) {
        rec.status = "SOFT_BAN";
    }
    db[apiKey] = rec;
    saveDB(db);
    if (rec.status !== "ACTIVE") {
        throw new Error("QUOTA_EXCEEDED");
    }
}
function applyPlanLimit(plan, rec) {
    if (plan === "FREE")
        rec.limit = 5000;
    if (plan === "PRO")
        rec.limit = 100000;
    if (plan === "ENTERPRISE")
        rec.limit = 1000000;
}
