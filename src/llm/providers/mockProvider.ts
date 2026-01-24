import { LLMProvider, GenerateParams, GenerateResult } from "../types";

export class MockProvider implements LLMProvider {
  name: string;
  private responseQueue: string[] = [];

  constructor(name: string = "mock") {
    this.name = name;
  }

  // Fitur penting untuk Test Injection
  queueResponse(response: string) {
    this.responseQueue.push(response);
  }

  async generate(params: GenerateParams): Promise<GenerateResult> {
    // Jika ada antrian respon, pakai itu
    if (this.responseQueue.length > 0) {
      const queuedText = this.responseQueue.shift()!;
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
