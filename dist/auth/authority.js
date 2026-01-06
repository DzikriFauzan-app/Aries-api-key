"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signPayload = signPayload;
exports.verifyPayload = verifyPayload;
const crypto_1 = require("crypto");
const SECRET = "internal-hmac-secret-dont-leak";
// Sign konten payload (params) + keyId
function signPayload(params, keyId) {
    const content = JSON.stringify(params) + keyId;
    return (0, crypto_1.createHmac)("sha256", SECRET).update(content).digest("hex");
}
function verifyPayload(params, keyId, signature) {
    const expected = signPayload(params, keyId);
    return expected === signature;
}
