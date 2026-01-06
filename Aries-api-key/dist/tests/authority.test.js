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
const feacLoop_1 = require("../feac/feacLoop");
const executor_1 = require("../executor/executor");
require("../tools/fs"); // Load FS Tools Registry
const fs = __importStar(require("fs"));
(async () => {
    console.log("[TEST] AUTHORITY BINDER (Step 19 - Fixed)");
    const TEST_ROOT = "auth_test_area";
    if (fs.existsSync(TEST_ROOT))
        fs.rmSync(TEST_ROOT, { recursive: true, force: true });
    const bus = new eventBus_1.EventBus();
    const feac = new feacLoop_1.FeacLoop(bus);
    // Pastikan Executor load registry
    const executor = new executor_1.Executor(bus, TEST_ROOT);
    feac.start();
    executor.start();
    let rejected = null;
    let failed = null;
    let completed = null;
    bus.subscribe("TASK_REJECTED", async (evt) => { rejected = evt; });
    bus.subscribe("TASK_FAILED", async (evt) => { failed = evt; });
    bus.subscribe("TASK_COMPLETED", async (evt) => { completed = evt; });
    // CASE 1: SCOPE DENIAL (Guest tries to Write)
    console.log("-> Testing Scope Denial...");
    await bus.publish({
        id: "t1", type: "TASK_ASSIGNED", source: "TRANS", timestamp: Date.now(),
        payload: {
            type: "fs.write", // FIX: Use correct tool name
            apiKey: "guest-key",
            params: { path: "hack.txt", content: "hacked" }
        }
    });
    await new Promise(r => setTimeout(r, 50));
    if (!rejected || rejected.payload.reason !== "SCOPE_DENIED") {
        throw new Error("Guest write should be rejected");
    }
    // CASE 2: FORGED TASK (Direct to Executor)
    console.log("-> Testing Forged Task...");
    await bus.publish({
        id: "t2", type: "TASK_APPROVED", source: "HACKER", timestamp: Date.now(),
        payload: {
            type: "fs.write", // FIX: Use correct tool name
            params: { path: "hack.txt", content: "hacked" }
            // NO AUTHORITY
        }
    });
    await new Promise(r => setTimeout(r, 50));
    if (!failed || !failed.payload.error.includes("Unsigned")) {
        throw new Error("Unsigned task should be failed by Executor");
    }
    // CASE 3: VALID FLOW (System Key)
    console.log("-> Testing Valid Flow...");
    await bus.publish({
        id: "t3", type: "TASK_ASSIGNED", source: "TRANS", timestamp: Date.now(),
        payload: {
            type: "fs.write", // FIX: Use correct tool name
            apiKey: "aries-master-key-123",
            params: { path: "legal.txt", content: "approved" }
        }
    });
    await new Promise(r => setTimeout(r, 100));
    if (!completed)
        throw new Error("Valid task failed to complete");
    // Cleanup
    fs.rmSync(TEST_ROOT, { recursive: true, force: true });
    console.log("AUTHORITY TEST PASSED");
})();
