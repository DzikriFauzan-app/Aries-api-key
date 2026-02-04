import { exec } from 'child_process';
import { SystemAudit } from './systemAudit';
import path from 'path';

export class AriesBridge {
  public static async healSubsystem(targetPath: string, threshold: number = 100) {
    console.log(`🛡️ [BRIDGE]: Memulai penyembuhan pada ${targetPath}`);
    
    // 1. Scan cari file lemah
    const weakFiles = await SystemAudit.deepScan(targetPath, threshold);
    
    // 2. Kirim pasukan Agen V6 (certify_agent.ts)
    weakFiles.forEach((file: any) => {
      const fullPath = file.path.replace('~', process.env.HOME || '');
      const agentPath = path.join(process.env.HOME || '', 'Aries-api-key/Aries-api-key/certify_agent.ts');
      
      console.log(`⚡ [HEALING]: Memperkuat ${path.basename(fullPath)}...`);
      exec(`npx ts-node ${agentPath} "${fullPath}"`, (error, stdout) => {
        if (error) console.error(`❌ Gagal memperbaiki ${fullPath}:`, error);
        else console.log(stdout);
      });
    });

    return { status: "OPERATIONAL", files_healed: weakFiles.length };
  }
}
