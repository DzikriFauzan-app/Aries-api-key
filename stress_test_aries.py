import asyncio
import aiohttp
import time

# Kita menembak Aries di port 3000, yang nanti akan diteruskan ke NeoEngine di 8080
URL = "http://localhost:3000/api/proxy-to-neo" 

async def send_request(session):
    try:
        async with session.get(URL, timeout=2) as response:
            return response.status
    except:
        return None

async def main():
    total = 1000000
    concurrency = 500
    print(f"🚀 ARIES-TO-NEO LOCAL TEST: 1 Juta Request")
    
    start_time = time.time()
    async with aiohttp.ClientSession() as session:
        for i in range(0, total, concurrency):
            tasks = [send_request(session) for _ in range(concurrency)]
            await asyncio.gather(*tasks)
            
            if i % 5000 == 0:
                elapsed = time.time() - start_time
                rps = i / elapsed if elapsed > 0 else 0
                print(f"📊 Progress: {i}/{total} | Speed: {rps:.2f} req/s")

if __name__ == "__main__":
    asyncio.run(main())
