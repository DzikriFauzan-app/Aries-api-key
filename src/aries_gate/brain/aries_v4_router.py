def aries_brain_v4(query):
    """ARIES v4.0 BRAIN - Route ke semua vault"""
    query = query.lower()
    
    # Math S3 PhD
    if any(x in query for x in ["riemann","laplace","determinan"]):
        return "🧮 MATH S3 PhD"
    
    # Programmer S3 PhD  
    if any(x in query for x in ["quantum","blockchain","kubernetes"]):
        return "💻 PROGRAMMER S3 PhD"
    
    # Full Spectrum
    return "🎓 ARIES v4.0 | Math+Programming+Science+Kosmologi PhD"

# INTEGRASI ke existing brain system
