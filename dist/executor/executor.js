"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const fsRegistry_1 = require("../tools/fs/fsRegistry");
const crypto_1 = require("crypto");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
class Executor {
    constructor(bus, rootPath = "workspace") {
        this.bus = bus;
        this.workspaceRoot = path.resolve(process.cwd(), rootPath);
    }
    start() {
        // FIX: Tambahkan type annotation (evt: AriesEvent)
        this.bus.subscribe("TASK_APPROVED", async (evt) => {
            await this.executeTask(evt);
        });
    }
    async executeTask(evt) {
        const payload = evt.payload;
        // Type casting ke string agar aman dipakai sebagai key
        const toolName = payload.type;
        try {
            const toolDef = (0, fsRegistry_1.getFsTool)(toolName);
            // Validasi params ada di dalam payload
            const params = payload.params || {};
            const targetPath = path.resolve(this.workspaceRoot, params.path);
            if (!targetPath.startsWith(this.workspaceRoot)) {
                throw new Error("Security Violation: Path traversal detected");
            }
            let result;
            if (toolName === "fs.read") {
                result = await fs.readFile(targetPath, "utf-8");
            }
            else if (toolName === "fs.write") {
                if (toolDef.readOnly)
                    throw new Error("Violation: Write on ReadOnly tool");
                // Ensure directory exists
                await fs.mkdir(path.dirname(targetPath), { recursive: true });
                await fs.writeFile(targetPath, params.content || "", "utf-8");
                result = "File Written";
            }
            else if (toolName === "fs.list") {
                result = await fs.readdir(targetPath);
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
            await this.bus.publish({
                id: (0, crypto_1.randomUUID)(),
                type: "TASK_FAILED",
                source: "EXECUTOR",
                timestamp: Date.now(),
                correlationId: evt.correlationId,
                payload: { error: error.message }
            });
        }
    }
}
exports.Executor = Executor;
