/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


export interface Tool {
  readonly name: string;
  run(input: string): Promise<string>;
}
