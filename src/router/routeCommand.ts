import { MemoryController } from "../memory";

export async function dispatchCommand({ input, memory, bus }: any) {
  // Logic dispatcher sederhana untuk sinkronisasi engine
  if (input === "ping") return "pong";
  
  // Catat ke memori lewat Governance (Step 15)
  memory.write("ENTERPRISE", { task: input, timestamp: Date.now() });
  
  return `Processed: ${input}`;
}
