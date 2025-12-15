"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenchmarkRunner = void 0;
const eventBus_1 = require("../events/eventBus");
const memoryController_1 = require("../memory/memoryController");
const crypto_1 = require("crypto");
class BenchmarkRunner {
    constructor() {
        this.bus = new eventBus_1.EventBus();
        this.memory = new memoryController_1.MemoryController(this.bus);
        this.memory.start();
    }
    async run() {
        console.log("Starting Aries Benchmark (Event-Driven)...");
        const iterations = 1000;
        const start = process.hrtime();
        let completed = 0;
        let errors = 0;
        const donePromise = new Promise((resolve) => {
            // Listener Sukses
            this.bus.subscribe("MEMORY_RESULT", async () => {
                completed++;
                checkDone();
            });
            // Listener Gagal (PENTING: Agar tidak hang jika kena policy)
            this.bus.subscribe("MEMORY_DENIED", async (evt) => {
                completed++;
                errors++;
                // Print error pertama untuk debug
                if (errors === 1)
                    console.error("[Bench Error Sample]", evt.payload.error);
                checkDone();
            });
            function checkDone() {
                if (completed >= iterations)
                    resolve();
            }
        });
        // Blast 1000 Events
        // FIX: Gunakan Key yang sesuai Policy (SessionID + :)
        const sessionId = "bench-sess";
        for (let i = 0; i < iterations; i++) {
            this.bus.publish({
                id: (0, crypto_1.randomUUID)(),
                type: "MEMORY_WRITE",
                source: "BENCHMARK",
                timestamp: Date.now(),
                correlationId: sessionId,
                payload: {
                    action: "MEMORY_WRITE",
                    scope: "SESSION",
                    key: `${sessionId}:data:${i}`, // FIX: Prefix Matching
                    value: "payload_data",
                    authority: {
                        signature: "bench-sig",
                        scope: "SESSION",
                        issuedAt: Date.now()
                    }
                }
            });
        }
        await donePromise;
        const [seconds, nanoseconds] = process.hrtime(start);
        const totalMs = seconds * 1000 + nanoseconds / 1e6;
        const throughput = (iterations / (totalMs / 1000)).toFixed(2);
        console.log(`\nBenchmark Results:`);
        console.log(`- Operations: ${iterations}`);
        console.log(`- Errors:     ${errors}`);
        console.log(`- Total Time: ${totalMs.toFixed(2)}ms`);
        console.log(`- Throughput: ${throughput} ops/sec`);
        if (errors > 0)
            throw new Error("Benchmark finished with errors!");
    }
}
exports.BenchmarkRunner = BenchmarkRunner;
