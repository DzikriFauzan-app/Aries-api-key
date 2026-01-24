import * as fs from "fs";
import { EventBus } from "../events/eventBus";
import { AriesEvent } from "../events/eventTypes";

export class ReplayEngine {
  constructor(private bus: EventBus) {}

  replay(logFile: string) {
    const lines = fs.readFileSync(logFile, "utf-8").split("\n");

    for (const line of lines) {
      if (!line.trim()) continue;
      const evt = JSON.parse(line) as AriesEvent;
      this.bus.publish(evt);
    }
  }
}
