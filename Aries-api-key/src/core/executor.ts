/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
import { reportBug } from "../repair/autoRepair";


export function initGlobalHandlers() {
  process.on("uncaughtException", (err) => {
    reportBug(err, "runtime");
  });
  process.on("unhandledRejection", (err: any) => {
    reportBug(err, "promise");
  });
}
