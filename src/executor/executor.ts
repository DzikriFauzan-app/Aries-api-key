import { EventBus } from "../events/eventBus";
import { AriesEvent } from "../events/eventTypes";
import { getFsTool } from "../tools/fs/fsRegistry";
import { randomUUID } from "crypto";
import * as fs from "fs/promises";
import * as path from "path";

type ExecutionPayload = {
  type: string;
  params: any;
};

export class Executor {
  private workspaceRoot: string;

  constructor(private bus: EventBus, rootPath: string = "workspace") {
    this.workspaceRoot = path.resolve(process.cwd(), rootPath);
  }

  start() {
    // FIX: Tambahkan type annotation (evt: AriesEvent)
    this.bus.subscribe("TASK_APPROVED", async (evt: AriesEvent) => {
      await this.executeTask(evt);
    });
  }

  private async executeTask(evt: AriesEvent) {
    const payload = evt.payload as ExecutionPayload;
    // Type casting ke string agar aman dipakai sebagai key
    const toolName = payload.type as any; 

    try {
      const toolDef = getFsTool(toolName);
      
      // Validasi params ada di dalam payload
      const params = payload.params || {};

      const targetPath = path.resolve(this.workspaceRoot, params.path);
      if (!targetPath.startsWith(this.workspaceRoot)) {
        throw new Error("Security Violation: Path traversal detected");
      }

      let result: any;
      if (toolName === "fs.read") {
        result = await fs.readFile(targetPath, "utf-8");
      } else if (toolName === "fs.write") {
        if (toolDef.readOnly) throw new Error("Violation: Write on ReadOnly tool");
        // Ensure directory exists
        await fs.mkdir(path.dirname(targetPath), { recursive: true });
        await fs.writeFile(targetPath, params.content || "", "utf-8");
        result = "File Written";
      } else if (toolName === "fs.list") {
        result = await fs.readdir(targetPath);
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
      
      await this.bus.publish({
        id: randomUUID(),
        type: "TASK_FAILED",
        source: "EXECUTOR",
        timestamp: Date.now(),
        correlationId: evt.correlationId,
        payload: { error: error.message }
      });
    }
  }
}
