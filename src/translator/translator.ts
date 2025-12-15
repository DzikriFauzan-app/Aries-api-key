import { EventBus } from "../events/eventBus";
import { AriesEvent } from "../events/eventTypes";
import { randomUUID } from "crypto";

type DSLCommand =
  | {
      type: "RESPOND";
      message: string;
    }
  | {
      type: "FILE_WRITE";
      path: string;
      content: string;
    };

export class Translator {
  constructor(private bus: EventBus) {}

  start() {
    this.bus.subscribe("AGENT_RESPONSE", async (evt: AriesEvent) => {
      await this.translate(evt);
    });
  }

  private async translate(evt: AriesEvent) {
    const payload = evt.payload as any;

    // CHAT / RESPONSE
    if (payload.intent === "chat" || payload.intent === "greeting") {
      const cmd: DSLCommand = {
        type: "RESPOND",
        message: payload.message
      };

      await this.bus.publish({
        id: randomUUID(),
        type: "TASK_ASSIGNED",
        source: "TRANSLATOR",
        timestamp: Date.now(),
        correlationId: evt.correlationId,
        payload: cmd
      });
      return;
    }

    // FILE CREATE (PREVIEW UNTUK STEP 16)
    if (payload.intent === "file_create") {
      const cmd: DSLCommand = {
        type: "FILE_WRITE",
        path: payload.path,
        content: payload.content
      };

      await this.bus.publish({
        id: randomUUID(),
        type: "TASK_ASSIGNED",
        source: "TRANSLATOR",
        timestamp: Date.now(),
        correlationId: evt.correlationId,
        payload: cmd
      });
      return;
    }

    throw new Error("Translator: Unknown intent");
  }
}
