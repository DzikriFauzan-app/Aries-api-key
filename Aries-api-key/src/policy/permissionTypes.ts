/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


export type AgentRole = string;
export type AgentName = string;
export type AgentCommand = string;

export interface PermissionRule {
  agent: AgentName;
  role: AgentRole;
  allow: AgentCommand[];
}
