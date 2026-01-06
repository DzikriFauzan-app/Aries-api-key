"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadKeys = loadKeys;
exports.saveKeys = saveKeys;
exports.recordUsage = recordUsage;
exports.getUsage = getUsage;
const fs_1 = __importDefault(require("fs"));
const KEY_DB = "data/api_keys.json";
const USAGE_DB = "data/api_usage.json";
function loadKeys() {
    return fs_1.default.existsSync(KEY_DB)
        ? JSON.parse(fs_1.default.readFileSync(KEY_DB, "utf8"))
        : [];
}
function saveKeys(keys) {
    fs_1.default.writeFileSync(KEY_DB, JSON.stringify(keys, null, 2));
}
function recordUsage(key, tokens = 1) {
    const usage = fs_1.default.existsSync(USAGE_DB)
        ? JSON.parse(fs_1.default.readFileSync(USAGE_DB, "utf8"))
        : {};
    usage[key] = usage[key] || { count: 0, tokens: 0 };
    usage[key].count += 1;
    usage[key].tokens += tokens;
    fs_1.default.writeFileSync(USAGE_DB, JSON.stringify(usage, null, 2));
    return usage[key];
}
function getUsage(key) {
    if (!fs_1.default.existsSync(USAGE_DB))
        return null;
    const usage = JSON.parse(fs_1.default.readFileSync(USAGE_DB, "utf8"));
    return usage[key] || null;
}
