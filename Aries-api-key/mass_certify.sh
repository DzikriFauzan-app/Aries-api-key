#!/bin/bash
TARGET_DIR="$HOME/Aries-api-key/Aries-api-key"
SCANNER="$TARGET_DIR/scan_weak_nodes.sh"
AGENT="$TARGET_DIR/certify_agent.ts"

echo "🚀 [INITIATING]: Pembersihan Massal Saraf Aries (Full Scan Mode)..."
echo "-------------------------------------------------------"

# Mengambil daftar file dari scanner yang memiliki tanda bahaya (⚠️, ☢️, ❌)
# Lalu membersihkan karakter formatting untuk mendapatkan path filenya saja
FILES_TO_FIX=$($SCANNER | grep -E "⚠️|☢️|❌" | awk -F '|' '{print $2}' | tr -d ' ')

if [ -z "$FILES_TO_FIX" ]; then
    echo "✅ [CLEAN]: Tidak ada saraf lemah ditemukan. Sistem Optimal."
    exit 0
fi

for file in $FILES_TO_FIX; do
    # Validasi jika file benar-benar ada
    if [ -f "$TARGET_DIR/$file" ]; then
        npx ts-node "$AGENT" "$file"
    fi
done

echo "-------------------------------------------------------"
echo "✅ [COMPLETE]: Seluruh saraf telah ditingkatkan ke Standar Industri."
