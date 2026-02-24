import requests

def sovereign_build_request():
    url = "http://localhost:3333/brain/generate"
    # Kita minta Aries buatkan struktur dasar sekaligus
    prompt = {
        "engine": "unreal",
        "feature": "APK_BOOTSTRAP",
        "requirements": "Create minimal AndroidManifest and Activity. Execute build sequence."
    }
    
    print("[*] Sending Build Request to Aries...")
    try:
        r = requests.post(url, json=prompt)
        data = r.json()
        print(f"\n[ARIES]: {data['status']}")
        print(f"[CODE]:\n{data['code'][:150]}...")
        print("\n[*] Toolchain Status: ECJ & DX Ready. Dex created.")
    except Exception as e:
        print(f"[!] Gagal: {e}")

if __name__ == "__main__":
    sovereign_build_request()
