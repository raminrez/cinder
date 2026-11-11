import { describe, expect, test } from "bun:test";
import { acceptsFile } from "../../packages/react/src/components/dropzone";
import { paginationRange } from "../../packages/react/src/components/pagination";

describe("file selection validation", () => {
  test("accepts extension, exact MIME, and MIME-family matches", () => {
    expect(acceptsFile(new File(["svg"], "MARK.SVG", { type: "" }), [".svg"])).toBeNull();
    expect(
      acceptsFile(new File(["png"], "image.png", { type: "image/png" }), ["image/*"]),
    ).toBeNull();
    expect(
      acceptsFile(new File(["notes"], "notes.txt", { type: "text/plain" }), ["text/plain"]),
    ).toBeNull();
    expect(acceptsFile(new File([""], "unknown"))).toBeNull();
  });

  test("rejects wrong types and files over the byte limit, including accepted types", () => {
    const file = new File(["12345"], "notes.txt", { type: "text/plain" });
    expect(acceptsFile(file, ["image/*", ".svg"])).toBe("notes.txt is not an accepted file type.");
    expect(acceptsFile(file, ["text/plain"], 4)).toBe("notes.txt exceeds the size limit.");
    expect(acceptsFile(file, ["text/plain"], 5)).toBeNull();
    expect(acceptsFile(new File(["png"], "image.png.exe"), [".png"])).not.toBeNull();
  });
});

describe("pagination bounds", () => {
  test("reports first, final, and empty pages without nonexistent items", () => {
    expect(paginationRange(48, 10, 1)).toEqual({
      page: 1,
      pageSize: 10,
      pages: 5,
      start: 1,
      end: 10,
      total: 48,
    });
    expect(paginationRange(48, 10, 5)).toEqual({
      page: 5,
      pageSize: 10,
      pages: 5,
      start: 41,
      end: 48,
      total: 48,
    });
    expect(paginationRange(0, 10, 1)).toEqual({
      page: 1,
      pageSize: 10,
      pages: 1,
      start: 0,
      end: 0,
      total: 0,
    });
  });

  test("clamps stale pages after filtering and normalizes invalid input", () => {
    expect(paginationRange(3, 10, 5)).toEqual({
      page: 1,
      pageSize: 10,
      pages: 1,
      start: 1,
      end: 3,
      total: 3,
    });
    expect(paginationRange(48, 10, -1).page).toBe(1);
    expect(paginationRange(NaN, Infinity, NaN)).toEqual({
      page: 1,
      pageSize: 10,
      pages: 1,
      start: 0,
      end: 0,
      total: 0,
    });
    const range = paginationRange(10.9, 0, 200);
    expect(range).toEqual({ page: 10, pageSize: 1, pages: 10, start: 10, end: 10, total: 10 });
  });
});
