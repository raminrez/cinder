import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./button";

test("renders Button with Hashti modern styling", () => {
  const html = renderToStaticMarkup(<Button variant="primary">Click</Button>);
  expect(html).toContain("hashti-button");
  expect(html).toContain("Click");
});
