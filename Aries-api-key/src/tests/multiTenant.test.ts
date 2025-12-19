import { resolveTenant } from "../api/tenantResolver";

test("Tenant isolation works", () => {
  const a = resolveTenant("aries-key-A");
  const b = resolveTenant("aries-key-B");
  expect(a.tenantId).not.toBe(b.tenantId);
});
