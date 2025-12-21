import { OtpLedger } from "../billing/otpLedger";

export const getSystemStatus = () => {
  return {
    status: "SOVEREIGN_ONLINE",
    timestamp: new Date().toISOString(),
    engine: "ARIES-V2",
    gatekeeper: {
      active_sessions: OtpLedger.size(),
      memory_usage: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
    }
  };
};
