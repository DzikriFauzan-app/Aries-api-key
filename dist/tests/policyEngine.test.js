"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandRouter_1 = require("../src/router/commandRouter");
async function run() {
    const emptyPayload = await (0, commandRouter_1.routeCommand)("REASON::");
    if (emptyPayload !== "POLICY_DENY: EMPTY_PAYLOAD") {
        throw new Error("FAILED EMPTY PAYLOAD POLICY");
    }
    const longPayload = await (0, commandRouter_1.routeCommand)("REASON::" + "A".repeat(600));
    if (longPayload !== "POLICY_DENY: PAYLOAD_TOO_LONG") {
        throw new Error("FAILED PAYLOAD LENGTH POLICY");
    }
    const valid = await (0, commandRouter_1.routeCommand)("REASON::All humans are mortal. Socrates is human.");
    if (!valid.startsWith("ANSWER(")) {
        throw new Error("VALID POLICY BLOCKED INCORRECTLY");
    }
    console.log("POLICY ENGINE TEST PASSED");
}
run();
