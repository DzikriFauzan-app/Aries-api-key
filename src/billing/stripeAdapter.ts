import * as fs from "fs";
import * as path from "path";
import { BillingRecord } from "./billingTypes";

const DB_PATH = path.join(process.cwd(), "data/billing.json");

function loadDb(): Record<string, BillingRecord> {
  if (!fs.existsSync(DB_PATH)) return {};
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function saveDb(db: any) {
  if (!fs.existsSync(path.dirname(DB_PATH))) fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

export class StripeAdapter {
  static handleEvent(event: any) {
    const db = loadDb();
    const metadata = event.data?.object?.metadata || event.data?.metadata;
    const userId = metadata?.userId;

    if (!userId) {
      console.error("STRIPE_ADAPTER_ERROR: No userId in metadata");
      return;
    }

    switch (event.type) {
      case "invoice.paid": {
        db[userId] = {
          ...db[userId],
          plan: db[userId]?.plan || "PRO",
          status: "ACTIVE",
          expireAt: Date.now() + 30 * 24 * 3600 * 1000
        };
        break;
      }

      case "invoice.payment_failed": {
        if (db[userId]) db[userId].status = "PAST_DUE";
        break;
      }

      case "customer.subscription.deleted": {
        if (db[userId]) db[userId].status = "EXPIRED";
        break;
      }
    }

    saveDb(db);
  }
}
