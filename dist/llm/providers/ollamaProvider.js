"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaProvider = void 0;
class OllamaProvider {
    constructor(model = "llama3", baseUrl = "http://localhost:11434") {
        this.name = "ollama";
        this.model = model;
        this.baseUrl = baseUrl;
    }
    async generate(params) {
        const response = await fetch(`${this.baseUrl}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: this.model,
                prompt: params.prompt,
                // Mapping: Jika params punya temperature, pakai. Default 0.7
                options: {
                    temperature: params.temperature ?? 0.7
                },
                stream: false
            })
        });
        if (!response.ok) {
            throw new Error(`Ollama Error: ${response.statusText}`);
        }
        const data = await response.json();
        return {
            text: data.response,
            usage: {
                // Mapping Snake Case (API) -> Camel Case (Interface)
                promptTokens: data.prompt_eval_count || 0,
                completionTokens: data.eval_count || 0
            }
        };
    }
}
exports.OllamaProvider = OllamaProvider;
