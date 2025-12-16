"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProvider = void 0;
class MockProvider {
    constructor(name = "mock") {
        this.responseQueue = [];
        this.name = name;
    }
    // Fitur penting untuk Test Injection
    queueResponse(response) {
        this.responseQueue.push(response);
    }
    async generate(params) {
        // Jika ada antrian respon, pakai itu
        if (this.responseQueue.length > 0) {
            const queuedText = this.responseQueue.shift();
            return {
                text: queuedText,
                usage: { promptTokens: params.prompt.length, completionTokens: queuedText.length }
            };
        }
        // Default response jika antrian kosong
        return {
            text: `[MOCK] Response to: ${params.prompt}`,
            usage: {
                promptTokens: params.prompt.length,
                completionTokens: 10
            }
        };
    }
}
exports.MockProvider = MockProvider;
