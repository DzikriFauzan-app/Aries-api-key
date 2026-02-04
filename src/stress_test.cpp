#include <iostream>
#include <vector>
#include <chrono>
#include <atomic>
#include <thread>

void stress_worker(std::atomic<uint64_t>& counter, int duration_ms) {
    auto start = std::chrono::high_resolution_clock::now();
    while (true) {
        auto now = std::chrono::high_resolution_clock::now();
        if (std::chrono::duration_cast<std::chrono::milliseconds>(now - start).count() > duration_ms) break;
        
        // Simulasi pengolahan paket data masuk
        counter.fetch_add(1, std::memory_order_relaxed);
    }
}

int main() {
    std::atomic<uint64_t> totalRequests{0};
    int numThreads = std::thread::hardware_concurrency();
    int testDuration = 1000; // 1 detik

    std::cout << "--- NeoEngine Stress Test (1 Second) ---" << std::endl;
    std::cout << "Active Workers: " << numThreads << std::endl;

    std::vector<std::thread> workers;
    for (int i = 0; i < numThreads; ++i) {
        workers.emplace_back(stress_worker, std::ref(totalRequests), testDuration);
    }

    for (auto& t : workers) t.join();

    std::cout << "Total Requests Handled: " << totalRequests.load() << std::endl;
    std::cout << "Throughput: " << totalRequests.load() / 1e6 << " Million Req/Sec" << std::endl;

    return 0;
}
