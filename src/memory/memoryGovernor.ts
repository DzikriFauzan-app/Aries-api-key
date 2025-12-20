import { MEMORY_POLICY } from "./memoryPolicy";

export function enforceMemoryPolicy(
  plan: "FREE" | "PRO" | "ENTERPRISE",
  action: "READ" | "WRITE",
  currentSize: number
) {
  const policy = MEMORY_POLICY[plan];

  if (action === "WRITE" && !policy.write) {
    throw new Error("MEMORY_WRITE_FORBIDDEN");
  }

  if (currentSize >= policy.maxRecords) {
    throw new Error("MEMORY_LIMIT_EXCEEDED");
  }
}
