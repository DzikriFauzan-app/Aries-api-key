import fs from "fs";

const BILLING_DB = "data/billing.json";

type BillingStatus = "ACTIVE" | "SOFT_BAN" | "HARD_BAN" | "SUSPENDED";

export interface BillingRecord {
  plan: string;
  used: number;
  limit: number;
  resetAt: number;
  status: BillingStatus;
}

function loadDB(): Record<string, BillingRecord> {
  if (!fs.existsSync(BILLING_DB)) return {};
  return JSON.parse(fs.readFileSync(BILLING_DB, "utf8"));
}

function saveDB(db: any) {
  fs.writeFileSync(BILLING_DB, JSON.stringify(db, null, 2));
}

export function getBilling(apiKey: string): BillingRecord {
  const db = loadDB();
  if (!db[apiKey]) {
    db[apiKey] = {
      plan: "FREE",
      used: 0,
      limit: 5000,
      resetAt: Date.now() + 30 * 24 * 3600 * 1000,
      status: "ACTIVE"
    };
    saveDB(db);
  }
  return db[apiKey];
}

export function consumeQuota(apiKey: string) {
  const db = loadDB();
  const rec = getBilling(apiKey);

  if (rec.status !== "ACTIVE") {
    throw new Error(`BILLING_${rec.status}`);
  }

  rec.used += 1;

  if (rec.used > rec.limit) {
    rec.status = "SOFT_BAN";
  }

  db[apiKey] = rec;
  saveDB(db);

  if (rec.status !== "ACTIVE") {
    throw new Error("QUOTA_EXCEEDED");
  }
}

export function applyPlanLimit(plan: string, rec: any) {
  if (plan === "FREE") rec.limit = 5_000;
  if (plan === "PRO") rec.limit = 100_000;
  if (plan === "ENTERPRISE") rec.limit = 1_000_000;
}
