def process(logic_pool):
    query = logic_pool["messages"][-1]["content"]
    
    # AUTO-ROUTE 3+ BRAINS (scalable ke 29)
    brains = ['logic_math', 'teologi', 'astronomy_core']
    for brain_name in brains:
        try:
            brain_module = __import__(brain_name)
            result = brain_module.evaluate(query)
            if result:
                return [f"[{brain_name.upper()}]", result]
        except Exception as e:
            continue
    
    return ["🤖 ARIES: Math | Fiqh | Kosmologi aktif. Contoh: '3x+5=14'"]
