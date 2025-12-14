"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const agentTypes_1 = require("./agentTypes");
class Agent {
    constructor(name, role, parent) {
        this.name = name;
        this.role = role;
        this.parent = parent;
    }
    canApprove() {
        return agentTypes_1.ROLE_PERMISSIONS[this.role].canApprove;
    }
    canExecute() {
        return agentTypes_1.ROLE_PERMISSIONS[this.role].canExecute;
    }
    approve() {
        if (this.canApprove())
            return true;
        if (!this.parent)
            return false;
        return this.parent.approve();
    }
    async handle(command) {
        if (!this.canExecute()) {
            return { status: "DENIED", agent: this.name };
        }
        if (command.toLowerCase() === "ping")
            return "PONG";
        return { status: "UNKNOWN", command };
    }
}
exports.Agent = Agent;
