import asyncio
import aiohttp
import time

URL = "http://10.4.35.107:8080/api/task"
TOTAL = 1000000
BATCH_SIZE = 5000 # Gempuran per gelombang

async def fire_task(session, i):
    try:
        async with session.post(URL, json={"a": "Opti", "c": "ping", "p": i}, timeout=0.5) as r:
            return r.status
    except: return None

async def main():
    print(f"🏛️ LAUNCHING ULTIMATE BOMBARDMENT (1,000,000 TASKS)...")
    start = time.time()
    
    # TCPConnector diperkuat untuk handle banyak koneksi simultan
    conn = aiohttp.TCPConnector(limit=BATCH_SIZE, ttl_dns_cache=300)
    async with aiohttp.ClientSession(connector=conn) as session:
        for chunk in range(0, TOTAL, BATCH_SIZE):
            tasks = [fire_task(session, i) for i in range(chunk, chunk + BATCH_SIZE)]
            await asyncio.gather(*tasks)
            
            elapsed = time.time() - start
            speed = (chunk + BATCH_SIZE) / elapsed
            print(f"📡 Progress: {chunk + BATCH_SIZE}/{TOTAL} | Speed: {speed:.0f}/sec", end="\r")

    print(f"\n✅ 1M Tasks Finished in {time.time()-start:.2f}s")

if __name__ == "__main__":
    asyncio.run(main())
