import { TraceLogger } from "../src/audit/traceLogger";

const logger = new TraceLogger("test-trace");

logger.log("COMMAND_RECEIVED", "test", { a: 1 });
logger.log("POLICY_CHECK", "policy", { allowed: true });

const snapshot = logger.snapshot();

if (snapshot.traceId !== "test-trace") {
  throw new Error("TRACE ID MISMATCH");
}

if (snapshot.events.length !== 2) {
  throw new Error("EVENT COUNT INVALID");
}

if (snapshot.events[0].type !== "COMMAND_RECEIVED") {
  throw new Error("EVENT TYPE ORDER BROKEN");
}

console.log("TRACE LOGGER TEST PASSED");
