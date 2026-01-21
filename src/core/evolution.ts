import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class AriesEvolution {
    private static UPGRADE_PATH = '/sdcard/Buku saya/Upgrade system Aries/upgrade.txt';

    public static async assimilateUpgrade() {
        if (!fs.existsSync(this.UPGRADE_PATH)) {
            return { success: false, message: "File upgrade.txt tidak ditemukan." };
        }

        try {
            const rawContent = fs.readFileSync(this.UPGRADE_PATH, 'utf-8');
            // Menghapus karakter \r dan membagi baris
            const lines = rawContent.replace(/\r/g, '').split('\n');
            
            // Mencari baris yang mengandung #TARGET: di mana saja di baris pertama
            const firstLine = lines[0].trim();
            
            if (firstLine.includes('#TARGET:')) {
                const targetPath = firstLine.split('#TARGET:')[1].trim();
                const code = lines.slice(1).join('\n');
                
                const fullDestPath = path.join('/data/data/com.termux/files/home/Aries-api-key/src', targetPath);
                
                fs.mkdirSync(path.dirname(fullDestPath), { recursive: true });
                fs.writeFileSync(fullDestPath, code);
                
                await execAsync('cd /data/data/com.termux/files/home/Aries-api-key && npx tsc');
                
                // Hapus file upgrade setelah sukses
                fs.unlinkSync(this.UPGRADE_PATH);
                
                return { success: true, message: `Berhasil mengasimilasi ${targetPath}` };
            }
            return { success: false, message: `Format Salah. Terdeteksi: "${firstLine}"` };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }
}
