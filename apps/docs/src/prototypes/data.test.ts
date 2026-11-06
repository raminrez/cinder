import { expect, test } from "bun:test";
import { findReviews, sampleReviews } from "./data";

test("search combines a trimmed, case-insensitive term with the status filter", () => {
  const matches = findReviews(sampleReviews, "  OMAR  ", "review", {
    column: "due",
    direction: "ascending",
  });
  expect(matches.map((review) => review.id)).toEqual(["CDR-102"]);
  expect(
    findReviews(sampleReviews, "CDR-102", "ready", { column: "due", direction: "ascending" }),
  ).toEqual([]);
});

test("sorting uses dates or names without reordering the shared sample", () => {
  const original = sampleReviews.map((review) => review.id);
  const latest = findReviews(sampleReviews, "", "all", {
    column: "due",
    direction: "descending",
  });
  expect(latest.slice(0, 3).map((review) => review.id)).toEqual(["CDR-112", "CDR-110", "CDR-111"]);
  const byName = findReviews(sampleReviews, "", "all", {
    column: "title",
    direction: "ascending",
  });
  expect(byName[0]?.title).toBe("Button focus states");
  expect(byName.at(-1)?.title).toBe("Toast reading time");
  expect(sampleReviews.map((review) => review.id)).toEqual(original);
});
