import { enforceDowngrade } from "./src/billing/downgradeEngine";
import { getGraceStatus } from "./src/billing/gracePolicy";
import * as fs from "fs";

const now = Date.now();

// Kasus 1: Nunggak 23 Jam (Golden Hour - Promo Aktif)
console.log("--- TEST 1: GOLDEN HOUR (23h Past Due) ---");
const expireAt1 = now - (23 * 3600 * 1000); 
console.log(getGraceStatus(expireAt1));

// Kasus 2: Nunggak 25 Jam (Lewat Batas - Force Free)
console.log("\n--- TEST 2: DEADLINE EXCEEDED (25h Past Due) ---");
fs.writeFileSync("data/billing.json", JSON.stringify({
  USER_AGRESSIVE: { status: "PAST_DUE", expireAt: now - (25 * 3600 * 1000) }
}, null, 2));
fs.writeFileSync("data/licenses.json", JSON.stringify({
  USER_AGRESSIVE: { plan: "PRO" }
}, null, 2));

enforceDowngrade("USER_AGRESSIVE");
console.log("Final Plan:", JSON.parse(fs.readFileSync("data/licenses.json", "utf-8")).USER_AGRESSIVE.plan);
