import * as fs from "fs";
import * as path from "path";
import { getGraceStatus } from "./gracePolicy";

const BILLING_DB = path.join(process.cwd(), "data/billing.json");
const PLAN_DB = path.join(process.cwd(), "data/licenses.json");

function load(filePath: string) {
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function save(filePath: string, data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function enforceDowngrade(userId: string) {
  const billing = load(BILLING_DB);
  const plans = load(PLAN_DB);

  const b = billing[userId];
  if (!b || !plans[userId]) return;

  const grace = getGraceStatus(b.expireAt);

  if (grace.status === "EXPIRED_FORCE_FREE" || b.status === "EXPIRED") {
    if (plans[userId].plan !== "FREE") {
      plans[userId].plan = "FREE";
      save(PLAN_DB, plans);
      console.log(`[TERMINATED] User ${userId} exceeded 24h grace. Downgraded to FREE.`);
    }
  } else if (grace.status === "GOLDEN_HOUR") {
    console.log(`[MARKETING] User ${userId} in Golden Hour! Offering ${grace.offers?.annual}`);
  }
}
