import * as fs from 'fs';
import * as path from 'path';

export class LocalSovereignStorage {
  private static FILE_PATH = path.join(process.cwd(), 'sovereign_memory.json');

  static save(content: string, metadata: any = {}): void {
    const memories = this.loadAll();
    memories.push({
      id: Date.now(),
      content,
      metadata,
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(this.FILE_PATH, JSON.stringify(memories, null, 2));
  }

  static loadAll(): any[] {
    if (!fs.existsSync(this.FILE_PATH)) return [];
    return JSON.parse(fs.readFileSync(this.FILE_PATH, 'utf-8'));
  }

  static getCount(): number {
    return this.loadAll().length;
  }
}
