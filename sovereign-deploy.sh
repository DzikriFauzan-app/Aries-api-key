#!/bin/bash

# --- PROTOKOL KEDAULATAN ARIES ---
echo "🏛️  INITIATING SOVEREIGN DEPLOYMENT PROTOCOL..."

# 1. VALIDASI TESTING (MANDATORY)
echo "🧪 [1/3] Running System Health Check..."
# Menjalankan test runner melalui ts-node secara langsung
if npx ts-node -e "import { runSystemTest } from './src/test_runner'; runSystemTest().then(r => process.exit(r.success ? 0 : 1))"; then
    echo "✅ System stable. Proceeding to Knowledge Harvesting."
else
    echo "❌ CRITICAL ERROR: System unstable! Deployment ABORTED."
    exit 1
fi

# 2. KNOWLEDGE SYNC
echo "🧠 [2/3] Extracting insights from Knowledge Pool..."
if [ -f "data/knowledge_pool.json" ]; then
    cp data/knowledge_pool.json . # Membawa pool ke root untuk di-commit jika tidak di-ignore
    echo "✨ New knowledge extracted and ready for synchronization."
else
    echo "⚠️  No new knowledge pool found. Only pushing system updates."
fi

# 3. SECURE GITHUB PUSH
echo "🛰️  [3/3] Pushing updates to GitHub (Master Repository)..."
git add .
# Menandai commit dengan timestamp dan status kedaulatan
git commit -m "Aries Sovereign Update: $(date '+%Y-%m-%d %H:%M:%S') [System & Knowledge]"
git push origin main

echo "👑 DEPLOYMENT SUCCESSFUL: Knowledge has been immortalized."
