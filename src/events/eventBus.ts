import { AriesEvent, EventHandler, EventType } from "./eventTypes";

/**
 * PRODUCTION GRADE EVENT BUS
 * Fitur:
 * - Async Parallel Execution
 * - Error Isolation (Safe Dispatch)
 * - Wildcard Support ('*')
 * - Memory Leak Protection (Unsubscribe)
 */
export class EventBus {
  private subscribers = new Map<EventType, EventHandler[]>();

  constructor() {
    // Inisialisasi map kosong
  }

  /**
   * Mendaftarkan handler untuk tipe event tertentu.
   * Mendukung multiple handler per event type.
   */
  subscribe(type: EventType, handler: EventHandler): void {
    const handlers = this.subscribers.get(type) || [];
    // Cegah duplikasi handler yang sama (idempotent)
    if (!handlers.includes(handler)) {
      handlers.push(handler);
      this.subscribers.set(type, handlers);
    }
  }

  /**
   * Melepas handler (Wajib dipanggil saat komponen dimatikan).
   */
  unsubscribe(type: EventType, handler: EventHandler): void {
    const handlers = this.subscribers.get(type);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
        // Optimasi: Hapus key jika array kosong untuk hemat memori
        if (handlers.length === 0) {
          this.subscribers.delete(type);
        } else {
          this.subscribers.set(type, handlers);
        }
      }
    }
  }

  /**
   * Mengirim event ke seluruh sistem.
   * Non-blocking (Fire and Forget secara logis, tapi bisa di-await).
   */
  async publish(event: AriesEvent): Promise<void> {
    // 1. Ambil listener spesifik
    const specificHandlers = this.subscribers.get(event.type) || [];
    
    // 2. Ambil listener wildcard (Global Observers)
    const wildcardHandlers = this.subscribers.get("*") || [];

    // Gabung semua listener unik
    const allHandlers = [...specificHandlers, ...wildcardHandlers];

    if (allHandlers.length === 0) return;

    // 3. Eksekusi Paralel (Promise.allSettled like mechanism)
    // Kita pakai Promise.all manual dengan try-catch agar performa maksimal
    const executions = allHandlers.map(async (handler) => {
      try {
        await handler(event);
      } catch (err) {
        // CRITICAL: Error di listener TIDAK BOLEH mematikan EventBus
        // Log ke stderr karena ini anomali sistem
        console.error(`[EventBus] CRITICAL ERROR on handler for ${event.type}:`, err);
        // Di sistem real, kita bisa emit event 'SYSTEM_ERROR' di sini,
        // tapi hati-hati infinite loop!
      }
    });

    await Promise.all(executions);
  }
  
  /**
   * Helper untuk debug: Melihat jumlah listener aktif
   */
  listenerCount(type: EventType): number {
    return (this.subscribers.get(type) || []).length;
  }
}
