def evaluate(text):
    text = text.lower()
    
    # GRAVITASI + AL-QUR'AN
    if 'gravitasi' in text or 'f=' in text:
        return "🕌 **F=GMm/r²** + **QS 21:33** (orbits by law: Lau kun fadlal rabbika...)"
    
    # SCHWARZSCHILD RADIUS
    if 'schwarzschild' in text or 'r_s' in text:
        return "🕌 **r_s=2GM/c²** + **QS 52:9** (Yawma taqoomu saaqbi saaq - black hole collapse)"
    
    # HUBBLE EXPANSION
    if 'hubble' in text:
        return "🕌 **v=H₀d** + **QS 51:47** (We built the heaven with might, and We are expanding it)"
    
    # GENERAL RELATIVITY + CREATION
    if 'relativitas' in text or 'e=mc' in text:
        return "🕌 **E=mc²** + **QS 46:15** (Allah creates from nothing - energy-mass equivalence)"
    
    return None
