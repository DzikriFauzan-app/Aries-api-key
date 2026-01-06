"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissionMatrix_1 = require("../policy/permissionMatrix");
const agentPolicyBinder_1 = require("../policy/agentPolicyBinder");
const auditLogger_1 = require("../audit/auditLogger");
const agent_1 = require("../agent/agent");
class TestAgent extends agent_1.Agent {
    async handle(cmd) {
        return cmd;
    }
}
(() => {
    const matrix = new permissionMatrix_1.PermissionMatrix();
    const audit = new auditLogger_1.AuditLogger();
    matrix.register({
        agent: "alpha",
        role: "WORKER",
        allow: ["PING"]
    });
    const binder = new agentPolicyBinder_1.AgentPolicyBinder(matrix, audit);
    const agent = new TestAgent("alpha", "WORKER");
    binder.enforce(agent, "PING");
    let denied = false;
    try {
        binder.enforce(agent, "DELETE");
    }
    catch {
        denied = true;
    }
    if (!denied) {
        throw new Error("POLICY DENIAL FAILED");
    }
    if (audit.all().length !== 1) {
        throw new Error("AUDIT NOT RECORDED");
    }
    console.log("AGENT POLICY BINDER TEST PASSED");
})();
