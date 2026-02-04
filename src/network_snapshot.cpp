#include <iostream>
#include <vector>
#include <cstring>
#include <chrono>

// Struktur data yang dikirim melalui kabel (Network Packet)
// Dipadatkan agar hemat kuota pemain
struct PlayerSnapshot {
    uint32_t id;
    float x, z;
    uint16_t rotation; // Gunakan uint16 untuk hemat bit dibanding float
};

int main() {
    const int numPlayers = 100; // Contoh 100 pemain dalam satu area pandang
    std::vector<PlayerSnapshot> worldState;

    // Simulasi Server mengemas data
    auto start = std::chrono::high_resolution_clock::now();
    
    for(int i = 0; i < numPlayers; ++i) {
        worldState.push_back({(uint32_t)i, (float)i * 1.1f, (float)i * 2.2f, 180});
    }

    size_t packetSize = worldState.size() * sizeof(PlayerSnapshot);

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed = end - start;

    std::cout << "--- Networking Audit: Snapshot Creation ---" << std::endl;
    std::cout << "Snapshot Size for " << numPlayers << " players: " << packetSize << " bytes" << std::endl;
    std::cout << "Serialization Time: " << elapsed.count() << "s" << std::endl;
    std::cout << "Est. Bandwidth for 10Hz tick: " << (packetSize * 10) / 1024 << " KB/s" << std::endl;

    return 0;
}
