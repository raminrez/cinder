import { expect, test } from "bun:test";
import { Card } from "./card";

test("exports Card", () => {
  expect(Card).toBeDefined();
});
