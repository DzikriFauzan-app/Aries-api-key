"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUEST_KEY_DEF = exports.SYSTEM_KEY_DEF = void 0;
exports.SYSTEM_KEY_DEF = {
    id: "sys-root",
    key: "aries-master-key-123",
    owner: "SYSTEM",
    scopes: ["fs.read", "fs.write", "system.exec"],
    maxSeverity: 10
};
exports.GUEST_KEY_DEF = {
    id: "guest-1",
    key: "guest-key",
    owner: "USER",
    scopes: ["fs.read"], // Read only
    maxSeverity: 1
};
