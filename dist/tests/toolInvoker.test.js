"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolRegistry_1 = require("../tools/toolRegistry");
const toolInvoker_1 = require("../tools/toolInvoker");
const permissionMatrix_1 = require("../policy/permissionMatrix");
const agentPolicyBinder_1 = require("../policy/agentPolicyBinder");
const auditLogger_1 = require("../audit/auditLogger");
const agent_1 = require("../agent/agent");
const echoTool_1 = require("../tools/echoTool");
class TestAgent extends agent_1.Agent {
    async handle() {
        return "";
    }
}
(async () => {
    const tools = new toolRegistry_1.ToolRegistry();
    tools.register(echoTool_1.EchoTool);
    const matrix = new permissionMatrix_1.PermissionMatrix();
    matrix.register({
        agent: "alpha",
        role: "WORKER",
        allow: ["ECHO"]
    });
    const audit = new auditLogger_1.AuditLogger();
    const policy = new agentPolicyBinder_1.AgentPolicyBinder(matrix, audit);
    const invoker = new toolInvoker_1.ToolInvoker(tools, policy, audit);
    const agent = new TestAgent("alpha", "WORKER");
    const r1 = await invoker.invoke(agent, "ECHO", "HELLO");
    if (r1 !== "HELLO") {
        throw new Error("TOOL INVOKE FAILED");
    }
    let denied = false;
    try {
        await invoker.invoke(agent, "DELETE", "X");
    }
    catch {
        denied = true;
    }
    if (!denied) {
        throw new Error("TOOL POLICY FAILED");
    }
    if (audit.all().length !== 2) {
        throw new Error("AUDIT COUNT INVALID");
    }
    console.log("TOOL INVOKER TEST PASSED");
})();
