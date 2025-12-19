const fs = require('fs');
const path = require('path');

class NativeBrain {
    constructor() {
        console.log("[BRAIN]     🧠 Loading Modules...");
        this.skills = [];
        this.loadSkills();
    }

    loadSkills() {
        const skillsPath = path.join(__dirname, 'skills');
        // Baca semua file di folder skills
        const files = fs.readdirSync(skillsPath);
        
        files.forEach(file => {
            if (file.endsWith('.js')) {
                try {
                    const skill = require(path.join(skillsPath, file));
                    this.skills.push(skill);
                    console.log(`[MODULE]    🔌 Loaded: ${skill.name}`);
                } catch (e) {
                    console.error(`[MODULE ERROR] Failed to load ${file}:`, e.message);
                }
            }
        });
        console.log(`[BRAIN]     🚀 Total Skills Active: ${this.skills.length}`);
    }

    async generate(input, context) {
        // Cari modul yang 'match' dengan input
        const activeSkill = this.skills.find(s => s.match && s.match(input));

        if (activeSkill) {
            console.log(`[ROUTER]    ➡️ Routing to: ${activeSkill.name}`);
            try {
                return await activeSkill.execute(input);
            } catch (error) {
                return `[ERROR] Modul ${activeSkill.name} gagal: ${error.message}`;
            }
        }

        // Jika tidak ada modul yang cocok
        return `[SYSTEM] Maaf, tidak ada modul yang mengerti perintah: "${input}".\nCoba: 'status', 'calc 5*5', 'hash password', atau 'gen pass'.`;
    }
}

module.exports = { NativeBrain };
