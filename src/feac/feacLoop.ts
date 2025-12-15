import { EventBus } from "../events/eventBus";
import { AriesEvent } from "../events/eventTypes";
import { randomUUID } from "crypto";
import { signPayload } from "../auth/authority";
import { KeyRegistry } from "../auth/keyRegistry";
import { ApiKey } from "../auth/types";

export class FeacLoop {
  private keyRegistry = new KeyRegistry();

  constructor(private bus: EventBus) {}

  start() {
    this.bus.subscribe("TASK_ASSIGNED", async (evt: AriesEvent) => {
      await this.processTask(evt);
    });
  }

  private async processTask(evt: AriesEvent) {
    const payload = evt.payload as any;
    const taskType = payload.type;
    
    // Inject API Key (Default System for backward compat)
    const apiKeyStr = payload.apiKey || "aries-master-key-123"; 
    const key = this.keyRegistry.validate(apiKeyStr);

    if (!key) {
      console.log(`FEAC REJECT: Invalid API Key ${apiKeyStr}`);
      return;
    }

    // 1. DETERMINE REQUIRED SCOPE
    let requiredScope: string | null = null;
    
    if (taskType === "fs.write" || taskType === "FILE_WRITE") {
      requiredScope = "fs.write";
    } else if (taskType === "fs.read" || taskType === "FILE_READ") {
      requiredScope = "fs.read";
    } else if (taskType === "system.exec") {
      requiredScope = "system.exec";
    } else if (taskType === "RESPOND") {
      requiredScope = null; // Chat response doesn't need privileged scope
    } else {
      // UNKNOWN TASK TYPE -> REJECT BY DEFAULT
      console.log(`FEAC REJECT: Unknown task type '${taskType}' - Deny by default`);
      await this.emitReject(evt, "UNKNOWN_TASK_TYPE");
      return;
    }

    // 2. CHECK SCOPE POSSESSION
    if (requiredScope) {
      if (!key.scopes.includes(requiredScope as any)) {
         console.log(`FEAC REJECT: Key ${key.id} missing scope ${requiredScope} for task ${taskType}`);
         await this.emitReject(evt, "SCOPE_DENIED");
         return;
      }
    }

    // 3. SIGN & APPROVE
    const signature = signPayload(payload.params || {}, key.id);

    await this.bus.publish({
      id: randomUUID(),
      type: "TASK_APPROVED",
      source: "FEAC",
      timestamp: Date.now(),
      correlationId: evt.correlationId,
      payload: {
        ...payload,
        authority: {
          keyId: key.id,
          signature: signature
        }
      }
    });
  }

  private async emitReject(origin: AriesEvent, reason: string) {
    await this.bus.publish({
      id: randomUUID(),
      type: "TASK_REJECTED",
      source: "FEAC",
      timestamp: Date.now(),
      correlationId: origin.correlationId,
      payload: { reason }
    });
  }
}
