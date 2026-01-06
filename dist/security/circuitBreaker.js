"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = void 0;
class CircuitBreaker {
    constructor() {
        this.failures = 0;
        this.lastFailure = 0;
        this.state = "CLOSED";
        // Config
        this.threshold = 5; // Max failures
        this.timeout = 10000; // 10 seconds cool-down
    }
    async execute(fn) {
        if (this.state === "OPEN") {
            if (Date.now() - this.lastFailure > this.timeout) {
                this.state = "HALF_OPEN";
            }
            else {
                throw new Error("CircuitBreaker: OPEN (Too many failures, cooling down)");
            }
        }
        try {
            const result = await fn();
            this.reset();
            return result;
        }
        catch (err) {
            this.recordFailure();
            throw err;
        }
    }
    recordFailure() {
        this.failures++;
        this.lastFailure = Date.now();
        if (this.failures >= this.threshold) {
            this.state = "OPEN";
            console.warn("CircuitBreaker: Tripped to OPEN state!");
        }
    }
    reset() {
        this.failures = 0;
        this.state = "CLOSED";
    }
}
exports.CircuitBreaker = CircuitBreaker;
