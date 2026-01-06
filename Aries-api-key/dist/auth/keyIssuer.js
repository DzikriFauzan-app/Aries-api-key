"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueKey = issueKey;
const crypto_1 = __importDefault(require("crypto"));
const keyStore_1 = require("./keyStore");
function issueKey(owner, scopes) {
    const key = "aries-" + crypto_1.default.randomBytes(16).toString("hex");
    (0, keyStore_1.storeKey)({
        key,
        owner,
        scopes,
        createdAt: Date.now()
    });
    return key;
}
