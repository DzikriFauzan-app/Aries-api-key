import { getLicense } from "./licenseStore";
import { applyPlanLimits } from "./planGovernor";

export function enforceGovernance(req: any, res: any, next: any) {
  const apiKey = req.apiKey;
  const license = getLicense(apiKey);

  if (license.status !== "ACTIVE") {
    return res.status(403).json({ error: "LICENSE_INACTIVE" });
  }

  if (license.expiresAt < Date.now()) {
    return res.status(403).json({ error: "LICENSE_EXPIRED" });
  }

  req.governance = {};
  applyPlanLimits(license.plan, req.governance);

  next();
}
