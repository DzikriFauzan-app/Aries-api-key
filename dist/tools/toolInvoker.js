"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolInvoker = void 0;
class ToolInvoker {
    constructor(registry, policy, audit) {
        this.registry = registry;
        this.policy = policy;
        this.audit = audit;
    }
    async invoke(agent, toolName, input) {
        this.policy.enforce(agent, toolName);
        const tool = this.registry.get(toolName);
        if (!tool) {
            throw new Error(`TOOL NOT FOUND: ${toolName}`);
        }
        const result = await tool.execute(input, {
            agent: agent.name,
            role: agent.role
        });
        this.audit.log({
            ts: Date.now(),
            type: "TOOL_INVOKE",
            agent: agent.name,
            role: agent.role,
            action: toolName,
            detail: input
        });
        return result;
    }
}
exports.ToolInvoker = ToolInvoker;
