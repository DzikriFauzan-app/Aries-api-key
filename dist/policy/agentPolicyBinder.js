"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentPolicyBinder = void 0;
class AgentPolicyBinder {
    constructor(matrix, audit) {
        this.matrix = matrix;
        this.audit = audit;
    }
    enforce(agent, command) {
        const allowed = this.matrix.isAllowed(agent.name, agent.role, command);
        if (!allowed) {
            this.audit.log({
                ts: Date.now(),
                type: "POLICY_DENY",
                agent: agent.name,
                role: agent.role,
                action: command
            });
            throw new Error("POLICY DENIED");
        }
    }
}
exports.AgentPolicyBinder = AgentPolicyBinder;
