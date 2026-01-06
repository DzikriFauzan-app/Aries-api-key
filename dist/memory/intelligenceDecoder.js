"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntelligenceDecoder = void 0;
class IntelligenceDecoder {
    static decode(userInput, aiResponse) {
        const combined = (userInput + " " + aiResponse).toLowerCase();
        // Hitung seberapa banyak kata kunci berharga yang muncul
        const matches = this.TRIGGERS.filter(word => combined.includes(word));
        const weight = matches.length * 2;
        return {
            isValuable: weight >= 4, // Jika berat >= 4, anggap sebagai ilmu baru
            topic: matches[0] || 'general',
            logicPattern: userInput.substring(0, 100), // Cuplikan logika
            weight: Math.min(weight, 10)
        };
    }
}
exports.IntelligenceDecoder = IntelligenceDecoder;
// Kata kunci yang memicu kecerdasan tinggi
IntelligenceDecoder.TRIGGERS = ['teori', 'logika', 'arsitektur', 'strategi', 'rumus', 'protokol'];
