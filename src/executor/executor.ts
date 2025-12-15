import { EventBus } from "../events/eventBus";
import { AriesEvent } from "../events/eventTypes";
import { getFsTool } from "../tools/fs/fsRegistry";
import { Sandbox } from "../sandbox/sandbox";
import { SandboxError } from "../sandbox/sandboxError";
import { verifyPayload } from "../auth/authority";
import { randomUUID } from "crypto";

type ExecutionPayload = {
  type: string;
  params: any;
  authority?: {
    keyId: string;
    signature: string;
  };
};

export class Executor {
  private sandbox: Sandbox;

  constructor(private bus: EventBus, rootPath: string = "workspace") {
    this.sandbox = new Sandbox(rootPath);
  }

  start() {
    this.bus.subscribe("TASK_APPROVED", async (evt: AriesEvent) => {
      await this.executeTask(evt);
    });
  }

  private async executeTask(evt: AriesEvent) {
    const payload = evt.payload as ExecutionPayload;
    const toolName = payload.type as any;

    try {
      // 1. ZERO TRUST VERIFICATION
      if (!payload.authority) {
        throw new Error("Security Violation: Unsigned Task");
      }

      const isValid = verifyPayload(payload.params || {}, payload.authority.keyId, payload.authority.signature);
      
      if (!isValid) {
        throw new Error("Security Violation: Invalid Signature (Task Tampered)");
      }

      // 2. Execution (Sandbox)
      const toolDef = getFsTool(toolName);
      const params = payload.params || {};
      
      let result: any;
      if (toolName === "fs.read") {
        result = await this.sandbox.readFile(params.path);
      } else if (toolName === "fs.write") {
        if (toolDef.readOnly) throw new Error("Violation: Write on ReadOnly tool");
        await this.sandbox.writeFile(params.path, params.content || "");
        result = "File Written";
      } else if (toolName === "fs.list") {
        result = await this.sandbox.listDir(params.path);
      } else {
        throw new Error("Not implemented tool logic");
      }

      await this.bus.publish({
        id: randomUUID(),
        type: "TASK_COMPLETED",
        source: "EXECUTOR",
        timestamp: Date.now(),
        correlationId: evt.correlationId,
        payload: { status: "SUCCESS", result }
      });

    } catch (error: any) {
      console.error("[Executor] Error:", error.message);
      const isSecurity = error.message.includes("Security Violation") || error instanceof SandboxError;
      
      await this.bus.publish({
        id: randomUUID(),
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
