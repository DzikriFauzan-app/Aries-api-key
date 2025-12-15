"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProvider = void 0;
class MockProvider {
    constructor() {
        this.name = "mock-v1";
        this.queue = [];
    }
    queueResponse(text) {
        this.queue.push(text);
    }
    async generate(_) {
        const text = this.queue.shift() || "{}";
        return {
            text,
            usage: {
                prompt_tokens: 1,
                completion_tokens: 1
            }
        };
    }
}
exports.MockProvider = MockProvider;
