import { enforceMemoryPolicy } from "./memoryGovernor";

export function accessMemory({
  plan,
  action,
  memory,
  payload
}: {
  plan: "FREE" | "PRO" | "ENTERPRISE";
  action: "READ" | "WRITE";
  memory: any[];
  payload?: any;
}) {
  enforceMemoryPolicy(plan, action, memory.length);

  if (action === "WRITE") {
    memory.push(payload);
  }

  return memory.slice(-10);
}
