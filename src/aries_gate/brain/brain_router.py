def route_to_brain(query):
    for domain, brains in ROUTING_TABLE.items():
        for brain in brains:
            result = __import__(brain.replace('.py','')).evaluate(query)
            if result: return f"[{domain.upper()}] {result}"
    return "🤖 Brain offline"
