"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaProvider = void 0;
class OllamaProvider {
    constructor(model = "llama3", baseUrl = "http://localhost:11434") {
        this.name = "ollama-local";
        this.model = model;
        this.baseUrl = baseUrl;
    }
    async generate(request) {
        try {
            const payload = {
                model: this.model,
                prompt: request.prompt,
                system: request.system,
                stream: false, // Kita pakai non-streaming dulu untuk simplifikasi awal
                options: {
                    temperature: request.temperature || 0.7
                }
            };
            const res = await fetch(`${this.baseUrl}/api/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                throw new Error(`Ollama Error: ${res.statusText}`);
            }
            const data = await res.json(); // Casting any karena struktur Ollama dinamis
            return {
                text: data.response,
                usage: {
                    prompt_tokens: data.prompt_eval_count || 0,
                    completion_tokens: data.eval_count || 0
                }
            };
        }
        catch (err) {
            // Error handling standard
            throw new Error(`LLM Generation Failed: ${err.message}`);
        }
    }
}
exports.OllamaProvider = OllamaProvider;
