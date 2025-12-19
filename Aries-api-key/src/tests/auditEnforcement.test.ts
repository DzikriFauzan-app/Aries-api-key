import { AuditLogger } from "../audit/auditLogger";
import { PermissionMatrix } from "../policy/permissionMatrix";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { ToolRegistry } from "../tools/toolRegistry";
import { ToolInvoker } from "../tools/toolInvoker";
import { EchoTool } from "../tools/echoTool";
import { Agent } from "../agent/agent";

class TestAgent extends Agent {
  async handle(): Promise<string> {
    return "";
  }
}

(async () => {
  const audit = new AuditLogger();

  const matrix = new PermissionMatrix();
  matrix.register({
    agent: "alpha",
    role: "WORKER",
    allow: ["ECHO"]
  });

  const policy = new AgentPolicyBinder(matrix, audit);

  const tools = new ToolRegistry();
  tools.register(EchoTool);

  const invoker = new ToolInvoker(tools, policy, audit);
  const agent = new TestAgent("alpha", "WORKER");

  await invoker.invoke(agent, "ECHO", "HELLO");

  let denied = false;
  try {
    await invoker.invoke(agent, "DELETE", "X");
  } catch {
    denied = true;
  }

  if (!denied) {
    throw new Error("POLICY DENY NOT ENFORCED");
  }

  if (audit.all().length !== 2) {
    throw new Error("AUDIT EVENT COUNT FAILED");
  }

  console.log("AUDIT ENFORCEMENT TEST PASSED");
})();
