import { LLMProvider, LLMRequest, LLMResponse } from "../types";

export class MockProvider implements LLMProvider {
  readonly name = "mock-v1";
  private queue: string[] = [];

  queueResponse(text: string) {
    this.queue.push(text);
  }

  async generate(_: LLMRequest): Promise<LLMResponse> {
    const text = this.queue.shift() || "{}";
    return {
      text,
      usage: {
        prompt_tokens: 1,
        completion_tokens: 1
      }
    };
  }
}
