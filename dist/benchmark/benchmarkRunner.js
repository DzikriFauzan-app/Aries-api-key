"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenchmarkRunner = void 0;
const memoryController_1 = require("../memory/memoryController");
class BenchmarkRunner {
    constructor() {
        this.memory = new memoryController_1.MemoryController();
    }
    run(count) {
        for (let i = 0; i < count; i++) {
            this.memory.write("ENTERPRISE", { i });
        }
        return this.memory.size();
    }
}
exports.BenchmarkRunner = BenchmarkRunner;
