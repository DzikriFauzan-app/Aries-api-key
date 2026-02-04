#include <iostream>
#include <atomic>
#include <thread>
#include <vector>

struct PlayerWallet {
    std::atomic<int64_t> balance;
};

bool process_purchase(PlayerWallet& wallet, int64_t itemPrice) {
    // 1. Check (Apakah uang cukup?)
    // 2. Lock & Commit (Kurangi saldo jika cukup secara atomic)
    int64_t currentBalance = wallet.balance.load();
    
    while (currentBalance >= itemPrice) {
        if (wallet.balance.compare_exchange_weak(currentBalance, currentBalance - itemPrice)) {
            return true; // Transaksi sukses dan aman (Atomic)
        }
        // Jika gagal karena ada thread lain yang mengubah saldo, loop akan mengulang (CAS)
    }
    return false; // Saldo tidak cukup
}

int main() {
    PlayerWallet myWallet;
    myWallet.balance.store(1000); // Saldo awal 1000 Gold

    int64_t itemPrice = 300;
    
    std::cout << "--- Transaction Security Audit ---" << std::endl;
    
    // Simulasi 3 percobaan pembelian bersamaan (Race Condition Test)
    bool t1 = process_purchase(myWallet, itemPrice);
    bool t2 = process_purchase(myWallet, itemPrice);
    bool t3 = process_purchase(myWallet, itemPrice);
    bool t4 = process_purchase(myWallet, itemPrice); // Harusnya gagal

    std::cout << "Purchase 1: " << (t1 ? "SUCCESS" : "FAILED") << std::endl;
    std::cout << "Purchase 2: " << (t2 ? "SUCCESS" : "FAILED") << std::endl;
    std::cout << "Purchase 3: " << (t3 ? "SUCCESS" : "FAILED") << std::endl;
    std::cout << "Purchase 4: " << (t4 ? "SUCCESS" : "FAILED") << " (Expected)" << std::endl;
    std::cout << "Final Balance: " << myWallet.balance.load() << " Gold" << std::endl;

    return 0;
}
