"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMemoryBackend = void 0;
const fs_1 = __importDefault(require("fs"));
class FileMemoryBackend {
    constructor(file = "aries.memory.json") {
        this.map = new Map();
        this.file = file;
        if (fs_1.default.existsSync(file)) {
            const raw = JSON.parse(fs_1.default.readFileSync(file, "utf-8"));
            raw.forEach((r) => this.map.set(r.key, r));
        }
    }
    write(rec) {
        this.map.set(rec.key, rec);
        fs_1.default.writeFileSync(this.file, JSON.stringify(this.snapshot(), null, 2));
    }
    read(key) {
        return this.map.get(key);
    }
    snapshot() {
        return Array.from(this.map.values());
    }
}
exports.FileMemoryBackend = FileMemoryBackend;
