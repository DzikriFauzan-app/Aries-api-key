"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentRegistry = void 0;
const agent_1 = require("./agent");
class AgentRegistry {
    constructor() {
        this.agents = new Map();
    }
    register(arg1, role, parentName) {
        let agent;
        if (arg1 instanceof agent_1.Agent) {
            agent = arg1;
        }
        else {
            const parent = parentName ? this.agents.get(parentName) : undefined;
            agent = new agent_1.Agent(arg1, role, parent);
        }
        if (this.agents.has(agent.name)) {
            throw new Error(`Agent already exists: ${agent.name}`);
        }
        this.agents.set(agent.name, agent);
        return agent;
    }
    get(name) {
        const agent = this.agents.get(name);
        if (!agent)
            throw new Error(`Agent not found: ${name}`);
        return agent;
    }
    list() {
        return Array.from(this.agents.values());
    }
}
exports.AgentRegistry = AgentRegistry;
