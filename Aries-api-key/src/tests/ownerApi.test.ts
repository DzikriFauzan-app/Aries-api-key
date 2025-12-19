import { bootstrapOwner } from "../api/ownerBootstrap";
import { ownerCommand } from "../api/ownerCommand";

test("Owner bootstrap works", () => {
  const owner = bootstrapOwner();
  expect(owner.key).toContain("aries-owner");
});

test("Owner generates API key", () => {
  const res = ownerCommand("generate-key");
  expect(res.key).toContain("aries-");
});
