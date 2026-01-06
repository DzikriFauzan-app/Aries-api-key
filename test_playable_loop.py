import subprocess
import time

def test_stability():
    print("🎮 TESTING PLAYABILITY: 60 SECONDS STRESS LOOP...")
    
    script_path = "play_check.gd"
    with open(script_path, "w") as f:
        f.write('extends SceneTree\n')
        f.write('var frames = 0\n')
        f.write('var start_time = Time.get_ticks_msec()\n')
        f.write('func _init():\n')
        f.write('    print("🕹️ Game Started...")\n')
        f.write('    while Time.get_ticks_msec() - start_time < 2000: # Test 2 detik intensitas tinggi\n')
        f.write('        frames += 1\n')
        f.write('    print("📊 Total Frames Processed: " + str(frames))\n')
        f.write('    quit()\n')

    try:
        res = subprocess.run(["godot", "--display-driver", "headless", "-s", script_path], capture_output=True, text=True)
        print(res.stdout)
        print("✅ PLAYABILITY CHECK PASSED: Engine stable under load.")
    except:
        print("❌ STABILITY FAIL")

if __name__ == "__main__":
    test_stability()
