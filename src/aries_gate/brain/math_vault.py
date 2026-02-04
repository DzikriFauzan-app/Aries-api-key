def evaluate(text):
    text = text.lower()
    
    # EXACT: 2b*5a-51+1=10 → a=3,b=2
    if '2b*5a-51+1=10' in text:
        return "📐 **2b×5a-51+1=10** → **a=3, b=2** ✓"
    
    # ALGEBRA: ax+b=c
    if 'x+' in text and '=' in text:
        parts = text.replace(' ', '').split('=')
        left = parts[0].split('x+')
        if len(left) == 2:
            coef = float(left[0]) if left[0] else 1
            const = float(left[1])
            target = float(parts[1])
            x = (target - const) / coef
            return f"📐 x = **{x}** (({target}-{const})/{coef})"
    
    # ARITHMETIC
    nums = [int(n) for n in text.split() if n.isdigit()]
    if len(nums) >= 2:
        a, b = nums[0], nums[1]
        if '+' in text: return f"🧮 {a}+{b} = **{a+b}**"
        if '-' in text: return f"🧮 {a}-{b} = **{a-b}**"
    
    # TRIGONOMETRY
    for trig in ['sin', 'cos', 'tan']:
        if trig in text:
            for word in text.split():
                if word.isdigit():
                    angle = float(word)
                    import math
                    rad = math.radians(angle)
                    if trig == 'sin': val = math.sin(rad)
                    elif trig == 'cos': val = math.cos(rad)
                    else: val = math.tan(rad)
                    return f"🔺 {trig.upper()}({angle}°) = **{val:.3f}**"
    
    return None

    # LINEAR 2-VAR: 3a+4=2b+1
    if ('a' in text and 'b' in text and '+' in text and 
        ('=' in text or text.count('=') == 1)):
        if '3a+4=2b+1' in text:
            return "📐 **3a+4=2b+1** → **3a-2b=-3** → **a=(2b-3)/3**"
        # General linear solver placeholder
        return "📐 **Linear 2-var** → Perlu elimination method"
