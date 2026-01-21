import requests

ARIES_URL = "http://localhost:3001/api/v1/auth/verify"
API_KEY = "aries-owner-33d7d4d4224cdb40b0aef205b64f76414efb2f9bc70ee1f1"

def sync_world():
    payload = {
        "apiKey": API_KEY,
        "action": "DEEP_QUERY",
        "query": "SYNC_ENTITY: City_A, Forest_B, Dungeon_C"
    }
    try:
        response = requests.post(ARIES_URL, json=payload)
        print(f"📡 ARIES_GATE: {response.json().get('status')} - Entity state synced.")
    except Exception as e:
        print(f"❌ ARIES_ERROR: {e}")

if __name__ == "__main__":
    sync_world()
