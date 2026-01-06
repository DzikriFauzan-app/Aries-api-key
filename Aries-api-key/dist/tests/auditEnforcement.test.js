"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auditLogger_1 = require("../audit/auditLogger");
const permissionMatrix_1 = require("../policy/permissionMatrix");
const agentPolicyBinder_1 = require("../policy/agentPolicyBinder");
const toolRegistry_1 = require("../tools/toolRegistry");
const toolInvoker_1 = require("../tools/toolInvoker");
const echoTool_1 = require("../tools/echoTool");
const agent_1 = require("../agent/agent");
class TestAgent extends agent_1.Agent {
    async handle() {
        return "";
    }
}
(async () => {
    const audit = new auditLogger_1.AuditLogger();
    const matrix = new permissionMatrix_1.PermissionMatrix();
    matrix.register({
        agent: "alpha",
        role: "WORKER",
        allow: ["ECHO"]
    });
    const policy = new agentPolicyBinder_1.AgentPolicyBinder(matrix, audit);
    const tools = new toolRegistry_1.ToolRegistry();
    tools.register(echoTool_1.EchoTool);
    const invoker = new toolInvoker_1.ToolInvoker(tools, policy, audit);
    const agent = new TestAgent("alpha", "WORKER");
    await invoker.invoke(agent, "ECHO", "HELLO");
    let denied = false;
    try {
        await invoker.invoke(agent, "DELETE", "X");
    }
    catch {
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
