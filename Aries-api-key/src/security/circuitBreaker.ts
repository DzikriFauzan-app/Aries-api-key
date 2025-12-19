export class CircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private state: "CLOSED" | "OPEN" | "HALF_OPEN" = "CLOSED";
  
  // Config
  private readonly threshold = 5; // Max failures
  private readonly timeout = 10000; // 10 seconds cool-down

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "OPEN") {
      if (Date.now() - this.lastFailure > this.timeout) {
        this.state = "HALF_OPEN";
      } else {
        throw new Error("CircuitBreaker: OPEN (Too many failures, cooling down)");
      }
    }

    try {
      const result = await fn();
      this.reset();
      return result;
    } catch (err) {
      this.recordFailure();
      throw err;
    }
  }

  private recordFailure() {
    this.failures++;
    this.lastFailure = Date.now();
    if (this.failures >= this.threshold) {
      this.state = "OPEN";
      console.warn("CircuitBreaker: Tripped to OPEN state!");
    }
  }

  private reset() {
    this.failures = 0;
    this.state = "CLOSED";
  }
}
