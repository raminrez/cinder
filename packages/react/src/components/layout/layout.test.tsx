import { expect, test } from "bun:test";
import { Stack, Grid } from "./layout";

test("exports Stack and Grid", () => {
  expect(Stack).toBeDefined();
  expect(Grid).toBeDefined();
});
