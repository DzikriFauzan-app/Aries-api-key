#!/bin/bash
TARGET_DIR="$HOME/Aries-api-key/Aries-api-key/src"

echo "🔍 [SCANNING]: Audit Saraf Aries (Skor & Integritas)..."
echo "-------------------------------------------------------"

find "$TARGET_DIR" -name "*.ts" | while read file; do
    relative_path=${file#*Aries-api-key/Aries-api-key/}
    
    # 1. Hitung Skor
    keywords=$(grep -cE "try|catch|async|await|import|class|interface|private|readonly" "$file")
    lines=$(grep -cE "." "$file")
    score=$(( (keywords * 15) + (lines * 5) ))
    
    # 2. Deteksi Struktur Rusak (Wrapper Ilegal)
    is_corrupt=$(grep -c "class SovereignEvolution" "$file")
    
    # 3. Deteksi Import Ilegal (Import tidak di baris awal)
    # Mencari import yang didahului oleh spasi (indikasi di dalam fungsi/blok)
    is_broken=$(grep -cE "^[[:space:]]+import " "$file")

    STATUS="OK"
    if [ $score -lt 100 ]; then STATUS="⚠️  WEAK"; fi
    if [ $is_corrupt -gt 0 ]; then STATUS="☢️  CORRUPT"; fi
    if [ $is_broken -gt 0 ]; then STATUS="❌ BROKEN"; fi

    if [ "$STATUS" != "OK" ]; then
        printf "%-10s | %-40s | Skor: %d\n" "$STATUS" "$relative_path" "$score"
    fi
done
echo "-------------------------------------------------------"
echo "✅ Audit Selesai."
