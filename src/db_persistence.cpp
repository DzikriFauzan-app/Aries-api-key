#include <iostream>
#include <vector>
#include <fstream>
#include <chrono>
#include <thread>
#include <future>

struct PlayerData {
    uint32_t id;
    uint64_t gold;
    float posX, posZ;
};

// Simulasi penyimpanan ke database/disk (lambat)
bool save_to_disk(const std::vector<PlayerData>& data) {
    std::this_thread::sleep_for(std::chrono::milliseconds(50)); // Simulasi latensi disk
    return true;
}

int main() {
    std::vector<PlayerData> players = {{1, 50000, 10.5f, 20.2f}, {2, 1200, 50.0f, 30.0f}};

    std::cout << "--- Database Persistence Audit ---" << std::endl;
    auto start = std::chrono::high_resolution_clock::now();

    // Standar Industri: Gunakan Async untuk Save agar Game tidak lag
    std::cout << "[Server] Memulai autosave di background..." << std::endl;
    auto saveFuture = std::async(std::launch::async, save_to_disk, std::ref(players));

    // Game tetap berjalan di sini tanpa menunggu save selesai
    std::cout << "[Server] Game logic tetap jalan (60 FPS)..." << std::endl;

    if (saveFuture.get()) {
        std::cout << "[Server] Data berhasil diamankan ke disk." << std::endl;
    }

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed = end - start;
    std::cout << "Total process time: " << elapsed.count() << "s" << std::endl;

    return 0;
}
