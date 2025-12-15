"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memoryController_1 = require("../memory/memoryController");
const memoryStore_1 = require("../memory/memoryStore");
const fileMemoryBackend_1 = require("../memory/fileMemoryBackend");
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
    const backend = new fileMemoryBackend_1.FileMemoryBackend(".test_memory.json");
    const store = new memoryStore_1.MemoryStore(backend);
    const matrix = new permissionMatrix_1.PermissionMatrix();
    matrix.register({
        agent: "alpha",
        role: "WORKER",
        allow: ["MEMORY_WRITE", "MEMORY_READ"]
    });
    const audit = new auditLogger_1.AuditLogger();
    const policy = new agentPolicyBinder_1.AgentPolicyBinder(matrix, audit);
    const memory = new memoryController_1.MemoryController(store, policy, audit);
    const agent = new TestAgent("alpha", "WORKER");
    memory.remember(agent, "HELLO");
    memory.remember(agent, "WORLD");
    const recall = memory.recall(agent);
    if (recall.length !== 2)
        throw new Error("RECALL FAILED");
    memory.prune(1);
    const recall2 = memory.recall(agent);
    if (recall2.length !== 1)
        throw new Error("PRUNE FAILED");
    console.log("MEMORY CONTROLLER TEST PASSED");
})();
