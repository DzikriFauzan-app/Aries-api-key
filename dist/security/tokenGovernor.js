"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGovernor = void 0;
class TokenGovernor {
    constructor() {
        // Config: 10000 tokens max burst, refill 100 per second
        this.maxTokens = 10000;
        this.refillRate = 100;
        this.tokens = this.maxTokens;
        this.lastRefill = Date.now();
    }
    checkBudget(cost) {
        this.refill();
        if (this.tokens >= cost) {
            this.tokens -= cost;
            return true;
        }
        console.warn(`Token Governor: Budget Exceeded (Need ${cost}, Has ${this.tokens.toFixed(0)})`);
        return false;
    }
    refill() {
        const now = Date.now();
        const elapsedSeconds = (now - this.lastRefill) / 1000;
        const newTokens = elapsedSeconds * this.refillRate;
        if (newTokens > 0) {
            this.tokens = Math.min(this.maxTokens, this.tokens + newTokens);
            this.lastRefill = now;
        }
    }
}
exports.TokenGovernor = TokenGovernor;
