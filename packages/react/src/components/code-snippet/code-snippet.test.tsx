import { expect, test } from "bun:test";
import { CodeSnippet } from "./code-snippet";

test("exports CodeSnippet", () => {
  expect(CodeSnippet).toBeDefined();
});
