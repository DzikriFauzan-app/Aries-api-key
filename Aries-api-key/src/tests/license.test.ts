import { upgradeLicense, getLicense } from "../api/licenseStore";

test("License upgrade works", () => {
  const key = "aries-license-test";
  upgradeLicense(key, "PRO");
  const lic = getLicense(key);
  expect(lic.plan).toBe("PRO");
});
