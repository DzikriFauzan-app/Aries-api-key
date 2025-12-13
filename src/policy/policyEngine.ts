export class PolicyViolationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PolicyViolationError";
  }
}

export class PolicyEngine {

  public preExecute(command: string, payload: string): void {
    if (!payload || payload.trim().length === 0) {
      throw new PolicyViolationError("POLICY_DENY: EMPTY_PAYLOAD");
    }

    if (payload.length > 500) {
      throw new PolicyViolationError("POLICY_DENY: PAYLOAD_TOO_LONG");
    }
  }

  public postExecute(output: string): void {
    if (!output || output.trim().length === 0) {
      throw new PolicyViolationError("POLICY_DENY: EMPTY_OUTPUT");
    }

    if (!output.startsWith("ANSWER(")) {
      throw new PolicyViolationError("POLICY_DENY: INVALID_OUTPUT_FORMAT");
    }
  }

  // MEMORY POLICIES
  public memoryWrite(key: string, value: string): void {
    if (!key || key.trim().length === 0) {
      throw new PolicyViolationError("POLICY_DENY: EMPTY_MEMORY_KEY");
    }
    if (!value || value.trim().length === 0) {
      throw new PolicyViolationError("POLICY_DENY: EMPTY_MEMORY_VALUE");
    }
    if (value.length > 1000) {
      throw new PolicyViolationError("POLICY_DENY: MEMORY_VALUE_TOO_LONG");
    }
  }

  public memoryRead(key: string): void {
    if (!key || key.trim().length === 0) {
      throw new PolicyViolationError("POLICY_DENY: EMPTY_MEMORY_KEY");
    }
  }
}
