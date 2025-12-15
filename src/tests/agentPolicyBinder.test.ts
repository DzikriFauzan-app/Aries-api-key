import { PermissionMatrix } from "../policy/permissionMatrix";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { AuditLogger } from "../audit/auditLogger";
import { Agent } from "../agent/agent";

class TestAgent extends Agent {
  async handle(cmd: string): Promise<string> {
    return cmd;
  }
}

(() => {
  const matrix = new PermissionMatrix();
  const audit = new AuditLogger();

  matrix.register({
    agent: "alpha",
    role: "WORKER",
    allow: ["PING"]
  });

  const binder = new AgentPolicyBinder(matrix, audit);
  const agent = new TestAgent("alpha", "WORKER");

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

  if (audit.all().length !== 1) {
    throw new Error("AUDIT NOT RECORDED");
  }

  console.log("AGENT POLICY BINDER TEST PASSED");
})();
