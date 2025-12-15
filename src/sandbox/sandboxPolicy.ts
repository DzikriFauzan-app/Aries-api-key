export type SandboxPolicy = {
  maxFileSizeKB: number;
  allowWrite: boolean;
  allowRead: boolean;
};

export const DEFAULT_SANDBOX_POLICY: SandboxPolicy = {
  maxFileSizeKB: 64,   // HARD LIMIT
  allowWrite: true,
  allowRead: true
};
