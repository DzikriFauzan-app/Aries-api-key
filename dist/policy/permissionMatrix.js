"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionMatrix = void 0;
class PermissionMatrix {
    constructor() {
        this.rules = [];
    }
    register(rule) {
        this.rules.push(rule);
    }
    isAllowed(agent, role, command) {
        return this.rules.some(r => r.agent === agent &&
            r.role === role &&
            r.allow.includes(command));
    }
}
exports.PermissionMatrix = PermissionMatrix;
