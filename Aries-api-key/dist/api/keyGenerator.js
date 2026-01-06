"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiKey = generateApiKey;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const KEY_DB = "data/api_keys.json";
function generateApiKey(owner, scopes) {
    const key = {
        key: "aries-" + crypto_1.default.randomBytes(20).toString("hex"),
        owner,
        scopes,
        quota: 100000,
        createdAt: Date.now()
    };
    const db = fs_1.default.existsSync(KEY_DB)
        ? JSON.parse(fs_1.default.readFileSync(KEY_DB, "utf8"))
        : [];
    db.push(key);
    fs_1.default.writeFileSync(KEY_DB, JSON.stringify(db, null, 2));
    return key;
}
