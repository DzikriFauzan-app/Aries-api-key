export function enforceQuota(used: number, quota: number) {
  if (used > quota) {
    throw new Error("QUOTA_EXCEEDED");
  }
}
