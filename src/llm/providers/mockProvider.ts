import { LLMProvider, LLMRequest, LLMResponse } from "../types";

export class MockProvider implements LLMProvider {
  readonly name = "mock-v1";
  private responseQueue: string[] = [];

  // Fitur Test: Kita bisa menyuntikkan jawaban palsu antrian
  queueResponse(text: string) {
    this.responseQueue.push(text);
  }

  async generate(request: LLMRequest): Promise<LLMResponse> {
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
