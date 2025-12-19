module.exports = {
    name: 'General',
    description: 'Basic communication and system status',
    // Cek apakah modul ini harus bekerja?
    match: (input) => {
        const i = input.toLowerCase();
        return i.includes('halo') || i.includes('status') || i.includes('siapa');
    },
    // Eksekusi tugas
    execute: (input) => {
        const i = input.toLowerCase();
        if (i.includes('status')) {
            const mem = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
            return `[SYSTEM] 🟢 ONLINE | RAM: ${mem}MB | MODULES: ACTIVE`;
        }
        return "Aries Sovereign Engine: Modular System v2.0 Ready.";
    }
};
