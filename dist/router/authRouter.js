"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthStatus = void 0;
const keyRegistry_1 = require("../auth/keyRegistry");
const registry = new keyRegistry_1.KeyRegistry();
const checkAuthStatus = (apiKey) => {
    const keyData = registry.validate(apiKey);
    if (keyData && keyData.role === 'OWNER') {
        return {
            status: "AUTHORIZED",
            role: keyData.role,
            owner: keyData.owner,
            permissions: keyData.scopes,
            message: `Welcome, Sovereign Owner ${keyData.owner}`
        };
    }
    return {
        status: "UNAUTHORIZED",
        role: "GUEST",
        message: "Invalid or insufficient Key"
    };
};
exports.checkAuthStatus = checkAuthStatus;
