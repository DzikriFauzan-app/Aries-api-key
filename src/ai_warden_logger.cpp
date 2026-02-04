#include <iostream>
#include <vector>
#include <string>

struct SuspiciousEvent {
    uint32_t playerId;
    std::string reason;
    float severity; // 0.0 to 1.0
};

class AIWarden {
    std::vector<SuspiciousEvent> blacklist;
public:
    void report(uint32_t id, std::string reason, float score) {
        if (score > 0.8f) {
            std::cout << "[AI WARDEN] Alert: Player " << id << " flagged for " << reason << " (Confidence: " << score * 100 << "%)" << std::endl;
            blacklist.push_back({id, reason, score});
        }
    }
};

int main() {
    AIWarden warden;
    
    // Simulasi data dari sistem ECS dan Anti-Cheat
    std::cout << "--- Initializing AI Warden Monitoring ---" << std::endl;
    
    // Contoh: Pemain melakukan input terlalu cepat (Botting)
    warden.report(99, "Impossible Input Speed", 0.95f);
    
    // Contoh: Pemain melakukan transaksi janggal
    warden.report(102, "Market RMT Pattern", 0.85f);

    return 0;
}
