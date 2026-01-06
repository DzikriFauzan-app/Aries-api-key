"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JailbreakDetector = void 0;
class JailbreakDetector {
    constructor() {
        this.patterns = [
            /ignore previous instructions/i,
            /delete all files/i,
            /system override/i,
            /rm -rf \//i, // Specific dangerous rm
            /drop table/i
        ];
    }
    isSafe(content) {
        if (!content)
            return true;
        for (const pattern of this.patterns) {
            if (pattern.test(content)) {
                console.warn(`Security: Jailbreak/Unsafe content detected -> ${pattern}`);
                return false;
            }
        }
        return true;
    }
}
exports.JailbreakDetector = JailbreakDetector;
