"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMemoryBackend = void 0;
const fs_1 = __importDefault(require("fs"));
class FileMemoryBackend {
    constructor(file) {
        this.file = file;
        this.map = new Map();
        if (fs_1.default.existsSync(file)) {
            const raw = JSON.parse(fs_1.default.readFileSync(file, "utf8"));
            raw.forEach(r => this.map.set(r.key, r));
        }
    }
    read(key) {
        const rec = this.map.get(key);
        if (!rec)
            return undefined;
        rec.hits++;
        rec.lastAccess = Date.now();
        return rec;
    }
    write(rec) {
        this.map.set(rec.key, rec);
        this.flush();
    }
    delete(key) {
        this.map.delete(key);
        this.flush();
    }
    snapshot() {
        return Array.from(this.map.values());
    }
    replace(all) {
        this.map.clear();
        all.forEach(r => this.map.set(r.key, r));
        this.flush();
    }
    flush() {
        fs_1.default.writeFileSync(this.file, JSON.stringify(this.snapshot(), null, 2));
    }
}
exports.FileMemoryBackend = FileMemoryBackend;
