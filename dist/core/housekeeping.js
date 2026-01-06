"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startHousekeeping = startHousekeeping;
const otpLedger_1 = require("../billing/otpLedger");
function startHousekeeping() {
    console.log("[SYSTEM] Housekeeping Service Started (Every 30s)");
    setInterval(() => {
        otpLedger_1.OtpLedger.purgeExpired();
    }, 30000);
}
