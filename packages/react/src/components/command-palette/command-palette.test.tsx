import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { CommandPalette } from "./command-palette";

test("renders CommandPalette", () => {
  const html = renderToStaticMarkup(<CommandPalette.Empty>No results</CommandPalette.Empty>);
  expect(html).toContain("No results");
});
