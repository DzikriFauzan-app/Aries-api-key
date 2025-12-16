"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGovernor = void 0;
class TokenGovernor {
    constructor(maxTokens) {
        this.maxTokens = maxTokens;
        this.used = 0;
    }
    consume(tokens) {
        if (this.used + tokens > this.maxTokens) {
            throw new Error("TOKEN_LIMIT_EXCEEDED");
        }
        this.used += tokens;
    }
    reset() {
        this.used = 0;
    }
    stats() {
        return { used: this.used, max: this.maxTokens };
    }
}
exports.TokenGovernor = TokenGovernor;
