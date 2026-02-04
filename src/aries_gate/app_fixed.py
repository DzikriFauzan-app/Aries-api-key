from fastapi import FastAPI, Request
import uvicorn,json

try:
    from brain import MATH_RULES
    print("🧠 BRAIN OK:",list(MATH_RULES.keys()))
    ARIES_BRAIN=True
except: ARIES_BRAIN=False; MATH_RULES={}

def get_response(msg):
    if ARIES_BRAIN and MATH_RULES:
        m=msg.lower()
        for k,v in MATH_RULES.items():
            if k in m: return "🧮 **"+v+"** | ARIES v1.2"
    return "🤖 ARIES ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
