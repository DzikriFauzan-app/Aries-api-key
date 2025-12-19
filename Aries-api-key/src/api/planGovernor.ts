import { Plan } from "./licenseTypes";

export function applyPlanLimits(plan: Plan, ctx: any) {
  if (plan === "FREE") {
    ctx.maxTokens = 5_000;
    ctx.allowMemory = false;
    ctx.allowTools = false;
  }

  if (plan === "PRO") {
    ctx.maxTokens = 100_000;
    ctx.allowMemory = true;
    ctx.allowTools = false;
  }

  if (plan === "ENTERPRISE") {
    ctx.maxTokens = 1_000_000;
    ctx.allowMemory = true;
    ctx.allowTools = true;
  }
}
