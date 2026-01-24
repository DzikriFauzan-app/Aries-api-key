import { AuditLogger } from "../audit/auditLogger";

(() => {
  const log = new AuditLogger();

  log.log({
    ts: Date.now(),
    type: "AGENT_COMMAND",
    agent: "alpha",
    role: "WORKER",
    action: "PING"
  });

  const events = log.all();
  if (events.length !== 1) {
    throw new Error("AUDIT LOGGER FAILED");
  }

  console.log("AUDIT LOGGER TEST PASSED");
})();
