import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), 'brain'))

from brain.inference_engine import process

async def aries_inference_engine(user_input):
    logic_pool = {"messages": [{"content": user_input}]}
    return process(logic_pool)[-1]  # Return final brain response

# Test
if __name__ == "__main__":
    print(aries_inference_engine("3x+5=14"))
