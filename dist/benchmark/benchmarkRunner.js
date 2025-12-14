"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBenchmarks = runBenchmarks;
const benchmarkCases_1 = require("./benchmarkCases");
const commandRouter_1 = require("../router/commandRouter");
const memory_1 = require("../memory");
async function runBenchmarks() {
    let passed = 0;
    let failed = 0;
    for (const testCase of benchmarkCases_1.benchmarkCases) {
        const repeat = testCase.repeat ?? 1;
        let ok = true;
        for (let i = 0; i < repeat; i++) {
            const memory = (0, memory_1.createDefaultMemory)();
            const output = await (0, commandRouter_1.routeCommand)(testCase.input, memory);
            if (!testCase.expectedPattern.test(output)) {
                ok = false;
            }
        }
        if (ok)
            passed++;
        else
            failed++;
    }
    console.log({
        total: benchmarkCases_1.benchmarkCases.length,
        passed,
        failed
    });
    if (failed > 0) {
        throw new Error("BENCHMARK TEST COMPLETED WITH FAILURES");
    }
    console.log("BENCHMARK TEST PASSED");
}
