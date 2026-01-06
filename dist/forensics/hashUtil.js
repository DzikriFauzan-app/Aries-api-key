"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPayload = hashPayload;
const crypto_1 = __importDefault(require("crypto"));
function hashPayload(payload) {
    // Jika payload undefined/null, anggap object kosong atau string kosong
    const data = payload === undefined || payload === null
        ? ""
        : JSON.stringify(payload);
    return crypto_1.default
        .createHash("sha256")
        .update(data)
        .digest("hex");
}
