import requests
import time

URL = "http://10.4.35.107:8080/api/task"
TOTAL_TASKS = 1000000
REPORT_EVERY = 5000

def run_endurance():
    print(f"🏛️ INITIATING SOVEREIGN ENDURANCE TEST (1M TASKS)...")
    start_time = time.time()
    
    # Session untuk menjaga koneksi tetap terbuka (Keep-Alive)
    with requests.Session() as session:
        for i in range(1, TOTAL_TASKS + 1):
            try:
                # Payload minimalis untuk kecepatan maksimal
                session.post(URL, json={"agent": "OptiAgent", "command": "ping", "params": {"id": i}}, timeout=1)
                
                if i % REPORT_EVERY == 0:
                    elapsed = time.time() - start_time
                    speed = i / elapsed
                    print(f"📡 Progress: {i}/{TOTAL_TASKS} | Speed: {speed:.0f} tasks/sec | Time: {elapsed:.1f}s")
            except Exception as e:
                print(f"\n⚠️ Break at {i} due to: {e}")
                break

    duration = time.time() - start_time
    print(f"\n--- [ENDURANCE RESULT] ---")
    print(f"Total Success: {i}")
    print(f"Final Duration: {duration:.2f}s")
    print(f"Average Speed: {i/duration:.0f} tasks/sec")

if __name__ == "__main__":
    run_endurance()
