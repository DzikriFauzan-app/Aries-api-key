import { PermissionMatrix } from "../policy/permissionMatrix";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { Agent } from "../agent/agent";

class TestAgent extends Agent {
  async handle(cmd: string): Promise<string> {
    return cmd;
  }
}

(() => {
  const matrix = new PermissionMatrix();

  matrix.register({
    agent: "alpha",
    role: "WORKER",
    allow: ["PING"]
  });

  const binder = new AgentPolicyBinder(matrix);
  const agent = new TestAgent("alpha", "WORKER");

  // ALLOWED
  binder.enforce(agent, "PING");

  let denied = false;
  try {
    binder.enforce(agent, "DELETE");
  } catch {
    denied = true;
  }

  if (!denied) {
    throw new Error("POLICY DENIAL FAILED");
  }

  console.log("AGENT POLICY BINDER TEST PASSED");
})();
