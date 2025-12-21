import { getPlanLimit } from "./src/billing/planContract";

console.log("=== VERIFIKASI KEDAULATAN IP & USER (15.5-19.5) ===");

const list = ["FREE", "PRO", "ENTERPRISE_1", "ENTERPRISE_5", "ENTERPRISE_10", "PLATINUM"];

list.forEach(p => {
    const config = getPlanLimit(p);
    console.log(`${p.padEnd(15)} | Quota: ${config.userQuota.toString().padEnd(3)} User | IP Slots: ${config.maxIpSlots}`);
});
