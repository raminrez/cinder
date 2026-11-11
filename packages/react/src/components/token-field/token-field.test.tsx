import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { TokenField } from "./token-field";

test("renders TokenField", () => {
  const html = renderToStaticMarkup(<TokenField label="Tags" />);
  expect(html).toContain("Tags");
});
