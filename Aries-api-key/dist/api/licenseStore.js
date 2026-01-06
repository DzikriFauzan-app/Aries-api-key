"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLicense = getLicense;
exports.setLicense = setLicense;
const fs_1 = __importDefault(require("fs"));
const LICENSE_DB = "data/licenses.json";
function load() {
    if (!fs_1.default.existsSync(LICENSE_DB))
        return {};
    return JSON.parse(fs_1.default.readFileSync(LICENSE_DB, "utf8"));
}
function save(db) {
    fs_1.default.writeFileSync(LICENSE_DB, JSON.stringify(db, null, 2));
}
function getLicense(apiKey) {
    const db = load();
    if (!db[apiKey]) {
        db[apiKey] = {
            plan: "FREE",
            status: "ACTIVE",
            startedAt: Date.now(),
            expiresAt: Date.now() + 30 * 24 * 3600 * 1000
        };
        save(db);
    }
    return db[apiKey];
}
function setLicense(apiKey, plan) {
    const db = load();
    db[apiKey] = {
        plan,
        status: "ACTIVE",
        startedAt: Date.now(),
        expiresAt: plan === "FREE"
            ? Date.now() + 30 * 24 * 3600 * 1000
            : Date.now() + 365 * 24 * 3600 * 1000
    };
    save(db);
}
