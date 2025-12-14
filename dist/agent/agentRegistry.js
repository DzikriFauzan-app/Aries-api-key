"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentRegistry = void 0;
class AgentRegistry {
    constructor() {
        this.agents = new Map();
    }
    register(agent) {
        this.agents.set(agent.id, agent);
    }
    get(id) {
        return this.agents.get(id);
    }
    list() {
        return Array.from(this.agents.keys());
    }
}
exports.AgentRegistry = AgentRegistry;
