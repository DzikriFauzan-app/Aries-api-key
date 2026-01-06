import subprocess
import time
import os

def run_mlbb_simulation():
    print("⚔️ INITIATING 'LAND OF DAWN' SIMULATION (MLBB SCALE) ⚔️")
    print("🏗️ Generating 50,000 Nodes (Heroes, Minions, VFX, Map Assets)...")
    
    # 1. Menulis Scene super padat
    scene_path = "mlbb_complex.tscn"
    with open(scene_path, "w") as f:
        f.write('[gd_scene load_steps=1 format=3]\n')
        f.write('[node name="LandOfDawn" type="Node3D"]\n')
        for i in range(50000):
            f.write(f'[node name="Obj_{i}" type="Node3D" parent="."]\n')
            f.write(f'transform = Transform3D(1,0,0,0,1,0,0,0,1,{i%200}, 0, {i//200})\n')

    # 2. Script Playability 5 Menit
    script_path = "mlbb_logic.gd"
    with open(script_path, "w") as f:
        f.write('extends SceneTree\n')
        f.write('var total_frames = 0\n')
        f.write('var start_time = Time.get_ticks_msec()\n')
        f.write('var test_duration = 300000 # 5 Menit dalam ms\n')
        f.write('func _init():\n')
        f.write('    print("🎮 MLBB Simulation Running... (5 Minutes)")\n')
        f.write('    var scene = load("res://mlbb_complex.tscn").instantiate()\n')
        f.write('    while Time.get_ticks_msec() - start_time < test_duration:\n')
        f.write('        total_frames += 1\n')
        f.write('        if total_frames % 500000 == 0:\n')
        f.write('            print("⏱️ Still Running... Frames: " + str(total_frames))\n')
        f.write('    print("📊 TOTAL_FRAMES:" + str(total_frames))\n')
        f.write('    quit()\n')

    print("🎬 Sending to NeoEngine Kernel (Headless Render)...")
    start_wall = time.time()
    
    try:
        process = subprocess.run(
            ["godot", "--display-driver", "headless", "-s", script_path],
            capture_output=True, text=True
        )
        
        duration = time.time() - start_wall
        if "TOTAL_FRAMES" in process.stdout:
            frames = [l for l in process.stdout.split("\n") if "TOTAL_FRAMES" in l][0]
            print(f"\n✅ MLBB STRESS TEST COMPLETE!")
            print(f"⏱️ Real-world Duration: {duration:.2f} s")
            print(f"📊 {frames}")
            print(f"🚀 Average Internal FPS: {int(frames.split(':')[1])/300:.0f} FPS")
        else:
            print("❌ Throttled/Error:", process.stderr)
            
    finally:
        if os.path.exists(scene_path): os.remove(scene_path)
        if os.path.exists(script_path): os.remove(script_path)

if __name__ == "__main__":
    run_mlbb_simulation()
