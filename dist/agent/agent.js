"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
class Agent {
    constructor(name, role) {
        this.approvedCommands = new Set();
        this.name = name;
        this.role = role;
    }
    setParent(parent) {
        this.parent = parent;
    }
    approve(command) {
        if (!command) {
            this.approvedCommands.add("*");
            return true;
        }
        this.approvedCommands.add(command);
        return true;
    }
    isApproved(command) {
        if (this.approvedCommands.has("*"))
            return true;
        if (this.approvedCommands.has(command))
            return true;
        if (this.parent)
            return this.parent.isApproved(command);
        return false;
    }
    async handle(command, trusted = false) {
        if (this.role === "WORKER" && !trusted && !this.isApproved(command)) {
            throw new Error("Worker approval failed");
        }
        if (command === "ping")
            return "PONG";
        return `OK:${command}`;
    }
    // ✅ INTERNAL USE ONLY (DSL / REGISTRY)
    async handleDelegated(command) {
        return this.handle(command, true);
    }
}
exports.Agent = Agent;
