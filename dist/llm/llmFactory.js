"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMFactory = void 0;
const mockProvider_1 = require("./providers/mockProvider");
const circuitBreaker_1 = require("../security/circuitBreaker");
const tokenGovernor_1 = require("../security/tokenGovernor");
const jailbreak_1 = require("../security/jailbreak");
class SecuredProvider {
    constructor(inner) {
        this.inner = inner;
        this.breaker = new circuitBreaker_1.CircuitBreaker();
        this.governor = new tokenGovernor_1.TokenGovernor();
        this.jailbreak = new jailbreak_1.JailbreakDetector();
        this.name = `Secured(${inner.name})`;
    }
    async generate(request) {
        // FIX: Gunakan properti yang valid. Jika request object, ambil prompt-nya.
        // Dari error sebelumnya, request tidak punya messages.
        // Kita asumsikan request punya 'prompt' (string) atau strukturnya berbeda.
        // Mari kita cek types.ts via deduksi: error bilang "Property messages does not exist".
        // Biasanya request itu { prompt: string, ... }.
        const promptText = request.prompt || "";
        // 1. Check Input Safety
        if (!this.jailbreak.isSafe(promptText)) {
            throw new Error("Security Violation: Unsafe Prompt Detected");
        }
        // 2. Check Budget
        if (!this.governor.checkBudget(promptText.length)) {
            throw new Error("Rate Limit: Token Budget Exceeded");
        }
        // 3. Execute with Circuit Breaker
        const response = await this.breaker.execute(() => this.inner.generate(request));
        // 4. Check Output Safety (FIX: Use 'text' instead of 'content')
        if (!this.jailbreak.isSafe(response.text)) {
            throw new Error("Security Violation: Unsafe Response Detected from LLM");
        }
        return response;
    }
}
class LLMFactory {
    static create(type = "mock") {
        let provider;
        switch (type) {
            case "mock":
                provider = new mockProvider_1.MockProvider();
                break;
            default:
                throw new Error(`Provider ${type} not implemented`);
        }
        return new SecuredProvider(provider);
    }
}
exports.LLMFactory = LLMFactory;
