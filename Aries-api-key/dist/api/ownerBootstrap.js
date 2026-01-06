"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapOwner = bootstrapOwner;
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const OWNER_FILE = "data/owner.key.json";
function bootstrapOwner() {
    if (fs_1.default.existsSync(OWNER_FILE)) {
        return JSON.parse(fs_1.default.readFileSync(OWNER_FILE, "utf8"));
    }
    const ownerKey = {
        key: "aries-owner-" + crypto_1.default.randomBytes(24).toString("hex"),
        role: "OWNER",
        scopes: ["*"],
        createdAt: Date.now()
    };
    fs_1.default.mkdirSync("data", { recursive: true });
    fs_1.default.writeFileSync(OWNER_FILE, JSON.stringify(ownerKey, null, 2));
    return ownerKey;
}
