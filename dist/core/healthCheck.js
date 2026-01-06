"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemStatus = void 0;
const otpLedger_1 = require("../billing/otpLedger");
const getSystemStatus = () => {
    return {
        status: "SOVEREIGN_ONLINE",
        timestamp: new Date().toISOString(),
        engine: "ARIES-V2",
        gatekeeper: {
            active_sessions: otpLedger_1.OtpLedger.size(),
            memory_usage: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
        }
    };
};
exports.getSystemStatus = getSystemStatus;
