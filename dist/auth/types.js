"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUEST_KEY_DEF = exports.SYSTEM_KEY_DEF = void 0;
exports.SYSTEM_KEY_DEF = {
    id: "SOVEREIGN_OWNER",
    key: "aries-owner-33d7d4d4224cdb40b0aef205b64f76414efb2f9bc70ee1f1",
    owner: "Dzikri Fauzan",
    role: "OWNER",
    scopes: ["fs.read", "fs.write", "system.exec", "network.all"],
    maxSeverity: 10
};
exports.GUEST_KEY_DEF = {
    id: "guest-1",
    key: "guest-key",
    owner: "GUEST",
    role: "GUEST",
    scopes: ["fs.read"],
    maxSeverity: 1
};
