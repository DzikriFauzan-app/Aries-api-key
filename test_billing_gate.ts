import { BillingGate } from "./src/billing/billingGate";

console.log("=== ARIES BILLING GATE TEST ===");

const cases = [
    { name: "ACTIVE ENTERPRISE", id: "CORP_A" },
    { name: "FREE USER (NOT IN DB)", id: "NEW_GUY_123" },
    { name: "SUSPENDED USER", id: "BANNED_CORP" },
    { name: "EXPIRED SUBSCRIPTION", id: "EXPIRED_USER" }
];

cases.forEach(c => {
    const result = BillingGate.check(c.id);
    console.log(`${c.name}: ${result.ok ? "✅ ALLOWED" : "❌ BLOCKED (" + result.reason + ")"}`);
});
