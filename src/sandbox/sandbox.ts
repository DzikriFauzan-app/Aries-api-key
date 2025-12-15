import * as fs from "fs/promises";
import * as path from "path";
import { SandboxPolicy, DEFAULT_SANDBOX_POLICY } from "./sandboxPolicy";
import { SandboxError } from "./sandboxError";

export class Sandbox {
  private root: string;
  private policy: SandboxPolicy;

  constructor(rootPath: string, policy: SandboxPolicy = DEFAULT_SANDBOX_POLICY) {
    this.root = path.resolve(process.cwd(), rootPath);
    this.policy = policy;
  }

  private resolveSafe(target: string): string {
    const resolved = path.resolve(this.root, target);
    if (!resolved.startsWith(this.root)) {
      throw new SandboxError("Path traversal blocked");
    }
    return resolved;
  }

  async readFile(target: string): Promise<string> {
    if (!this.policy.allowRead) {
      throw new SandboxError("Read not allowed");
    }
    const file = this.resolveSafe(target);
    return fs.readFile(file, "utf-8");
  }

  async writeFile(target: string, content: string): Promise<void> {
    if (!this.policy.allowWrite) {
      throw new SandboxError("Write not allowed");
    }

    const sizeKB = Buffer.byteLength(content, "utf-8") / 1024;
    if (sizeKB > this.policy.maxFileSizeKB) {
      throw new SandboxError("Quota exceeded");
    }

    const file = this.resolveSafe(target);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, content, "utf-8");
  }

  async listDir(target: string): Promise<string[]> {
    const dir = this.resolveSafe(target);
    return fs.readdir(dir);
  }
}
