"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agentRegistry_1 = require("../agent/agentRegistry");
(async () => {
    const registry = new agentRegistry_1.AgentRegistry();
    const aries = registry.register("aries", "ROOT");
    const commander = registry.register("cmd", "COMMANDER", "aries");
    const worker = registry.register("worker", "WORKER", "cmd");
    if (!worker.approve()) {
        throw new Error("Worker approval failed");
    }
    if (!commander.approve()) {
        throw new Error("Commander approval failed");
    }
    console.log("AGENT HIERARCHY TEST PASSED");
})();
