"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentRegistry = void 0;
const agent_1 = require("./agent");
class AgentRegistry {
    constructor() {
        this.agents = new Map();
        this.children = new Map();
    }
    register(arg1, role, parentName) {
        if (arg1 instanceof agent_1.Agent) {
            this.agents.set(arg1.name, arg1);
            return arg1;
        }
        const agent = new agent_1.Agent(arg1, role);
        this.agents.set(arg1, agent);
        if (parentName) {
            const parent = this.agents.get(parentName);
            if (parent) {
                agent.setParent(parent);
                const list = this.children.get(parentName) || [];
                list.push(arg1);
                this.children.set(parentName, list);
            }
        }
        return agent;
    }
    // 🔒 REQUIRED BY DSL TEST
    attach(agent) {
        this.agents.set(agent.name, agent);
    }
    get(name) {
        return this.agents.get(name);
    }
    list() {
        return Array.from(this.agents.values());
    }
    async broadcast(command) {
        const results = [];
        for (const agent of this.agents.values()) {
            results.push(await agent.handle(command));
        }
        return results;
    }
    async delegate(parentName, command) {
        const children = this.children.get(parentName) || [];
        if (children.length === 0) {
            throw new Error("No delegated agents");
        }
        const child = this.agents.get(children[0]);
        if (!child) {
            throw new Error("Delegated agent not found");
        }
        return child.handleDelegated(command);
    }
}
exports.AgentRegistry = AgentRegistry;
