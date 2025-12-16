export class TokenGovernor {
  private tokens: number;
  private lastRefill: number;
  
  // Config: 10000 tokens max burst, refill 100 per second
  private readonly maxTokens = 10000;
  private readonly refillRate = 100; 

  constructor() {
    this.tokens = this.maxTokens;
    this.lastRefill = Date.now();
  }

  checkBudget(cost: number): boolean {
    this.refill();
    if (this.tokens >= cost) {
      this.tokens -= cost;
      return true;
    }
    console.warn(`Token Governor: Budget Exceeded (Need ${cost}, Has ${this.tokens.toFixed(0)})`);
    return false;
  }

  private refill() {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefill) / 1000;
    const newTokens = elapsedSeconds * this.refillRate;
    
    if (newTokens > 0) {
      this.tokens = Math.min(this.maxTokens, this.tokens + newTokens);
      this.lastRefill = now;
    }
  }
}
