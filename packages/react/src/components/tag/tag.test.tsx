import { expect, test } from "bun:test";
import { Tag } from "./tag";

test("exports Tag", () => {
  expect(Tag).toBeDefined();
});
