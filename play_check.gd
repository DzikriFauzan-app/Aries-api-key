extends SceneTree
var frames = 0
var start_time = Time.get_ticks_msec()
func _init():
    print("🕹️ Game Started...")
    while Time.get_ticks_msec() - start_time < 2000: # Test 2 detik intensitas tinggi
        frames += 1
    print("📊 Total Frames Processed: " + str(frames))
    quit()
