import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ColorSwatch } from "./color";

test("renders ColorSwatch", () => {
  const html = renderToStaticMarkup(<ColorSwatch color="#00b4d8" />);
  expect(html).toContain("hashti-color-swatch");
});
