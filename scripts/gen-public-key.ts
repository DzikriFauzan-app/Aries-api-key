import { ownerCommand } from "../src/api/ownerCommand";

const res = ownerCommand("generate-key");
console.log("PUBLIC API KEY:");
console.log(res);
