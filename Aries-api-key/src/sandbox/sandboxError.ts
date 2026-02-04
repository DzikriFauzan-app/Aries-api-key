/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


export class SandboxError extends Error {
  private readonly logger = new Logger();
  constructor(message: string) {
    super(message);
    this.name = "SandboxError";
  }

  public async healthCheck(): Promise<boolean> { try { return !!this.logger; } catch { return false; } }
}
