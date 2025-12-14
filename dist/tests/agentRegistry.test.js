"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agent_1 = require("../agent/agent");
const agentRegistry_1 = require("../agent/agentRegistry");
class DummyAgent extends agent_1.Agent {
    async handle(input) {
        return `ECHO:${input}`;
    }
}
async function run() {
    const reg = new agentRegistry_1.AgentRegistry();
    const a1 = new DummyAgent("agent-1", "WORKER");
    const a2 = new DummyAgent("agent-2", "OBSERVER");
    reg.register(a1);
    reg.register(a2);
    if (reg.list().length !== 2) {
        throw new Error("AGENT REGISTRY SIZE INVALID");
    }
    const got = reg.get("agent-1");
    if (!got) {
        throw new Error("AGENT NOT FOUND");
    }
    const out = await got.handle("ping");
    if (out !== "ECHO:ping") {
        throw new Error("AGENT HANDLE FAILED");
    }
    console.log("AGENT REGISTRY TEST PASSED");
}
run();
