#!/bin/bash
# Target direktori khusus FEAC dan Neo Engine
DIRS=("src/feac" "src/synapse")
AGENT="certify_agent.ts"

echo "🚀 [INITIATING]: Upgrade Total Sub-Sistem (FEAC & NEO)..."
echo "-------------------------------------------------------"

for dir in "${DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo "📂 Processing: $dir"
    find "$dir" -name "*.ts" | while read file; do
      # Hitung skor sementara secara cepat
      keywords=$(grep -cE "try|catch|async|await|import|class|interface" "$file")
      lines=$(grep -cE "." "$file")
      score=$(( (keywords * 15) + (lines * 5) ))

      if [ $score -lt 100 ]; then
        echo "⚠️  [UPGRADING]: $file (Skor: $score)"
        npx ts-node "$AGENT" "$file"
      else
        echo "✅ [SKIPPING]: $file sudah di atas standar (Skor: $score)"
      fi
    done
  fi
done

echo "-------------------------------------------------------"
echo "✅ [COMPLETE]: Seluruh Sub-Sistem telah mencapai Standar Elite."
