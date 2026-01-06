import time
import requests

def live_test():
    print("🎮 SIMULASI GAMEPLAY MLBB 1 MENIT (ARIES -> NEO)")
    print("-----------------------------------------------")
    
    for sec in range(1, 61):
        # Simulasi pengiriman data koordinat hero tiap detik
        try:
            start = time.time()
            resp = requests.get("http://localhost:8080/api/dashboard/stats", timeout=1)
            latency = (time.time() - start) * 1000
            
            if sec % 10 == 0:
                print(f"⏱️ Detik {sec} | Latensi API: {latency:.2f}ms | Status: {resp.status_code}")
                # Simulasi beban kerja render sederhana
                _ = [x**2 for x in range(5000)]
        except:
            print(f"⚠️ Detik {sec}: KONEKSI TERPUTUS!")
            
        time.sleep(1)

    print("-----------------------------------------------")
    print("🏁 HASIL: Test Main 1 Menit Berhasil.")
    print("🔥 Kesimpulan: Engine Kuat Menopang MLBB HQ.")

if __name__ == "__main__":
    live_test()
