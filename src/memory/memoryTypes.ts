// --- STEP 20 NEW TYPES ---
export type MemoryScope = "SESSION" | "USER" | "SYSTEM";
export type MemoryAction = "MEMORY_READ" | "MEMORY_WRITE";

export interface MemoryAuthority {
  signature: string;
  scope: MemoryScope;
  issuedAt: number;
}

export interface MemoryPayload {
  action: MemoryAction;
  scope: MemoryScope;
  key: string;
  value?: any;
  authority: MemoryAuthority;
}

// --- LEGACY TYPES (RESTORED) ---
// Kita pertahankan ini agar test lama/modul lain tidak patah
export interface MemoryRecord {
  id: string;
  agentId: string;
  content: string;
  timestamp: number;
  tags: string[];
  isSensitive: boolean;
}
