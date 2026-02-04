#!/usr/bin/env bash

# === ARIES INDEPENDENT EVALUATOR ===
# Menguji kecerdasan Gate lokal tanpa ketergantungan API luar

ARIES_API_KEY="aries-owner-33d7d4d4224cdb40aef205b64f76414efb2f9bc70ee1f1"
ARIES_ENDPOINT="http://127.0.0.1:3333/v1/chat/completions"

# 1. Pastikan Gate Hidup
if ! curl -s --max-time 2 "$ARIES_ENDPOINT" -X POST -d '{}' | grep -q "detail\|choices"; then
    echo "[❌] Gate 3333 mati. Jalankan ./aries_up.sh dulu!"
    exit 1
fi

echo "[🛡️] MEMULAI EVALUASI KECERDASAN ARIES..."

# Daftar Pertanyaan High-Level
QUESTIONS=(
  "Tulis cerita horor 3 kalimat tentang cermin."
  "Selesaikan: 3x + 5 = 20. Tunjukkan langkahnya."
  "Buat fungsi Python untuk membalikkan string tanpa [::-1]."
)

total_score=0
count=${#QUESTIONS[@]}

for i in "${!QUESTIONS[@]}"; do
  q="${QUESTIONS[$i]}"
  echo -e "\n\033[1;34m[Uji $((i+1))/$count]\033[0m"
  echo -e "Q: $q"

  # Ambil respons dari Gate Lokal
  resp=$(curl -s -X POST "$ARIES_ENDPOINT" \
    -H "Authorization: Bearer $ARIES_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"model\":\"latest\",\"messages\":[{\"role\":\"user\",\"content\":\"$q\"}],\"max_tokens\":200}" | jq -r '.choices[0].message.content // "KOSONG"')

  echo -e "\n--- ARIES RESPON ---"
  echo -e "\033[1;32m$resp\033[0m"
  
  read -p "Beri Skor (0-10): " score
  score=${score:-0}
  total_score=$(echo "$total_score + $score" | bc -l)
done

final=$(echo "scale=1; $total_score / $count" | bc -l)
echo -e "\n[📊] RATA-RATA KECERDASAN ARIES: $final/10"
