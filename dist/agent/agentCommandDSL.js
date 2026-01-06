"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeAgentCommand = executeAgentCommand;
async function executeAgentCommand(input, registry) {
    if (!input.startsWith("AGENT::"))
        return [];
    const parts = input.split("::").map(p => p.trim());
    // AGENT::BROADCAST::<cmd>
    if (parts[1] === "BROADCAST" && parts.length === 3) {
        return registry.broadcast(parts[2]);
    }
    // AGENT::<agent>::DELEGATE::<cmd>
    if (parts.length === 4 && parts[2] === "DELEGATE") {
        const agentName = parts[1];
        const cmd = parts[3];
        const res = await registry.delegate(agentName, cmd);
        return [res];
    }
    // AGENT::<agent>::<cmd>
    if (parts.length === 3) {
        const agentName = parts[1];
        const cmd = parts[2];
        const agent = registry.get(agentName);
        if (!agent)
            return [];
        const res = await agent.handle(cmd);
        return [res];
    }
    return [];
}
