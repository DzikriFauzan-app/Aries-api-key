#!/usr/bin/env bash

# MIT License | Copyright (c) 2026 Fauzan-engine / NeoEngine v1
set -euo pipefail

# === CONFIGURASI ===
# Mengarahkan ke Gate lokal yang baru saja kita stabilkan
ARIES_API_KEY="aries-owner-33d7d4d4224cdb40aef205b64f76414efb2f9bc70ee1f1"
ARIES_ENDPOINT="http://127.0.0.1:3333/v1/chat/completions"
OPENAI_ENDPOINT="https://api.openai.com/v1/chat/completions"

# Validasi OpenAI Key (Karena Aries Key sudah kita set otomatis)
if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  read -rsp "[🔑] Masukkan OPENAI_API_KEY (untuk pembanding): " OPENAI_API_KEY && echo
fi

# Dependensi
for cmd in curl jq bc; do
  if ! command -v "$cmd" &> /dev/null; then
    echo "Error: Install $cmd via 'pkg install $cmd'"
    exit 1
  fi
done

# === PERTANYAAN MT-BENCH LITE ===
read -r -d '' QUESTIONS <<EOF
[
  {"id":1,"category":"writing","question":"Write a 3-sentence horror story about a mirror."},
  {"id":2,"category":"roleplay","question":"You are a wise old wizard. Give advice to a young hero afraid of failure."},
  {"id":3,"category":"math","question":"Solve for x: 3x + 5 = 20. Show steps."},
  {"id":4,"category":"coding","question":"Write a Python function to reverse a string without using [::-1]."},
  {"id":5,"category":"reasoning","question":"If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?"},
  {"id":6,"category":"extraction","question":"Extract all dates from: 'Meeting on Jan 5, 2025 and deadline Feb 28.'"},
  {"id":7,"category":"humanities","question":"Explain the significance of the Treaty of Westphalia in one sentence."},
  {"id":8,"category":"stem","question":"Why is the sky blue? Explain in simple terms."},
  {"id":9,"category":"creative","question":"Invent a new Pokémon with type, ability, and lore."},
  {"id":10,"category":"multiturn","question":"What's 15% of 200? Now add 30 to that result."}
]
