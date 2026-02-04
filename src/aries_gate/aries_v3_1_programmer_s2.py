from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # ARIES v3.1 = PROGRAMMER S2 + S1 + MATH S3 PhD + KOSMOLOGI
    "aries": "v3.1 | Programmer S2 + S1 + Math S3 PhD + 20Ch Kosmologi | Enterprise Architect",
    
    # PROGRAMMER S2 - DISTRIBUTED SYSTEMS + DevOps + ML
    "kubernetes": "kubectl apply -f deployment.yaml | K8s Pods|Services|Ingress|Helm Charts",
    "kafka": "Producer->Topic->Consumer | Partitioning | Zookeeper | Offset Commit",
    "grpc": "proto3 | service Greeter { rpc SayHello } | HTTP/2 | Protocol Buffers",
    "mlops": "TensorFlow Extended | Kubeflow Pipelines | MLflow Tracking | CI/CD ML",
    
    # LINUX KERNEL + SYSTEM PROGRAMMING
    "kernel": "sys_call_table | syscall(SYS_write,1,hello,5) | IRQ handlers",
    "tcp": "3-way handshake SYN->SYN-ACK->ACK | Congestion Control | TCP Window",
    
    # CLOUD NATIVE + IaC
    "terraform": "provider aws { region = us-east-1 } | resource aws_instance",
    "ci_cd": "GitHub Actions .yml | Jenkins Pipeline | ArgoCD GitOps",
    
    # PERFORMANCE + MONITORING
    "prometheus": "PromQL | up[5m] | rate(http_requests_total[5m])",
    
    # INTEGRASI ACADEMIC
    "riemann": "Riemann tensor General Relativity",
    "big_o": "O(n log n) | Time/Space Complexity"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"💻 **{v}** | ARIES v3.1 PROGRAMMER S2 + MATH S3 PhD"
    return "🤖 ARIES v3.1: Programmer S2→S1→SD + PhD Math Ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
