import { enforceDowngrade } from "./src/billing/downgradeEngine";
import * as fs from "fs";
import * as path from "path";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// Simulasi Data: Expired 10 hari yang lalu (Melebihi Grace 7 hari)
fs.writeFileSync("data/billing.json", JSON.stringify({
  USER_X: {
    plan: "PRO",
    status: "PAST_DUE",
    expireAt: Date.now() - 10 * 24 * 3600 * 1000
  }
}, null, 2));

fs.writeFileSync("data/licenses.json", JSON.stringify({
  USER_X: { plan: "PRO" }
}, null, 2));

console.log("=== BEFORE ENFORCE ===");
console.log(JSON.parse(fs.readFileSync("data/licenses.json","utf-8")).USER_X);

enforceDowngrade("USER_X");

console.log("\n=== AFTER ENFORCE (Expected: FREE) ===");
console.log(JSON.parse(fs.readFileSync("data/licenses.json","utf-8")).USER_X);
