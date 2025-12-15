export interface LLMRequest {
  system?: string;     // Instruksi dasar ("Kamu adalah Aries...")
  prompt: string;      // Pertanyaan user / System prompt dinamis
  temperature?: number; // Kreativitas (0 = Robot, 1 = Seniman)
}

export interface LLMResponse {
  text: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
  };
}

// Interface Utama: Semua otak harus patuh pada kontrak ini
export interface LLMProvider {
  name: string;
  generate(request: LLMRequest): Promise<LLMResponse>;
}
