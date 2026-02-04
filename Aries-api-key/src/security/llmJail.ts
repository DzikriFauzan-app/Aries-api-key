/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


const JAIL_PATTERNS = [
  /ignore previous instructions/i,
  /system prompt/i,
  /rm -rf/i,
  /sudo/i,
  /exec\(/i
];

export function jailCheck(input: string) {
  for (const p of JAIL_PATTERNS) {
    if (p.test(input)) {
      throw new Error(`LLM_JAIL_TRIGGERED: ${p}`);
    }
  }
}
