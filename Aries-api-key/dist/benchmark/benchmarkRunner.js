"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenchmarkRunner = void 0;
const eventBus_1 = require("../events/eventBus");
class BenchmarkRunner {
    constructor() {
        this.bus = eventBus_1.EventBus;
    }
    run() {
        this.bus.emit("BENCHMARK_RUN", { at: Date.now() });
    }
}
exports.BenchmarkRunner = BenchmarkRunner;
