import { handlePublicRequest } from "../src/api/publicGateway";
import fs from "fs";

const publicKey = JSON.parse(fs.readFileSync("data/api_keys.json", "utf8"))[0].key;

console.log("🧪 TEST 1: Request Normal");
console.log(handlePublicRequest(publicKey, "hello aries"));

console.log("\n🧪 TEST 2: Stress Test (Rate Limit)");
console.log("Mengirim 130 request cepat...");
let lastRes: any;
for(let i=0; i<130; i++) {
  lastRes = handlePublicRequest(publicKey, "ping");
}
console.log("Hasil Terakhir (Harus 429):", lastRes.status, lastRes.error || "OK");

console.log("\n🧪 TEST 3: Quota Breach (Simulasi)");
// Paksa konsumsi besar
import { consume } from "../src/governance/usageMeter";
consume(publicKey, 100001); 
const quotaRes = handlePublicRequest(publicKey, "limit test");
console.log("Hasil (Harus 403 QUOTA_EXCEEDED):", quotaRes.status, quotaRes.error);
