/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
import { setLicense } from "./licenseStore";
import { Plan } from "./licenseTypes";


export function handleOwnerCommand(cmd: string) {
  if (cmd.startsWith("upgrade")) {
    const [, apiKey, plan] = cmd.split(" ");
    setLicense(apiKey, plan as Plan);
    return { status: "UPGRADED", apiKey, plan };
  }
  return null;
}
