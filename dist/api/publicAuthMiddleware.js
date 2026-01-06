"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicAuth = publicAuth;
const fs_1 = __importDefault(require("fs"));
const licenseStore_1 = require("./licenseStore");
const KEY_DB = "data/api_keys.json";
function publicAuth(req, res, next) {
    const apiKey = req.headers["x-aries-key"];
    if (!apiKey) {
        return res.status(401).json({ error: "API_KEY_REQUIRED" });
    }
    if (!fs_1.default.existsSync(KEY_DB)) {
        return res.status(401).json({ error: "API_KEY_DB_MISSING" });
    }
    const keys = JSON.parse(fs_1.default.readFileSync(KEY_DB, "utf8"));
    const record = keys.find((k) => k.key === apiKey);
    if (!record) {
        return res.status(403).json({ error: "INVALID_API_KEY" });
    }
    const license = (0, licenseStore_1.getLicense)(apiKey);
    req.apiKey = apiKey;
    req.plan = license.plan;
    next();
}
