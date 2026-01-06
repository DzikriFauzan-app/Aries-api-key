"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLicense = getLicense;
const fs_1 = __importDefault(require("fs"));
const LICENSE_DB = "data/licenses.json";
function getLicense(apiKey) {
    if (!fs_1.default.existsSync(LICENSE_DB)) {
        fs_1.default.writeFileSync(LICENSE_DB, JSON.stringify({}, null, 2));
    }
    const db = JSON.parse(fs_1.default.readFileSync(LICENSE_DB, "utf8"));
    if (!db[apiKey]) {
        db[apiKey] = {
            plan: "FREE",
            status: "ACTIVE",
            createdAt: Date.now()
        };
        fs_1.default.writeFileSync(LICENSE_DB, JSON.stringify(db, null, 2));
    }
    return db[apiKey];
}
