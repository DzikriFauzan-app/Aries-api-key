import requests
import json
import time

URL = "http://localhost:3333/chat/completions"
HEADERS = {
    "Authorization": "Bearer aries-owner-33d7d4d4224cdb40b0aef205b64f76414efb2f9bc70ee1f1",
    "Content-Type": "application/json"
}

questions = [
    "Aries, jelaskan hukum termodinamika ke-2.",
    "Berapa hasil dari limit x mendekati 0 untuk sin(x)/x?",
    "Jelaskan hubungan antara kosmologi dan teologi dalam sistemmu.",
    "Sebutkan 5 elemen kimia golongan alkali tanah."
]

print("🚀 INITIATING ARIES STRESS TEST...")
for i, q in enumerate(questions):
    print(f"\n[Test {i+1}] Mengirim: {q}")
    start = time.time()
    try:
        response = requests.post(URL, headers=HEADERS, json={
            "model": "aries",
            "messages": [{"role": "user", "content": q}]
        })
        end = time.time()
        if response.status_code == 200:
            print(f"✅ PASSED ({round(end-start, 2)}s)")
            # Ambil sedikit cuplikan jawaban
            ans = response.json()['choices'][0]['message']['content'][:100]
            print(f"📄 Respon: {ans}...")
        else:
            print(f"❌ FAILED ({response.status_code})")
    except Exception as e:
        print(f"⚠️ ERROR: {e}")

print("\n--- TEST COMPLETE ---")
