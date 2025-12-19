export function resolveTenant(apiKey: string) {
  return {
    tenantId: "tenant-" + apiKey.slice(-12),
    memoryNamespace: "mem-" + apiKey.slice(-12),
    usageNamespace: "usage-" + apiKey.slice(-12)
  };
}
