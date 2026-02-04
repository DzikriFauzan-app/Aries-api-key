import fs from 'fs';
import path from 'path';

export class SystemAudit {
  // Fungsi ini sekarang mendukung pencarian absolut (Cross-Repo)
  public static async deepScan(customPath?: string, threshold: number = 100) {
    const root = customPath || process.cwd();
    const results: any[] = [];

    const walk = (dir: string) => {
      if (!fs.existsSync(dir)) return;
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory() && !fullPath.includes('node_modules')) {
          walk(fullPath);
        } else if (file.endsWith('.ts') || file.endsWith('.js')) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const keywords = (content.match(/try|catch|async|await|import|class|interface|export|private/g) || []).length;
          const lines = content.split('\n').filter(l => l.trim()).length;
          const score = (keywords * 20) + (lines * 10); // Gunakan V6 Scorer

          if (score < threshold) {
            results.push({ path: fullPath.replace(process.env.HOME || '', '~'), score });
          }
        }
      });
    };

    walk(root);
    return results;
  }
}
