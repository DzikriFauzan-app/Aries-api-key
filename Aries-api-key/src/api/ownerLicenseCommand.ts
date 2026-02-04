/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
import { setLicense } from "./licenseStore";
import { Plan } from "./licenseTypes";


export function ownerLicenseCommand(cmd: string) {
  if (!cmd.startsWith("license")) return null;

  const [, apiKey, plan] = cmd.split(" ");

  setLicense(apiKey, plan as Plan);

  return {
    status: "LICENSE_UPDATED",
    apiKey,
    plan
  };
}
