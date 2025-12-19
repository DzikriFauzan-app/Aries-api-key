const crypto = require('crypto');

module.exports = {
    name: 'Security',
    description: 'Hashing and Password Generation',
    match: (input) => {
        const i = input.toLowerCase();
        return i.includes('hash') || i.includes('gen pass');
    },
    execute: (input) => {
        // Fitur 1: Hash Text (misal: "hash rahasia")
        if (input.toLowerCase().includes('hash')) {
            const text = input.split('hash')[1].trim();
            const hash = crypto.createHash('sha256').update(text).digest('hex');
            return `[SECURE HASH]: ${hash}`;
        }
        // Fitur 2: Generate Password
        if (input.toLowerCase().includes('gen pass')) {
            return `[NEW PASS]: ${crypto.randomBytes(8).toString('hex')}`;
        }
    }
};
