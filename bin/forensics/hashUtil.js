const crypto = require('crypto');

function createHash(data) {
    // Jika data object, stringify dulu
    const content = typeof data === 'string' ? data : JSON.stringify(data);
    return crypto.createHash('sha256').update(content || '').digest('hex');
}

module.exports = { createHash };
