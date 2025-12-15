/**
 * Daftar Event Resmi Aries System.
 * Penambahan event baru harus lewat sini agar Type Safe.
 */
export type EventType = 
  | "SYSTEM_START"       // Saat kernel boot
  | "SYSTEM_SHUTDOWN"    // Saat kernel mati
  | "AGENT_COMMAND"      // Perintah masuk dari Gateway -> Agent
  | "AGENT_RESPONSE"     // Jawaban dari Agent -> Gateway
  | "TASK_ASSIGNED"      // Orchestrator menunjuk Worker
  | "TASK_COMPLETED"     // Worker selesai
  | "TASK_FAILED"        // Worker gagal (dengan error trace)
  | "MEMORY_UPDATED"     // MemoryController menulis sesuatu
  | "MEMORY_PRUNED"      // MemoryController membuang sampah
  | "AUDIT_LOG"          // Log sistem (untuk debug/forensik)
  | "*";                 // Wildcard (untuk Global Listener)

export interface AriesEvent {
  id: string;            // UUID v4
  type: EventType;
  payload: any;          // Data flexible namun terstruktur di runtime
  source: string;        // Nama Agent / Komponen pengirim
  timestamp: number;     // Unix Epoch ms
  correlationId?: string;// ID untuk melacak rantai request-response
}

export type EventHandler = (event: AriesEvent) => Promise<void>;
