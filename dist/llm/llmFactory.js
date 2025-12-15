"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMFactory = void 0;
const mockProvider_1 = require("./providers/mockProvider");
const ollamaProvider_1 = require("./providers/ollamaProvider");
class LLMFactory {
    static create(type = "mock") {
        switch (type) {
            case "ollama":
                return new ollamaProvider_1.OllamaProvider("llama3"); // Default model
            case "mock":
            default:
                return new mockProvider_1.MockProvider();
        }
    }
}
exports.LLMFactory = LLMFactory;
