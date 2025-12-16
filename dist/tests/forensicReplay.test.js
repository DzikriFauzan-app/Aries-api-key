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
const replayEngine_1 = require("../forensics/replayEngine");
const fs = __importStar(require("fs"));
(async () => {
    console.log("[TEST] FORENSIC REPLAY (STEP 21 - Final Fix)");
    // Bus utama: Merekam log (default true)
    const bus = new eventBus_1.EventBus(true);
    const logDir = "forensic_logs";
    const logFile = `${logDir}/events.log`;
    if (fs.existsSync(logFile))
        fs.unlinkSync(logFile);
    if (!fs.existsSync(logDir))
        fs.mkdirSync(logDir);
    bus.subscribe("TEST_EVT", async () => { });
    // Publish event dengan payload
    await bus.publish({
        id: "f-1",
        type: "TEST_EVT",
        source: "TEST",
        timestamp: Date.now(),
        payload: { x: 42 }
    });
    // Publish event TANPA payload (untuk tes robustness hashUtil)
    await bus.publish({
        id: "f-2",
        type: "TEST_EMPTY",
        source: "TEST",
        timestamp: Date.now(),
        payload: undefined
    });
    if (!fs.existsSync(logFile)) {
        throw new Error("Forensic log not written to disk!");
    }
    // Bus Replay: JANGAN merekam log lagi (false)
    const replayBus = new eventBus_1.EventBus(false);
    let eventCount = 0;
    replayBus.subscribe("TEST_EVT", async () => { eventCount++; });
    replayBus.subscribe("TEST_EMPTY", async () => { eventCount++; });
    const replay = new replayEngine_1.ReplayEngine(replayBus);
    replay.replay(logFile);
    await new Promise(r => setTimeout(r, 100));
    if (eventCount !== 2) {
        throw new Error(`Replay failed: Expected 2 events, got ${eventCount}`);
    }
    console.log("FORENSIC REPLAY TEST PASSED");
})();
