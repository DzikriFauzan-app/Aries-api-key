"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const fsRegistry_1 = require("../tools/fs/fsRegistry");
const sandbox_1 = require("../sandbox/sandbox");
const sandboxError_1 = require("../sandbox/sandboxError");
const authority_1 = require("../auth/authority");
const crypto_1 = require("crypto");
class Executor {
    constructor(bus, rootPath = "workspace") {
        this.bus = bus;
        this.sandbox = new sandbox_1.Sandbox(rootPath);
    }
    start() {
        this.bus.subscribe("TASK_APPROVED", async (evt) => {
            await this.executeTask(evt);
        });
    }
    async executeTask(evt) {
        const payload = evt.payload;
        const toolName = payload.type;
        try {
            // 1. ZERO TRUST VERIFICATION
            if (!payload.authority) {
                throw new Error("Security Violation: Unsigned Task");
            }
            const isValid = (0, authority_1.verifyPayload)(payload.params || {}, payload.authority.keyId, payload.authority.signature);
            if (!isValid) {
                throw new Error("Security Violation: Invalid Signature (Task Tampered)");
            }
            // 2. Execution (Sandbox)
            const toolDef = (0, fsRegistry_1.getFsTool)(toolName);
            const params = payload.params || {};
            let result;
            if (toolName === "fs.read") {
                result = await this.sandbox.readFile(params.path);
            }
            else if (toolName === "fs.write") {
                if (toolDef.readOnly)
                    throw new Error("Violation: Write on ReadOnly tool");
                await this.sandbox.writeFile(params.path, params.content || "");
                result = "File Written";
            }
            else if (toolName === "fs.list") {
                result = await this.sandbox.listDir(params.path);
            }
            else {
                throw new Error("Not implemented tool logic");
            }
            await this.bus.publish({
                id: (0, crypto_1.randomUUID)(),
                type: "TASK_COMPLETED",
                source: "EXECUTOR",
                timestamp: Date.now(),
                correlationId: evt.correlationId,
                payload: { status: "SUCCESS", result }
            });
        }
        catch (error) {
            console.error("[Executor] Error:", error.message);
            const isSecurity = error.message.includes("Security Violation") || error instanceof sandboxError_1.SandboxError;
            await this.bus.publish({
                id: (0, crypto_1.randomUUID)(),
                type: "TASK_FAILED",
                source: "EXECUTOR",
                timestamp: Date.now(),
                correlationId: evt.correlationId,
                payload: {
                    error: error.message,
                    isSecurityViolation: isSecurity
                }
            });
        }
    }
}
exports.Executor = Executor;
