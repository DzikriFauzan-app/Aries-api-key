import { EventBus } from "../events/eventBus";
import { ReplayEngine } from "../forensics/replayEngine";
import * as fs from "fs";

(async () => {
  console.log("[TEST] FORENSIC REPLAY (STEP 21 - Final Fix)");

  // Bus utama: Merekam log (default true)
  const bus = new EventBus(true);
  const logDir = "forensic_logs";
  const logFile = `${logDir}/events.log`;

  if (fs.existsSync(logFile)) fs.unlinkSync(logFile);
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

  bus.subscribe("TEST_EVT", async () => {});

  // Publish event dengan payload
  await bus.publish({
    id: "f-1",
    type: "TEST_EVT" as any, 
    source: "TEST",
    timestamp: Date.now(),
    payload: { x: 42 }
  });

  // Publish event TANPA payload (untuk tes robustness hashUtil)
  await bus.publish({
    id: "f-2",
    type: "TEST_EMPTY" as any,
    source: "TEST",
    timestamp: Date.now(),
    payload: undefined
  });

  if (!fs.existsSync(logFile)) {
    throw new Error("Forensic log not written to disk!");
  }

  // Bus Replay: JANGAN merekam log lagi (false)
  const replayBus = new EventBus(false);
  
  let eventCount = 0;
  replayBus.subscribe("TEST_EVT", async () => { eventCount++; });
  replayBus.subscribe("TEST_EMPTY", async () => { eventCount++; });

  const replay = new ReplayEngine(replayBus);
  replay.replay(logFile);

  await new Promise(r => setTimeout(r, 100));
  
  if (eventCount !== 2) {
    throw new Error(`Replay failed: Expected 2 events, got ${eventCount}`);
  }

  console.log("FORENSIC REPLAY TEST PASSED");
})();
