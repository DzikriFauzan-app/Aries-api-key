import * as fs from "fs";
import * as path from "path";

const USAGE_FILE = path.join(process.cwd(), "data", "usage.json");

export function recordUsage(key: string, amount: number): void {
  let data: Record<string, number> = {};
  
  if (fs.existsSync(USAGE_FILE)) {
    try {
      data = JSON.parse(fs.readFileSync(USAGE_FILE, "utf-8"));
    } catch (e) {
      data = {};
    }
  } else {
    if (!fs.existsSync(path.dirname(USAGE_FILE))) {
      fs.mkdirSync(path.dirname(USAGE_FILE), { recursive: true });
    }
  }

  data[key] = (data[key] || 0) + amount;
  fs.writeFileSync(USAGE_FILE, JSON.stringify(data, null, 2));
}
