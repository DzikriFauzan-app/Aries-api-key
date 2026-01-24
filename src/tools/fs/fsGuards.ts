const ROOT = "/workspace";

export function normalizePath(path: string): string {
  if (path.includes("..")) {
    throw new Error("Path traversal detected");
  }
  if (!path.startsWith(ROOT)) {
    throw new Error("Access outside workspace denied");
  }
  return path;
}

export function enforceSize(content: string | undefined, maxKB: number) {
  if (!content) return;
  const sizeKB = Buffer.byteLength(content, "utf8") / 1024;
  if (sizeKB > maxKB) {
    throw new Error("File size limit exceeded");
  }
}
