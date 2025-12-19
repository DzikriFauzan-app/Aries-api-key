import { getLicense } from "./licenseStore";
import { getUsage } from "./usageMeter";
import { applyPlanLimit } from "./billingEngine";

export function billingGuard(apiKey: string) {
  const license = getLicense(apiKey);

  if (license.status !== "ACTIVE") {
    throw new Error("LICENSE_INACTIVE");
  }

  const usage = getUsage(apiKey);
  const billing: any = { used: usage.used, limit: 0 };

  applyPlanLimit(license.plan, billing);

  if (billing.used >= billing.limit) {
    throw new Error("QUOTA_EXCEEDED");
  }

  return {
    plan: license.plan,
    used: billing.used,
    limit: billing.limit
  };
}
