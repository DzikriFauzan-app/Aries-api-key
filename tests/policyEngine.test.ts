import { routeCommand } from "../src/router/commandRouter";

async function run() {

  const emptyPayload = await routeCommand("REASON::");
  if (emptyPayload !== "POLICY_DENY: EMPTY_PAYLOAD") {
    throw new Error("FAILED EMPTY PAYLOAD POLICY");
  }

  const longPayload = await routeCommand(
    "REASON::" + "A".repeat(600)
  );
  if (longPayload !== "POLICY_DENY: PAYLOAD_TOO_LONG") {
    throw new Error("FAILED PAYLOAD LENGTH POLICY");
  }

  const valid = await routeCommand(
    "REASON::All humans are mortal. Socrates is human."
  );
  if (!valid.startsWith("ANSWER(")) {
    throw new Error("VALID POLICY BLOCKED INCORRECTLY");
  }

  console.log("POLICY ENGINE TEST PASSED");
}

run();
