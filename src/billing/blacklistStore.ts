import * as fs from "fs";

const BLACKLIST_FILE = "data/ip_blacklist.json";

// Definisikan Interface agar TypeScript paham struktur database lokal kita
interface BlacklistData {
  [userId: string]: string[];
}

export class BlacklistStore {
  static blacklistIp(userId: string, ip: string) {
    let blacklist: BlacklistData = {};
    
    if (fs.existsSync(BLACKLIST_FILE)) {
      try {
        blacklist = JSON.parse(fs.readFileSync(BLACKLIST_FILE, "utf-8"));
      } catch (e) {
        blacklist = {};
      }
    }
    
    if (!blacklist[userId]) {
      blacklist[userId] = [];
    }
    
    if (!blacklist[userId].includes(ip)) {
      blacklist[userId].push(ip);
    }
    
    fs.writeFileSync(BLACKLIST_FILE, JSON.stringify(blacklist, null, 2));
    console.log(`[SECURITY] IP ${ip} telah di-BLACKLIST permanen untuk User ${userId}.`);
  }

  static isBlacklisted(userId: string, ip: string): boolean {
    if (!fs.existsSync(BLACKLIST_FILE)) return false;
    try {
      const blacklist: BlacklistData = JSON.parse(fs.readFileSync(BLACKLIST_FILE, "utf-8"));
      return blacklist[userId]?.includes(ip) || false;
    } catch (e) {
      return false;
    }
  }
}
