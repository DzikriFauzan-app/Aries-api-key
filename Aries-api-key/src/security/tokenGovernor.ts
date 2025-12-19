export class TokenGovernor {
  private used = 0;

  constructor(private maxTokens: number) {}

  consume(tokens: number) {
    if (this.used + tokens > this.maxTokens) {
      throw new Error("TOKEN_LIMIT_EXCEEDED");
    }
    this.used += tokens;
  }

  reset() {
    this.used = 0;
  }

  stats() {
    return { used: this.used, max: this.maxTokens };
  }
}
