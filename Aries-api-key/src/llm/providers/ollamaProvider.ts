import { LLMProvider, GenerateParams, GenerateResult } from "../types";

export class OllamaProvider implements LLMProvider {
  name = "ollama";
  private baseUrl: string;
  private model: string;

  constructor(model = "llama3", baseUrl = "http://localhost:11434") {
    this.model = model;
    this.baseUrl = baseUrl;
  }

  async generate(params: GenerateParams): Promise<GenerateResult> {
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
