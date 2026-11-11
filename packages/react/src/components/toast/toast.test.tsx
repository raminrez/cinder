import { expect, test } from "bun:test";
import * as ToastModule from "./toast";

test("exports Toast module", () => {
  expect(ToastModule).toBeDefined();
});
