import { bootstrapOwner } from "../src/api/ownerBootstrap";

const owner = bootstrapOwner();
console.log("OWNER BOOTSTRAPPED:");
console.log(owner);
