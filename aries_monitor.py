import requests
from core.world_registry import WorldRegistry

def check_sovereign_health():
    regions = WorldRegistry.get_all()
    for name, data in regions.items():
        if data["status"] == "CRISIS":
            print(f"⚠️ ARIES ALERT: {name} is unstable! Sending notification to Dashboard...")
            # Di sini Aries akan melakukan POST ke Dashboard FEAC
            # requests.post("http://localhost:3000/api/alerts", json=data)

if __name__ == "__main__":
    # Simulasi deteksi
    WorldRegistry.register_region("Forest_B", "forest")
    WorldRegistry.regions["Forest_B"]["status"] = "CRISIS"
    check_sovereign_health()
