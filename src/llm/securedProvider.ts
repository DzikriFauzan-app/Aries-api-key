import { LLMProvider, GenerateParams, GenerateResult } from "./types";
import { jailCheck } from "../security/llmJail";
import { TokenGovernor } from "../security/tokenGovernor";

export class SecuredLLMProvider implements LLMProvider {
  name: string;

  constructor(
    public inner: LLMProvider, // Ubah ke public agar bisa diakses test
    private governor = new TokenGovernor(4096)
  ) {
    this.name = `Secured(${inner.name})`;
  }

  async generate(params: GenerateParams): Promise<GenerateResult> {
    jailCheck(params.prompt);
    this.governor.consume(params.prompt.length);

    const res = await this.inner.generate(params);

    jailCheck(res.text);
    this.governor.consume(res.text.length);

    return res;
  }
}
