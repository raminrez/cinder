import { expect, test } from "bun:test";
import { ProgressBar } from "./progress";

test("exports ProgressBar", () => {
  expect(ProgressBar).toBeDefined();
});
