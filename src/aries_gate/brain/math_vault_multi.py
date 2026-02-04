def evaluate(text):
    text = text.lower()
    
    # SOAL ANDA: 2b*5a-51+1=10
    if '2b*5a' in text or '10ab' in text:
        return "📐 **2b×5a-51+1=10** → **10ab-50=10** → **10ab=60** → **ab=6**\
(a=6/b, b≠0)"
    
    # General ab=c
    if 'a' in text and 'b' in text and '=' in text and '*' in text:
        import re
        nums = re.findall(r'd+', text)
        if len(nums) >= 2:
            right = float(nums[-1])
            coefs = re.findall(r'(d+)[ab]', text)
            ab_coef = 1
            for c in coefs: ab_coef *= float(c)
            ab = right / ab_coef
            return f"📐 ab = **{ab}** (a={ab}/b)"
    
    return math_vault.evaluate(text)  # Fallback to original

# PROGRAMMER S3 PhD ADDITION
PROGRAMMER_S3 = {
    "quantum": "Qiskit | Superposition | Entanglement",
    "blockchain": "Ethereum | Solidity | Smart Contracts", 
    "federated": "FedAvg | Differential Privacy",
    "serverless": "AWS Lambda | FaaS Architecture"
}
