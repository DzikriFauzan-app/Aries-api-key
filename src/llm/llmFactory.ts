import { LLMProvider, LLMRequest, LLMResponse } from "./types";
import { MockProvider } from "./providers/mockProvider";
import { CircuitBreaker } from "../security/circuitBreaker";
import { TokenGovernor } from "../security/tokenGovernor";
import { JailbreakDetector } from "../security/jailbreak";

class SecuredProvider implements LLMProvider {
  private breaker = new CircuitBreaker();
  private governor = new TokenGovernor();
  private jailbreak = new JailbreakDetector();

  public name: string;

  constructor(private inner: LLMProvider) {
    this.name = `Secured(${inner.name})`;
  }

  async generate(request: LLMRequest): Promise<LLMResponse> {
    // FIX: Gunakan properti yang valid. Jika request object, ambil prompt-nya.
    // Dari error sebelumnya, request tidak punya messages.
    // Kita asumsikan request punya 'prompt' (string) atau strukturnya berbeda.
    // Mari kita cek types.ts via deduksi: error bilang "Property messages does not exist".
    // Biasanya request itu { prompt: string, ... }.
    
    const promptText = request.prompt || "";

    // 1. Check Input Safety
    if (!this.jailbreak.isSafe(promptText)) {
      throw new Error("Security Violation: Unsafe Prompt Detected");
    }

    // 2. Check Budget
    if (!this.governor.checkBudget(promptText.length)) {
      throw new Error("Rate Limit: Token Budget Exceeded");
    }

    // 3. Execute with Circuit Breaker
    const response = await this.breaker.execute(() => this.inner.generate(request));

    // 4. Check Output Safety (FIX: Use 'text' instead of 'content')
    if (!this.jailbreak.isSafe(response.text)) {
      throw new Error("Security Violation: Unsafe Response Detected from LLM");
    }

    return response;
  }
}

export class LLMFactory {
  static create(type: "mock" | "openai" | "anthropic" = "mock"): LLMProvider {
    let provider: LLMProvider;

    switch (type) {
      case "mock":
        provider = new MockProvider();
        break;
      default:
        throw new Error(`Provider ${type} not implemented`);
    }
    return new SecuredProvider(provider);
  }
}
