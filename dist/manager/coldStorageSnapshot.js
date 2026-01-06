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
exports.ColdStorageSnapshot = void 0;
const fs = __importStar(require("fs"));
const crypto = __importStar(require("crypto"));
const path = __importStar(require("path"));
class ColdStorageSnapshot {
    static create(label) {
        const timestamp = Date.now();
        const id = `${label}_${timestamp}`;
        const dir = path.join(this.SNAPSHOT_DIR, id);
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir, { recursive: true });
        const payload = {
            createdAt: new Date(timestamp).toISOString(),
            registeredIps: fs.existsSync(this.IPS_FILE)
                ? JSON.parse(fs.readFileSync(this.IPS_FILE, "utf-8"))
                : {},
            sovereignMemory: fs.existsSync(this.MEMORY_FILE)
                ? fs.readFileSync(this.MEMORY_FILE, "utf-8")
                : null
        };
        const snapshotFile = path.join(dir, "snapshot.json");
        fs.writeFileSync(snapshotFile, JSON.stringify(payload, null, 2));
        const hash = crypto
            .createHash("sha256")
            .update(fs.readFileSync(snapshotFile))
            .digest("hex");
        fs.writeFileSync(path.join(dir, "snapshot.sha256"), hash);
        fs.writeFileSync(path.join(dir, "snapshot.manifest.json"), JSON.stringify({
            id,
            hash,
            algorithm: "SHA-256",
            immutable: true
        }, null, 2));
        return { id, hash };
    }
    static verify(id) {
        try {
            const dir = path.join(this.SNAPSHOT_DIR, id);
            const snapshotPath = path.join(dir, "snapshot.json");
            const shaPath = path.join(dir, "snapshot.sha256");
            if (!fs.existsSync(snapshotPath) || !fs.existsSync(shaPath))
                return false;
            const data = fs.readFileSync(snapshotPath);
            const currentHash = crypto.createHash("sha256").update(data).digest("hex");
            const storedHash = fs.readFileSync(shaPath, "utf-8").trim();
            return currentHash === storedHash;
        }
        catch (e) {
            return false;
        }
    }
}
exports.ColdStorageSnapshot = ColdStorageSnapshot;
ColdStorageSnapshot.SNAPSHOT_DIR = path.join(process.cwd(), "cold_storage/snapshots");
ColdStorageSnapshot.IPS_FILE = path.join(process.cwd(), "data/registered_ips.json");
ColdStorageSnapshot.MEMORY_FILE = path.join(process.cwd(), "sovereign_memory.json");
