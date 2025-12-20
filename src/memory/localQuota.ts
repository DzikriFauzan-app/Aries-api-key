import * as fs from 'fs';
import * as path from 'path';

export class LocalQuotaManager {
  private static FILE_PATH = path.join(process.cwd(), 'quota_tracker.json');

  static async checkAndIncrement(limit: number): Promise<{ allowed: boolean }> {
    if (limit === -1) return { allowed: true };

    const today = new Date().toISOString().split('T')[0];
    let data = { count: 0, lastDate: today };

    if (fs.existsSync(this.FILE_PATH)) {
      data = JSON.parse(fs.readFileSync(this.FILE_PATH, 'utf-8'));
    }

    // Reset Otomatis jika sudah ganti hari (00:00)
    if (data.lastDate !== today) {
      data = { count: 0, lastDate: today };
    }

    if (data.count >= limit) return { allowed: false };

    data.count++;
    fs.writeFileSync(this.FILE_PATH, JSON.stringify(data));
    return { allowed: true };
  }
}
