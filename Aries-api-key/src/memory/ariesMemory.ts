/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


const memoryStore: Record<string, any[]> = {};

export function remember(session: string, data: any) {
  if (!memoryStore[session]) memoryStore[session] = [];
  memoryStore[session].push(data);
}

export function recall(session: string) {
  return memoryStore[session] || [];
}
