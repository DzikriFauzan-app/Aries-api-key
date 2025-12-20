export interface DecodedInsight {
  isValuable: boolean;
  topic: string;
  logicPattern: string;
  weight: number; // 1-10 seberapa penting untuk disedot
}

export class IntelligenceDecoder {
  // Kata kunci yang memicu kecerdasan tinggi
  private static TRIGGERS = ['teori', 'logika', 'arsitektur', 'strategi', 'rumus', 'protokol'];

  static decode(userInput: string, aiResponse: string): DecodedInsight {
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
