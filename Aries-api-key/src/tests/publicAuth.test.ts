import { publicAuth } from "../api/publicAuthMiddleware";
import fs from "fs";

beforeAll(() => {
  fs.writeFileSync(
    "data/api_keys.json",
    JSON.stringify([
      { key: "valid-key", quota: 10 }
    ])
  );
});

test("Rejects request without API key", () => {
  const req: any = { headers: {} };
  const res: any = {
    status: jest.fn(() => res),
    json: jest.fn()
  };

  publicAuth(req, res, () => {});
  expect(res.status).toHaveBeenCalledWith(401);
});

test("Accepts valid API key", () => {
  const req: any = { headers: { "x-aries-key": "valid-key" } };
  const res: any = {};
  let called = false;

  publicAuth(req, res, () => {
    called = true;
  });

  expect(called).toBe(true);
});
