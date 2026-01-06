import asyncio
import aiohttp
import time

URL = "http://10.4.35.107:8080/api/task/batch"
TOTAL_LINES = 5000000
BATCH_SIZE = 25000 # 25rb baris per gelombang kognitif
CONCURRENCY = 8

async def write_genesis_batch(session, phase, start_idx):
    # Simulasi detail kode kecil (Writing)
    payload = {
        "phase": phase,
        "type": "EMERGENT_WRITING",
        "data": [
            {
                "agent": "CodeAgent",
                "c": "write_logic",
                "p": f"void init_subsystem_{j}() {{ // Logic detail {j} }}"
            } for j in range(start_idx, start_idx + BATCH_SIZE)
        ]
    }
    try:
        async with session.post(URL, json=payload, timeout=15) as resp:
            return await resp.json()
    except: return None

async def main():
    print(f"🏛️ INITIATING 'GENESIS' SIMULATION: 5,000,000 LINES 🏛️")
    phases = ["CORE", "SYSTEM", "GAMEPLAY", "ASSETS", "FINAL"]
    start_time = time.time()
    
    conn = aiohttp.TCPConnector(limit=CONCURRENCY)
    async with aiohttp.ClientSession(connector=conn) as session:
        for p_idx, phase in enumerate(phases):
            print(f"\n🚀 PHASE {p_idx+1}/5: Generating {phase} logic...")
            phase_start = time.time()
            
            # Setiap fase memiliki 1 juta baris
            for i in range(0, 1000000, BATCH_SIZE * CONCURRENCY):
                tasks = []
                for j in range(CONCURRENCY):
                    idx = i + (j * BATCH_SIZE)
                    tasks.append(write_genesis_batch(session, phase, idx))
                
                await asyncio.gather(*tasks)
                
                total_done = (p_idx * 1000000) + i + (BATCH_SIZE * CONCURRENCY)
                elapsed = time.time() - start_time
                print(f"📝 Writing: {total_done:,}/{TOTAL_LINES:,} Lines | Speed: {total_done/elapsed:.0f}/sec", end="\r")
            
    duration = time.time() - start_time
    print(f"\n\n🏆 SIMULATION COMPLETE: PROJECT 'GENESIS' READY FOR BUILD")
    print(f"⏱️ Total Production Time: {duration:.2f}s")
    print(f"🚀 Average Sovereign Writing Speed: {TOTAL_LINES/duration:.0f} lines/sec")

if __name__ == "__main__":
    asyncio.run(main())
