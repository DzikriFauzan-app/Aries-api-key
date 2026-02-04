import re
def solve(q):
    nums = [int(n) for n in re.findall(r'\d+', q)]
    # Logika ax + b = c
    return (nums[2] - nums[1]) / nums[0]
