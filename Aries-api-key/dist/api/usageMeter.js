"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsage = getUsage;
exports.recordUsage = recordUsage;
const fs_1 = __importDefault(require("fs"));
const USAGE_DB = "data/usage.json";
function load() {
    if (!fs_1.default.existsSync(USAGE_DB)) {
        fs_1.default.writeFileSync(USAGE_DB, "{}");
        return {};
    }
    return JSON.parse(fs_1.default.readFileSync(USAGE_DB, "utf8"));
}
function save(db) {
    fs_1.default.writeFileSync(USAGE_DB, JSON.stringify(db, null, 2));
}
function getUsage(apiKey) {
    const db = load();
    if (!db[apiKey]) {
        db[apiKey] = { used: 0, lastUsedAt: Date.now() };
        save(db);
    }
    return db[apiKey];
}
function recordUsage(apiKey, amount) {
    const db = load();
    if (!db[apiKey]) {
        db[apiKey] = { used: 0, lastUsedAt: Date.now() };
    }
    db[apiKey].used += amount;
    db[apiKey].lastUsedAt = Date.now();
    save(db);
}
