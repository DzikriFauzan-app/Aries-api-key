"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProvider = void 0;
class MockProvider {
    constructor() {
        this.name = "mock-v1";
        this.responseQueue = [];
    }
    // Fitur Test: Kita bisa menyuntikkan jawaban palsu antrian
    queueResponse(text) {
        this.responseQueue.push(text);
    }
    async generate(request) {
        // Simulasi latency jaringan (biar real)
        await new Promise(resolve => setTimeout(resolve, 10));
        const reply = this.responseQueue.shift() || `MOCK_ECHO: ${request.prompt}`;
        return {
            text: reply,
            usage: {
                prompt_tokens: request.prompt.length,
                completion_tokens: reply.length
            }
        };
    }
}
exports.MockProvider = MockProvider;
