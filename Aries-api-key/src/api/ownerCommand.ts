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
