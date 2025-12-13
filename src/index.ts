import { routeCommand } from "./router/commandRouter";

async function main() {
  const input = process.argv.slice(2).join(" ");
  const result = await routeCommand(input);
  console.log(result);
}

main().catch(err => {
  console.error("ARIES FATAL ERROR:", err.message);
  process.exit(1);
});
