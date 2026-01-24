import { AgentRegistry } from "../agent/agentRegistry";
import { executeAgentCommand } from "../agent/agentCommandDSL";
import { Agent } from "../agent/agent";

class TestAgent extends Agent {
  async handle(cmd: string): Promise<string> {
    if (cmd === "PING") return "PONG";
    return "UNKNOWN";
  }
}

(async () => {
  const reg = new AgentRegistry();

  reg.register("alpha", "WORKER");
  reg.register("beta", "WORKER", "alpha");

  reg.attach(new TestAgent("alpha", "WORKER"));
  reg.attach(new TestAgent("beta", "WORKER"));

  const r1 = await executeAgentCommand("AGENT::alpha::PING", reg);
  if (r1[0] !== "PONG") throw new Error("DIRECT COMMAND FAILED");

  const r2 = await executeAgentCommand("AGENT::alpha::DELEGATE::PING", reg);
  if (r2[0] !== "PONG") throw new Error("DELEGATE FAILED");

  const r3 = await executeAgentCommand("AGENT::BROADCAST::PING", reg);
  if (r3.length !== 2) throw new Error("BROADCAST COUNT FAILED");

  console.log("AGENT COMMAND DSL TEST PASSED");
})();
