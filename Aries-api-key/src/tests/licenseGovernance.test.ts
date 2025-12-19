import { setLicense, getLicense } from "../api/licenseStore";

test("License plan upgrade works", () => {
  const key = "aries-plan-test";
  setLicense(key, "PRO");
  const lic = getLicense(key);
  expect(lic.plan).toBe("PRO");
});
