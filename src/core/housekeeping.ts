import { OtpLedger } from "../billing/otpLedger";

export function startHousekeeping() {
  console.log("[SYSTEM] Housekeeping Service Started (Every 30s)");
  setInterval(() => {
    OtpLedger.purgeExpired();
  }, 30_000); 
}
