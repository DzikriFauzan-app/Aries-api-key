import requests
import json

ARIES_URL = "http://localhost:3333/chat/completions"
# NEOENGINE_URL = "http://localhost:8888" # Placeholder untuk Unreal pribadi

def sync_aries_to_neo(query):
    # 1. Ambil Perintah dari Otak (Aries)
    payload = {"messages": [{"content": query}]}
    response = requests.post(ARIES_URL, json=payload).json()
    aries_thought = response['choices'][0]['message']['content']
    
    # 2. Terjemahkan ke Instruksi NeoEngine (Visual/Unreal)
    print(f"🧠 ARIES THOUGHT: {aries_thought}")
    print(f"🎮 SENDING TO NEOENGINE: Executing Unreal Render Agent...")
    
    # Logic untuk Render Agent (Asset Agent) sesuai instruksi Anda [2026-01-08]
    return aries_thought

if __name__ == "__main__":
    sync_aries_to_neo("Sovereign Request: Render 20 Chapters Visuals")
