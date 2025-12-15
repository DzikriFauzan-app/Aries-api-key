"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const benchmarkRunner_1 = require("../benchmark/benchmarkRunner");
(async () => {
    // Hanya jalan jika ENV variable diset (agar tidak memberatkan test biasa)
    if (process.env.ARIES_BENCH) {
        const runner = new benchmarkRunner_1.BenchmarkRunner();
        await runner.run();
    }
    else {
        console.log("Benchmark skipped (set ARIES_BENCH=1 to run)");
    }
})();
