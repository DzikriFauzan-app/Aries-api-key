import re
def solve(q):
    nums = [int(n) for n in re.findall(r'\d+', q)]
    # Logika: Uang - (Harga * Jumlah)
    return f"Kembalian: {nums[0] - (nums[1] * nums[2])}"
