"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMFactory = void 0;
const mockProvider_1 = require("./providers/mockProvider");
const securedProvider_1 = require("./securedProvider");
class LLMFactory {
    static create(name) {
        if (name === "mock") {
            // Default mock provider wrapped with Security Layer
            return new securedProvider_1.SecuredLLMProvider(new mockProvider_1.MockProvider("mock-v1"));
        }
        throw new Error("Unknown LLM provider: " + name);
    }
}
exports.LLMFactory = LLMFactory;
