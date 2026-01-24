export interface GenerateParams {
  prompt: string;
  temperature?: number;
}

export interface GenerateResult {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

export interface LLMProvider {
  name: string;
  generate(params: GenerateParams): Promise<GenerateResult>;
}

// Alias untuk Backward Compatibility (agar Ollama tidak error)
export type LLMRequest = GenerateParams;
export type LLMResponse = GenerateResult;
