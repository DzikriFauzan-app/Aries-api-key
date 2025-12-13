"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandRouter_1 = require("./router/commandRouter");
async function main() {
    const input = process.argv.slice(2).join(" ");
    const result = await (0, commandRouter_1.routeCommand)(input);
    console.log(result);
}
main().catch(err => {
    console.error("ARIES FATAL ERROR:", err.message);
    process.exit(1);
});
