import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { getLicense } from "./licenseStore";
import { getUsage, recordUsage } from "./usageMeter";
import { applyPlanLimit } from "./billingEngine";

const KEY_DB = "data/api_keys.json";

function loadKeys() {
  if (!fs.existsSync(KEY_DB)) return [];
  return JSON.parse(fs.readFileSync(KEY_DB, "utf8"));
}

export function publicAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-aries-key"] as string;

  if (!apiKey) {
    return res.status(401).json({ error: "API_KEY_REQUIRED" });
  }

  const keys = loadKeys();
  const rec = keys.find((k: any) => k.key === apiKey);

  if (!rec) {
    return res.status(403).json({ error: "API_KEY_INVALID" });
  }

  /** LICENSE CHECK */
  const license = getLicense(apiKey);
  if (license.status !== "ACTIVE") {
    return res.status(403).json({ error: "LICENSE_INACTIVE" });
  }

  /** BILLING LIMIT */
  const billing: any = { limit: rec.quota || 0 };
  applyPlanLimit(license.plan, billing);

  /** USAGE CHECK (HARD BLOCK) */
  const usage = getUsage(apiKey);
  if (usage.used >= billing.limit) {
    return res.status(429).json({
      error: "QUOTA_EXCEEDED",
      used: usage.used,
      limit: billing.limit
    });
  }

  /** ATTACH CONTEXT */
  (req as any).apiKey = apiKey;
  (req as any).billing = billing;
  (req as any).usage = usage;

  next();
}
