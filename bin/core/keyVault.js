// DATABASE KUNCI & KUOTA
// Menyimpan siapa pemiliknya, level aksesnya, dan sisa kuotanya.

const KEY_DB = {
    // --- GOD TIER (UNLIMITED) ---
    'aries-master-key-001': { 
        owner: 'Architect', 
        tier: 'GOD', 
        usage: 0, 
        limit: Infinity 
    },

    // --- PRO TIER (JUAL MAHAL) ---
    'client-premium-feac': { 
        owner: 'Enterprise Client', 
        tier: 'PRO', 
        usage: 0, 
        limit: 10000 
    },

    // --- FREE TIER (SAMPLE) ---
    'guest-trial-key': { 
        owner: 'Guest User', 
        tier: 'FREE', 
        usage: 0, 
        limit: 10 // Cuma boleh 10x request
    }
};

module.exports = {
    /**
     * Verifikasi Kunci & Cek Sisa Kuota
     */
    validate: (apiKey) => {
        const keyData = KEY_DB[apiKey];

        // 1. Kunci Tidak Dikenal
        if (!keyData) {
            return { valid: false, error: "INVALID_KEY" };
        }

        // 2. Kuota Habis
        if (keyData.usage >= keyData.limit) {
            return { valid: false, error: "QUOTA_EXCEEDED" };
        }

        // 3. Valid & Catat Penggunaan
        keyData.usage++;
        console.log(`[VAULT] 💳 Key Used: ${apiKey} | Usage: ${keyData.usage}/${keyData.limit}`);
        
        return { 
            valid: true, 
            owner: keyData.owner, 
            tier: keyData.tier,
            remaining: keyData.limit - keyData.usage
        };
    }
};
