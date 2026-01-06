"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jailCheck = jailCheck;
const JAIL_PATTERNS = [
    /ignore previous instructions/i,
    /system prompt/i,
    /rm -rf/i,
    /sudo/i,
    /exec\(/i
];
function jailCheck(input) {
    for (const p of JAIL_PATTERNS) {
        if (p.test(input)) {
            throw new Error(`LLM_JAIL_TRIGGERED: ${p}`);
        }
    }
}
