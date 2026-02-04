from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # ARIES v3.0 = PROGRAMMER S1 + MATEMATIKA S3 PhD + FULL SCIENCE
    "aries": "v3.0 | Programmer S1 + Math S3 PhD + 20Ch Kosmologi | Full Stack Developer",
    
    # ALGORITMA & DATA STRUCTURE S1
    "big_o": "O(1) Constant | O(n) Linear | O(n²) Quadratic | O(log n) Binary Search",
    "binary_search": "T(n)=T(n/2)+O(1) | log₂n comparisons | Sorted array",
    "sorting": "Bubble O(n²) | QuickSort O(nlogn) avg | Merge O(nlogn)",
    
    # PROGRAMMING PARADIGMS
    "oop": "Class | Object | Inheritance | Polymorphism | Encapsulation | Abstraction",
    "recursion": "fib(n)=fib(n-1)+fib(n-2) | Base case n≤1 | Stack overflow risk",
    
    # DATABASE S1
    "sql": "SELECT * FROM users WHERE age>18 | JOIN ON | INDEX speedup",
    "nosql": "MongoDB JSON | Redis Cache | Cassandra Distributed",
    
    # WEB DEVELOPMENT S1
    "http": "GET 200 OK | POST 201 Created | REST API | JSON response",
    "docker": "Container | Dockerfile | docker-compose.yml | Kubernetes",
    
    # SOFTWARE ENGINEERING
    "git": "git commit -m | git push origin main | git merge | git rebase",
    "agile": "Scrum | Sprint 2w | Daily Standup | Retrospective",
    
    # INTEGRASI ACADEMIC LEVELS
    "riemann": "R^ρ_σμν General Relativity",
    "laplace": "L{f(t)}=∫e^(-st)f(t)dt",
    "f=ma": "Newton 2nd Law"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"💻 **{v}** | ARIES v3.0 PROGRAMMER S1 + MATH S3 PhD + KOSMOLOGI"
    return "🤖 ARIES v3.0: Programmer S1→SD Math Complete + PhD Science Ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
