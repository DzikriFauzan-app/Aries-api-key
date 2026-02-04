import fs from 'fs';
import path from 'path';

function getQualityScore(code: string): number {
    const highLevel = ["try", "catch", "async", "await", "import", "interface", "class", "const", "let"];
    let score = 0;
    highLevel.forEach(ind => {
        const matches = code.match(new RegExp(ind, "g"));
        if (matches) score += matches.length * 15;
    });
    const lines = code.split('\n').filter(l => l.trim().length > 0).length;
    return score + (lines * 5);
}

const ROOT = path.join(process.env.HOME || "", "Aries-api-key/Aries-api-key/src");

fs.watch(ROOT, { recursive: true }, (event, filename) => {
    if (event === 'change' && filename && !filename.endsWith('.bak')) {
        const filePath = path.join(ROOT, filename);
        const backupPath = filePath + ".bak";

        setTimeout(() => {
            try {
                if (!fs.existsSync(filePath)) return;
                const code = fs.readFileSync(filePath, 'utf-8');
                const score = getQualityScore(code);
                
                // DISKON TIPE: Jika file berisi definisi tipe, minimal 40. Jika logika, minimal 100.
                const isTypeFile = filename.toLowerCase().includes('types') || (!code.includes('class') && code.includes('interface'));
                const minRequired = isTypeFile ? 40 : 100;

                if (score < minRequired) {
                    console.log(`🛑 [REJECTED]: ${filename} skor ${score} < ${minRequired}.`);
                    if (fs.existsSync(backupPath)) fs.writeFileSync(filePath, fs.readFileSync(backupPath, 'utf-8'));
                } else {
                    fs.writeFileSync(backupPath, code);
                }
            } catch (e) {}
        }, 300);
    }
});
