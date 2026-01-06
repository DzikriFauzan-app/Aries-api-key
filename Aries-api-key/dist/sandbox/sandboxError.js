"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandboxError = void 0;
class SandboxError extends Error {
    constructor(message) {
        super(message);
        this.name = "SandboxError";
    }
}
exports.SandboxError = SandboxError;
