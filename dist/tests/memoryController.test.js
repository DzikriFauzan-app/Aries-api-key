"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memoryStore_1 = require("../memory/memoryStore");
const memoryController_1 = require("../memory/memoryController");
const permissionMatrix_1 = require("../policy/permissionMatrix");
const agentPolicyBinder_1 = require("../policy/agentPolicyBinder");
const auditLogger_1 = require("../audit/auditLogger");
const agent_1 = require("../agent/agent");
class TestAgent extends agent_1.Agent {
    async handle() {
        return "";
    }
}
(() => {
    const store = new memoryStore_1.MemoryStore();
    const audit = new auditLogger_1.AuditLogger();
    const matrix = new permissionMatrix_1.PermissionMatrix();
    matrix.register({
        agent: "alpha",
        role: "WORKER",
        allow: ["MEMORY_WRITE", "MEMORY_READ"]
    });
    const policy = new agentPolicyBinder_1.AgentPolicyBinder(matrix, audit);
    const memory = new memoryController_1.MemoryController(store, policy, audit);
    const agent = new TestAgent("alpha", "WORKER");
    memory.remember(agent, "HELLO");
    memory.remember(agent, "WORLD");
    const recall = memory.recall(agent);
    if (recall.length !== 2) {
        throw new Error("MEMORY COUNT FAILED");
    }
    if (recall[0] !== "HELLO" || recall[1] !== "WORLD") {
        throw new Error("MEMORY CONTENT FAILED");
    }
    console.log("MEMORY CONTROLLER TEST PASSED");
})();
