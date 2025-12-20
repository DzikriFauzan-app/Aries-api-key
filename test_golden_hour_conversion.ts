import { StripeAdapter } from "./src/billing/stripeAdapter";
import { BillingNotifier } from "./src/billing/billingNotifier";
import * as fs from "fs";

const userId = "USER_AGRESSIVE";
const expireAt = Date.now() - (23 * 3600 * 1000 + 50 * 60 * 1000); 

console.log("=== 1. USER MELIHAT NOTIFIKASI DI PERANGKAT ===");
const alert = BillingNotifier.getAlert(expireAt);

// Gunakan type guard untuk meyakinkan TS bahwa alert dan offers ada
if (alert && alert.offers) {
  console.log(`[ALERT] ${alert.title}`);
  console.log(`[MESSAGE] ${alert.message}`);
  console.log(`[OFFER] ANNUAL: ${alert.offers.annual}`);
  console.log(`[TIMER] Menghitung mundur: ${alert.timer} ...`);
}

console.log("\n=== 2. USER KLIK BELI PAKET TAHUNAN (35% OFF) ===");
StripeAdapter.handleEvent({
  type: "invoice.paid",
  data: { 
    object: { 
      metadata: { 
        userId: userId,
        plan: "ENTERPRISE_ANNUAL"
      } 
    } 
  }
});

const db = JSON.parse(fs.readFileSync("data/billing.json", "utf-8"));
console.log("\n=== 3. HASIL SETELAH PEMBAYARAN ===");
console.log(`Status: ${db[userId].status}`);
console.log(`Plan: ${db[userId].plan}`);
console.log(`Expiry Baru: ${new Date(db[userId].expireAt).toLocaleString()}`);
