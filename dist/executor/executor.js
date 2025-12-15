"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const fsRegistry_1 = require("../tools/fs/fsRegistry");
const sandbox_1 = require("../sandbox/sandbox"); // Import Sandbox
const sandboxError_1 = require("../sandbox/sandboxError"); // Import Error Type
const crypto_1 = require("crypto");
class Executor {
    constructor(bus, rootPath = "workspace") {
        this.bus = bus;
        // Inisialisasi Sandbox di sini
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
            const toolDef = (0, fsRegistry_1.getFsTool)(toolName);
            const params = payload.params || {};
            // EXECUTOR TIDAK LAGI URUS PATH RESOLUTION ATAU FS NATIVE
            // SEMUA DISERAHKAN KE SANDBOX
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
            // Bedakan error sandbox vs error lain jika perlu
            const isSecurity = error instanceof sandboxError_1.SandboxError;
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
