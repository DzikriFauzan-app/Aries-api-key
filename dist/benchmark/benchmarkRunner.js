"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBenchmarks = runBenchmarks;
const benchmarkCases_1 = require("./benchmarkCases");
const commandRouter_1 = require("../router/commandRouter");
const memoryStore_1 = require("../memory/memoryStore");
const fileMemoryBackend_1 = require("../memory/fileMemoryBackend");
async function runBenchmarks() {
    let passed = 0;
    let failed = 0;
    // BENCHMARK HARUS PAKAI BACKEND NYATA
    const backend = new fileMemoryBackend_1.FileMemoryBackend(".aries_bench_mem.json");
    const memory = new memoryStore_1.MemoryStore(backend);
    for (const testCase of benchmarkCases_1.benchmarkCases) {
        const repeat = testCase.repeat ?? 1;
        for (let i = 0; i < repeat; i++) {
            try {
                const output = await (0, commandRouter_1.routeCommand)(testCase.input, memory);
                if (testCase.expectedPattern.test(output)) {
                    passed++;
                }
                else {
                    failed++;
                }
            }
            catch {
                failed++;
            }
        }
    }
    console.log({ total: passed + failed, passed, failed });
    if (failed > 0) {
        throw new Error("BENCHMARK TEST COMPLETED WITH FAILURES");
    }
}
