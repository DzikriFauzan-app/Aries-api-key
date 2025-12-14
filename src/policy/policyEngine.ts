export class PolicyViolationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PolicyViolationError";
  }
}

export class PolicyEngine {

  preExecute(command: string, payload: string): void {
    if (!payload || payload.length === 0) {
      throw new PolicyViolationError("POLICY_DENY: EMPTY_PAYLOAD");
    }
    if (payload.length > 512) {
      throw new PolicyViolationError("POLICY_DENY: PAYLOAD_TOO_LONG");
    }
  }

  postExecute(_output: string): void {
    // reserved for audit / future enforcement
  }

  memoryWrite(key: string, value: string): void {
    if (!key || !value) {
      throw new PolicyViolationError("POLICY_DENY: INVALID_MEMORY_WRITE");
    }
  }

  memoryRead(key: string): void {
    if (!key || key.length === 0) {
      throw new PolicyViolationError("POLICY_DENY: EMPTY_MEMORY_KEY");
    }
  }
}
