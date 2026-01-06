"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = consume;
const fs_1 = __importDefault(require("fs"));
const USAGE_DB = "data/usage.json";
function load() {
    if (!fs_1.default.existsSync(USAGE_DB))
        return [];
    return JSON.parse(fs_1.default.readFileSync(USAGE_DB, "utf8"));
}
function save(db) {
    fs_1.default.writeFileSync(USAGE_DB, JSON.stringify(db, null, 2));
}
function consume(key, cost = 1) {
    const db = load();
    let rec = db.find(r => r.key === key);
    if (!rec) {
        rec = { key, used: 0, updatedAt: Date.now() };
        db.push(rec);
    }
    rec.used += cost;
    rec.updatedAt = Date.now();
    save(db);
    return rec.used;
}
