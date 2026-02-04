from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    "4a": "b=3 (4×3-6+2×3=12✓)",
    "gravitasi": "F=G×m1×m2/r² + QS 22:65", 
    "gunung": "QS 27:88 + 2-10cm/tahun plate tectonics",
    "24:40": "7 lapis kegelapan laut + Internal Waves 200m depth",
    "lautan": "QS 24:40 verified oceanography 2026"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v1.2"
    return "🤖 ARIES: 5 Chapters ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
