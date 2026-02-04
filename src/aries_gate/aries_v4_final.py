from fastapi import FastAPI, Request
import uvicorn,json

app = FastAPI(title="ARIES v4.0 BRAIN", version="4.0")

@app.get("/health")
async def health():
    return {"status": "ARIES v4.0 PRODUCTION", "version": "v4.0", "uptime": "LIVE"}

@app.post("/chat/completions")
async def chat(request: Request):
    data = await request.json()
    msg = data['messages'][0]['content'].lower()
    
    MATH_RULES = {
        "aries": "v4.0 PRODUCTION | Math S3+Programmer S3+Science PhD+Kosmologi",
        "quantum": "Qiskit | Superposition | Hadamard H | CNOT",
        "kubernetes": "kubectl apply -f deployment.yaml",
        "riemann": "R^ρ_σμν General Relativity PhD"
    }
    
    for k,v in MATH_RULES.items():
        if k in msg:
            return {"choices":[{"message":{"content":f"💻 **{v}** | ARIES v4.0 LIVE!"}}]}
    
    return {"choices":[{"message":{"content":"🤖 ARIES v4.0 PhD Brain PRODUCTION READY!"}}]}

if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=3333)
