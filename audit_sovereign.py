import json
import os

def run_audit():
    KEY_PATH = 'data/owner.key.json'
    TARGET_KEY = "aries-owner-33d7d4d4224cdb40b0aef205b64f76414efb2f9bc70ee1f1"
    
    print("\n=== [ARIES AUTHORITY DEEP AUDIT] ===")
    
    if not os.path.exists(KEY_PATH):
        print(f"❌ ERROR: File '{KEY_PATH}' tidak ditemukan!")
        return

    try:
        with open(KEY_PATH, 'r') as f:
            db_data = json.load(f)
            db_key = db_data.get('key', '').strip()
            
        print(f"🔑 Target Key (Input Anda): {TARGET_KEY}")
        print(f"📂 DB Key (Database Asli): {db_key}")
        
        if db_key == TARGET_KEY:
            print("\n✅ RESULT: MATCH! Otoritas Anda 100% VALID di sistem.")
        else:
            print("\n❌ RESULT: MISMATCH! Ada perbedaan karakter.")
            # Cek panjang karakter
            if len(db_key) != len(TARGET_KEY):
                print(f"⚠️ Perbedaan Panjang: UI({len(TARGET_KEY)}) vs DB({len(db_key)})")
    except Exception as e:
        print(f"❌ ERROR SISTEM: {str(e)}")

if __name__ == "__main__":
    run_audit()
