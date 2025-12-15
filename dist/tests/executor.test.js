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
const eventBus_1 = require("../events/eventBus");
const executor_1 = require("../executor/executor");
require("../tools/fs");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
(async () => {
    console.log("[TEST] EXECUTOR CORE (Step 17)");
    const TEST_ROOT = path.resolve(process.cwd(), "test_workspace");
    if (fs.existsSync(TEST_ROOT))
        fs.rmSync(TEST_ROOT, { recursive: true, force: true });
    fs.mkdirSync(TEST_ROOT);
    const bus = new eventBus_1.EventBus();
    const executor = new executor_1.Executor(bus, "test_workspace");
    executor.start();
    let completed = null;
    let failed = null;
    // FIX: Type annotation
    bus.subscribe("TASK_COMPLETED", async (evt) => { completed = evt; });
    bus.subscribe("TASK_FAILED", async (evt) => { failed = evt; });
    // CASE 1: WRITE FILE
    console.log("-> Executing fs.write...");
    await bus.publish({
        id: "ex-1",
        type: "TASK_APPROVED",
        source: "FEAC",
        timestamp: Date.now(),
        correlationId: "sess-1",
        payload: {
            type: "fs.write",
            params: { path: "hello.txt", content: "ARIES_LIVES" }
        }
    });
    await new Promise(r => setTimeout(r, 100));
    if (!completed)
        throw new Error("Executor silent on success");
    const fileContent = fs.readFileSync(path.join(TEST_ROOT, "hello.txt"), "utf-8");
    if (fileContent !== "ARIES_LIVES")
        throw new Error("File content corrupted");
    // CASE 2: READ FILE
    completed = null;
    console.log("-> Executing fs.read...");
    await bus.publish({
        id: "ex-2",
        type: "TASK_APPROVED",
        source: "FEAC",
        timestamp: Date.now(),
        correlationId: "sess-1",
        payload: {
            type: "fs.read",
            params: { path: "hello.txt" }
        }
    });
    await new Promise(r => setTimeout(r, 50));
    const payload = completed ? completed.payload : null;
    if (!payload || payload.result !== "ARIES_LIVES") {
        throw new Error("Read failed or mismatch");
    }
    // CASE 3: SECURITY BREACH
    console.log("-> Executing Path Traversal Attack...");
    await bus.publish({
        id: "ex-3",
        type: "TASK_APPROVED",
        source: "FEAC",
        timestamp: Date.now(),
        correlationId: "sess-1",
        payload: {
            type: "fs.read",
            params: { path: "../../../etc/passwd" }
        }
    });
    await new Promise(r => setTimeout(r, 50));
    if (!failed)
        throw new Error("Executor allowed path traversal!");
    const failPayload = failed.payload;
    if (!failPayload.error.includes("Security Violation")) {
        throw new Error("Wrong error message for security breach");
    }
    fs.rmSync(TEST_ROOT, { recursive: true, force: true });
    console.log("EXECUTOR TEST PASSED");
})();
