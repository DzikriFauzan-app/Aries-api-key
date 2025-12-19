import { AriesEvent } from "../events/eventTypes";
import { ForensicEvent } from "./forensicTypes";
import { hashPayload } from "./hashUtil";
import * as fs from "fs";
import * as path from "path";

export class ForensicLogger {
  private logFile: string;

  constructor(logDir = "forensic_logs") {
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
    this.logFile = path.join(logDir, "events.log");
  }

  record(evt: AriesEvent) {
    const entry: ForensicEvent = {
      id: evt.id || `evt_${Date.now()}`,
      type: evt.type,
      source: evt.source,
      timestamp: evt.timestamp,
      correlationId: evt.correlationId,
      payloadHash: hashPayload(evt.payload)
    };

    fs.appendFileSync(this.logFile, JSON.stringify(entry) + "\n");
  }
}
