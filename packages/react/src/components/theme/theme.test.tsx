import { expect, test } from "bun:test";
import { Theme } from "./theme";

test("exports Theme", () => {
  expect(Theme).toBeDefined();
});
