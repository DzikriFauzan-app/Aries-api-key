"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMemoryBackend = void 0;
const fs = __importStar(require("fs"));
class FileMemoryBackend {
    constructor(file) {
        this.file = file;
        this.map = new Map();
        if (fs.existsSync(file)) {
            const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
            raw.forEach(r => {
                if (r.key) {
                    this.map.set(r.key, r);
                }
            });
        }
    }
    write(rec) {
        if (!rec.key)
            return;
        this.map.set(rec.key, rec);
        this.flush();
    }
    read(key) {
        return this.map.get(key);
    }
    snapshot() {
        return [...this.map.values()];
    }
    flush() {
        fs.writeFileSync(this.file, JSON.stringify(this.snapshot(), null, 2));
    }
}
exports.FileMemoryBackend = FileMemoryBackend;
