/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
import { ariesBrainExecute } from "../brain/ariesBrain";


export async function feacLoop(input: string) {
  return ariesBrainExecute(input, {
    caller: "feac",
    session_id: "FEAC_SESSION",
    user_id: "FEAC_SYSTEM"
  });
}
