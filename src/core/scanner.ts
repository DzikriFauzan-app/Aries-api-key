import * as fs from 'fs';
import * as path from 'path';
import { MemoryIndexer } from './memoryIndexer';

export class ProjectScanner {
    /**
     * Memindai direktori dan mengindeks konten file ke dalam saraf Aries.
     */
    public static async scanProject(dirPath: string) {
        console.log(`🔍 [SCANNER] Mapping project at: ${dirPath}`);
        try {
            const files = this.getAllFiles(dirPath);
            for (const file of files) {
                const content = fs.readFileSync(file, 'utf-8');
                const fileName = path.basename(file);
                
                // Indeks nama file dan isinya ke dalam memori saraf
                await MemoryIndexer.indexEngram(`FILE_CONTENT: ${fileName} in ${file}`, Date.now());
                console.log(`✅ [SCANNER] Indexed: ${fileName}`);
            }
            return { success: true, count: files.length };
        } catch (error: any) {
            console.error("❌ [SCANNER_ERR]", error.message);
            return { success: false, message: error.message };
        }
    }

    private static getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
        const files = fs.readdirSync(dirPath);

        files.forEach((file) => {
            const fullPath = path.join(dirPath, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (!file.includes('node_modules') && !file.includes('.git')) {
                    this.getAllFiles(fullPath, arrayOfFiles);
                }
            } else {
                // Hanya ambil file teks/kode
                if (/\.(ts|js|json|txt|md|py|sh)$/.test(file)) {
                    arrayOfFiles.push(fullPath);
                }
            }
        });

        return arrayOfFiles;
    }
}
