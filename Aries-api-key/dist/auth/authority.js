"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthority = verifyAuthority;
const keyStore_1 = require("./keyStore");
function verifyAuthority(apiKey) {
    if (!apiKey) {
        return { allowed: false };
    }
    const record = (0, keyStore_1.findKey)(apiKey);
    if (!record) {
        return { allowed: false };
    }
    return {
        allowed: true,
        scopes: record.scopes,
        keyId: record.key
    };
}
