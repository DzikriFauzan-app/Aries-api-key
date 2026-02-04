/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


export type AgentRole = "ROOT" | "COMMANDER" | "WORKER" | "OBSERVER";

export interface AgentPermission {
  canApprove: boolean;
  canExecute: boolean;
}

export const ROLE_PERMISSIONS: Record<AgentRole, AgentPermission> = {
  ROOT: { canApprove: true, canExecute: true },
  COMMANDER: { canApprove: true, canExecute: true },
  WORKER: { canApprove: false, canExecute: true },
  OBSERVER: { canApprove: false, canExecute: false }
};
