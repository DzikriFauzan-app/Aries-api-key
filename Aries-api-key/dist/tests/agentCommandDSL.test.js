"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agentRegistry_1 = require("../agent/agentRegistry");
const agentCommandDSL_1 = require("../agent/agentCommandDSL");
const agent_1 = require("../agent/agent");
class TestAgent extends agent_1.Agent {
    async handle(cmd) {
        if (cmd === "PING")
            return "PONG";
        return "UNKNOWN";
    }
}
(async () => {
    const reg = new agentRegistry_1.AgentRegistry();
    reg.register("alpha", "WORKER");
    reg.register("beta", "WORKER", "alpha");
    reg.attach(new TestAgent("alpha", "WORKER"));
    reg.attach(new TestAgent("beta", "WORKER"));
    const r1 = await (0, agentCommandDSL_1.executeAgentCommand)("AGENT::alpha::PING", reg);
    if (r1[0] !== "PONG")
        throw new Error("DIRECT COMMAND FAILED");
    const r2 = await (0, agentCommandDSL_1.executeAgentCommand)("AGENT::alpha::DELEGATE::PING", reg);
    if (r2[0] !== "PONG")
        throw new Error("DELEGATE FAILED");
    const r3 = await (0, agentCommandDSL_1.executeAgentCommand)("AGENT::BROADCAST::PING", reg);
    if (r3.length !== 2)
        throw new Error("BROADCAST COUNT FAILED");
    console.log("AGENT COMMAND DSL TEST PASSED");
})();
