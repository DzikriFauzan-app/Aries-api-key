import * as fs from "fs";
import * as path from "path";
import { BillingRecord } from "./billingTypes";
import { StripeSecurity } from "./stripeSecurity";

const DB_PATH = path.join(process.cwd(), "data/billing.json");

export class StripeAdapter {
  static handleSecureEvent(rawBody: string, sig: string, secret: string) {
    // 1. Verifikasi Keaslian
    const isValid = StripeSecurity.verify(rawBody, sig, secret);
    
    if (!isValid) {
      console.error("🚨 SECURITY ALERT: INVALID STRIPE SIGNATURE DETECTED!");
      throw new Error("UNAUTHORIZED_WEBHOOK_SOURCE");
    }

    // 2. Jika valid, proses data JSON-nya
    const event = JSON.parse(rawBody);
    const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8") || "{}");
    const metadata = event.data?.object?.metadata;
    const userId = metadata?.userId;

    if (!userId) return;

    if (event.type === "invoice.paid") {
      db[userId] = {
        ...db[userId],
        status: "ACTIVE",
        expireAt: Date.now() + 30 * 24 * 3600 * 1000
      };
      console.log(`✅ SECURE_PAYMENT_VERIFIED: User ${userId} updated.`);
    }

    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  }
}
