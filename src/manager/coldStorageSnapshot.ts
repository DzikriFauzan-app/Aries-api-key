import * as fs from "fs";
import * as crypto from "crypto";
import * as path from "path";

export class ColdStorageSnapshot {
    private static SNAPSHOT_DIR = path.join(process.cwd(), "cold_storage/snapshots");
    private static IPS_FILE = path.join(process.cwd(), "data/registered_ips.json");
    private static MEMORY_FILE = path.join(process.cwd(), "sovereign_memory.json");

    static create(label: string) {
        const timestamp = Date.now();
        const id = `${label}_${timestamp}`;
        const dir = path.join(this.SNAPSHOT_DIR, id);

        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

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

        fs.writeFileSync(
            path.join(dir, "snapshot.manifest.json"),
            JSON.stringify({
                id,
                hash,
                algorithm: "SHA-256",
                immutable: true
            }, null, 2)
        );

        return { id, hash };
    }

    static verify(id: string): boolean {
        try {
            const dir = path.join(this.SNAPSHOT_DIR, id);
            const snapshotPath = path.join(dir, "snapshot.json");
            const shaPath = path.join(dir, "snapshot.sha256");

            if (!fs.existsSync(snapshotPath) || !fs.existsSync(shaPath)) return false;

            const data = fs.readFileSync(snapshotPath);
            const currentHash = crypto.createHash("sha256").update(data).digest("hex");
            const storedHash = fs.readFileSync(shaPath, "utf-8").trim();

            return currentHash === storedHash;
        } catch (e) {
            return false;
        }
    }
}
