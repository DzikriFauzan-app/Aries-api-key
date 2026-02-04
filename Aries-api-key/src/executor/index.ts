/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
import { internalExecute } from "./internalExecute";


export async function dispatch(payload: any) {
  return internalExecute(payload);
}
