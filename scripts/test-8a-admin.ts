import { handleAdminRequest } from "../src/api/adminGateway";
import fs from "fs";

const ownerKey = JSON.parse(fs.readFileSync("data/owner.key.json", "utf8")).key;
const publicKey = JSON.parse(fs.readFileSync("data/api_keys.json", "utf8"))[0].key;

console.log("🧪 TEST 1: Memakai Public Key untuk perintah Admin");
const fail = handleAdminRequest(publicKey, "generate-key");
console.log("Hasil (Harus 403):", fail.status);

console.log("\n🧪 TEST 2: Memakai Owner Key untuk perintah Admin");
const success = handleAdminRequest(ownerKey, "generate-key");
console.log("Hasil (Harus 200):", success.status);
if(success.status === 200) console.log("New Key Generated:", (success.result as any).key);
