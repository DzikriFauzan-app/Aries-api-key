"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandRouter_1 = require("../src/router/commandRouter");
async function run() {
    const result = await (0, commandRouter_1.routeCommand)("REASON::All humans are mortal. Socrates is human.");
    if (result !==
        "ANSWER(VALID(INFERRED(All humans are mortal. Socrates is human.)))") {
        throw new Error("ROUTER OUTPUT MISMATCH");
    }
    console.log("COMMAND ROUTER TEST PASSED");
}
run();
