#!/bin/bash

# Setup direktori audit untuk Aries
AUDIT_DIR="aries_ai_audit"
mkdir -p $AUDIT_DIR/scenarios
mkdir -p $AUDIT_DIR/results

echo "--- Sovereign Architect: Aries AI Audit Setup ---"

# Skenario 1: Optimasi Algoritma (Collision Detection)
cat << 'EOC' > $AUDIT_DIR/scenarios/scenario_1_spatial.txt
TUGAS: Buatlah implementasi Spatial Partitioning (Grid-based atau Quadtree) 
dalam C++ untuk menangani 10.000 entitas yang bergerak. 
DATA: Setiap entitas memiliki ID (uint32_t) dan posisi (Vector3).
STANDAR: Gunakan pendekatan Data-Oriented (SoA) dan pastikan cache-friendly.
EOC

# Skenario 2: State Machine untuk NPC MMO
cat << 'EOC' > $AUDIT_DIR/scenarios/scenario_2_npc_logic.txt
TUGAS: Rancang sistem AI untuk NPC "Guardian" di game MMO.
KONDISI: 
1. Jika Player dalam radius 10m -> Agresif.
2. Jika HP < 20% -> Cari healer terdekat.
3. Jika Player keluar radius -> Kembali ke titik spawn.
STANDAR: Berikan kode dalam bentuk State Pattern atau Behavior Tree yang efisien.
EOC

# Skenario 3: Keamanan Protokol (Anti-Cheat)
cat << 'EOC' > $AUDIT_DIR/scenarios/scenario_3_network.txt
TUGAS: Jelaskan dan buatkan pseudocode untuk validasi posisi pemain 
di sisi server (Server-side Validation) untuk mencegah 'Speed Hack' 
dan 'Teleport Hack' pada game dengan 2000 pemain per zona.
EOC

echo "[+] Skenario audit telah disiapkan di $AUDIT_DIR/scenarios/"
echo "[+] Berikan isi file tersebut ke Aries satu per satu."
echo "[+] Tempelkan (paste) jawaban Aries di sini untuk saya audit."
