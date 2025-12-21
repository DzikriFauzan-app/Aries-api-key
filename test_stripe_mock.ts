import { StripeAdapter } from "./src/billing/stripeAdapter";
import * as fs from "fs";

console.log("=== STRIPE ADAPTER MOCK TEST ===");

// 1. Simulasi Pembayaran Berhasil
StripeAdapter.handleEvent({
  type: "invoice.paid",
  data: { object: { metadata: { userId: "CORP_A" } } }
});
console.log("- Paid Event Processed");

// 2. Simulasi Pembayaran Gagal
StripeAdapter.handleEvent({
  type: "invoice.payment_failed",
  data: { object: { metadata: { userId: "CORP_A" } } }
});
console.log("- Payment Failed Event Processed");

// Cek Hasil Final
const db = JSON.parse(fs.readFileSync("data/billing.json", "utf-8"));
console.log("\nFinal State for CORP_A:", db["CORP_A"]);
