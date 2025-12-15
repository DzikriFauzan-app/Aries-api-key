"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryController = void 0;
class MemoryController {
    constructor(store, policy, audit) {
        this.store = store;
        this.policy = policy;
        this.audit = audit;
    }
    remember(agent, content) {
        this.policy.enforce(agent, "MEMORY_WRITE");
        this.store.write({
            key: `${agent.name}:${Date.now()}`,
            agent: agent.name,
            role: agent.role,
            content,
            ts: Date.now()
        });
        this.audit.log({
            ts: Date.now(),
            type: "AGENT_COMMAND",
            agent: agent.name,
            role: agent.role,
            action: "MEMORY_WRITE",
            detail: content
        });
    }
    recall(agent) {
        this.policy.enforce(agent, "MEMORY_READ");
        return this.store
            .readByAgent(agent.name)
            .map(r => r.content)
            .filter((c) => typeof c === "string");
    }
}
exports.MemoryController = MemoryController;
