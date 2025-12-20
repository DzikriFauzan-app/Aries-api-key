import { StripeSecurity } from "./src/billing/stripeSecurity";
import * as crypto from "crypto";

const SECRET = "whsec_master_aries_key";
const PAYLOAD = JSON.stringify({ type: "invoice.paid", data: { object: { metadata: { userId: "TARGET" } } } });
const TIMESTAMP = Math.floor(Date.now() / 1000).toString();

// 1. BUAT SIGNATURE ASLI
const signedPayload = `${TIMESTAMP}.${PAYLOAD}`;
const validSig = `t=${TIMESTAMP},v1=${crypto.createHmac("sha256", SECRET).update(signedPayload).digest("hex")}`;

// 2. BUAT SIGNATURE PALSU (Hacker)
const fakeSig = `t=${TIMESTAMP},v1=hacker_signature_12345`;

console.log("=== STRIPE SECURITY TEST ===");

// Tes 1: Harus Lolos
const test1 = StripeSecurity.verify(PAYLOAD, validSig, SECRET);
console.log("Valid Signature Test:", test1 ? "✅ PASSED" : "❌ FAILED");

// Tes 2: Harus Ditolak (Return false)
const test2 = StripeSecurity.verify(PAYLOAD, fakeSig, SECRET);
console.log("Hacker Signature Test:", !test2 ? "✅ REJECTED (SAFE)" : "❌ FAILED (VULNERABLE)");
