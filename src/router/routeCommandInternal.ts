import { MemoryController } from "../memory";
import { AuditLogger } from "../audit/auditLogger";
import { dispatchCommand } from "./routeCommand";

export async function routeCommandInternal(
  input: any,
  memory: MemoryController
) {
  const audit = new AuditLogger();
  
  // Memenuhi kontrak AuditEvent: ts, agent, role
  audit.log({ 
    ts: Date.now(),
    agent: "ARIES_CORE",
    role: "SYSTEM",
    type: "INFO" as any, 
    action: `COMMAND_RECEIVED: ${input}` as any
  });

  const result = await dispatchCommand({
    input,
    memory,
    bus: null
  });

  audit.log({ 
    ts: Date.now(),
    agent: "ARIES_CORE",
    role: "SYSTEM",
    type: "INFO" as any, 
    action: `COMMAND_EXECUTED` as any
  });

  return result;
}
