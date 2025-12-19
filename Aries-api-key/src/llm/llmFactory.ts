import { MockProvider } from "./providers/mockProvider";
import { SecuredLLMProvider } from "./securedProvider";

export class LLMFactory {
  static create(name: string) {
    if (name === "mock") {
      // Default mock provider wrapped with Security Layer
      return new SecuredLLMProvider(new MockProvider("mock-v1"));
    }
    throw new Error("Unknown LLM provider: " + name);
  }
}
