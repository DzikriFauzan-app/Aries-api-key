import { LLMProvider } from "./types";
import { MockProvider } from "./providers/mockProvider";
import { OllamaProvider } from "./providers/ollamaProvider";

export type ProviderType = "mock" | "ollama";

export class LLMFactory {
  static create(type: ProviderType = "mock"): LLMProvider {
    switch (type) {
      case "ollama":
        return new OllamaProvider("llama3"); // Default model
      case "mock":
      default:
        return new MockProvider();
    }
  }
}
