import { ToolRegistry } from "../tools/toolRegistry";
import { ToolInvoker } from "../tools/toolInvoker";
import { PermissionMatrix } from "../policy/permissionMatrix";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { Agent } from "../agent/agent";
import { EchoTool } from "../tools/echoTool";

class TestAgent extends Agent {
  async handle(): Promise<string> {
    return "";
  }
}

(async () => {
  const tools = new ToolRegistry();
  tools.register(EchoTool);

  const matrix = new PermissionMatrix();
  matrix.register({
    agent: "alpha",
    role: "WORKER",
    allow: ["ECHO"]
  });

  const policy = new AgentPolicyBinder(matrix);
  const invoker = new ToolInvoker(tools, policy);

  const agent = new TestAgent("alpha", "WORKER");

  // ALLOWED
  const r1 = await invoker.invoke(agent, "ECHO", "HELLO");
  if (r1 !== "HELLO") {
    throw new Error("TOOL INVOKE FAILED");
  }

  // DENIED
  let denied = false;
  try {
    await invoker.invoke(agent, "DELETE", "X");
  } catch {
    denied = true;
  }

  if (!denied) {
    throw new Error("TOOL POLICY FAILED");
  }

  console.log("TOOL INVOKER TEST PASSED");
})();
