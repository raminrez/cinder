import type { SortDescriptor } from "@cinder/react";

export const directions = {
  field: {
    name: "Field",
    summary: "A sidebar, a clear table, and restrained corners.",
    geometry: "40 px controls · 4 px corners",
    goodFor: "A product that mixes settings, forms, and day-to-day data work.",
    tradeoff: "Check whether the green action and the review status are distinct enough.",
    reason:
      "Start here. It gives Cinder room to change without making familiar tasks harder to find.",
  },
  relay: {
    name: "Relay",
    summary: "The next task comes first, with more room around each control.",
    geometry: "48 px controls · 8 px corners",
    goodFor: "A service workflow where people complete one task at a time.",
    tradeoff: "You see fewer records at once. Check how much scrolling that adds.",
    reason: "Choose this if the next action matters more than comparing a whole table.",
  },
  index: {
    name: "Index",
    summary: "Compact rows and a detail pane keep the selected record in view.",
    geometry: "32 px tools · 40 px forms",
    goodFor: "Developer tools and long sessions with structured records.",
    tradeoff: "The compact layout asks more of the reader and can feel less welcoming.",
    reason: "Choose this if you spend more time scanning records than filling out forms.",
  },
} as const;

export type Direction = keyof typeof directions;
export const directionOrder: Direction[] = ["field", "relay", "index"];

export const reviewers = {
  maya: { name: "Maya Chen", initials: "MC", role: "Design" },
  omar: { name: "Omar Aziz", initials: "OA", role: "Engineering" },
  nina: { name: "Nina Patel", initials: "NP", role: "Accessibility" },
  sam: { name: "Sam Rivera", initials: "SR", role: "Engineering" },
  unassigned: { name: "Unassigned", initials: "", role: "Choose a reviewer" },
} as const;
export type Reviewer = keyof typeof reviewers;

export const reviewStates = {
  review: "Needs review",
  progress: "In progress",
  ready: "Ready",
} as const;
export type ReviewStatus = keyof typeof reviewStates;
export type StatusFilter = ReviewStatus | "all";

export type Review = {
  id: string;
  title: string;
  area: string;
  status: ReviewStatus;
  reviewer: Reviewer;
  due: string;
  note: string;
};

// Fictional reviews shared by all directions. These are not the research audit results.
export const sampleReviews: Review[] = [
  {
    id: "CDR-101",
    title: "Text field validation",
    area: "Forms",
    status: "review",
    reviewer: "maya",
    due: "2026-11-06",
    note: "Keep the helper text visible when an error appears. Check that the error names the field and explains how to fix it.",
  },
  {
    id: "CDR-102",
    title: "Select inside a dialog",
    area: "Overlays",
    status: "review",
    reviewer: "omar",
    due: "2026-11-06",
    note: "Check that Escape closes the options before the dialog. Focus should return to the dropdown, then to the button that opened the dialog.",
  },
  {
    id: "CDR-103",
    title: "Table keyboard order",
    area: "Collections",
    status: "progress",
    reviewer: "nina",
    due: "2026-11-09",
    note: "Move through the headers and rows with the keyboard. Confirm that sorting and selection remain separate actions.",
  },
  {
    id: "CDR-104",
    title: "Button focus states",
    area: "Actions",
    status: "ready",
    reviewer: "sam",
    due: "2026-11-09",
    note: "Compare focus, hover, pressed, and disabled states on both light and dark backgrounds.",
  },
  {
    id: "CDR-105",
    title: "File upload feedback",
    area: "Feedback",
    status: "review",
    reviewer: "unassigned",
    due: "2026-11-09",
    note: "Keep file names and the retry action visible after a failed upload. Explain which files need attention.",
  },
  {
    id: "CDR-106",
    title: "Dark theme in popups",
    area: "Themes",
    status: "progress",
    reviewer: "omar",
    due: "2026-11-10",
    note: "Match each popup with the theme of its trigger. Include a dropdown inside a dialog.",
  },
  {
    id: "CDR-107",
    title: "Navigation on small screens",
    area: "Navigation",
    status: "review",
    reviewer: "nina",
    due: "2026-11-10",
    note: "At 320 pixels wide, keep the current location and each destination readable. Keep touch targets apart.",
  },
  {
    id: "CDR-108",
    title: "Long checkbox labels",
    area: "Forms",
    status: "ready",
    reviewer: "maya",
    due: "2026-11-11",
    note: "Wrap a long label without moving the checkbox away from its first line. Check the disabled explanation as well.",
  },
  {
    id: "CDR-109",
    title: "Number field limits",
    area: "Forms",
    status: "progress",
    reviewer: "sam",
    due: "2026-11-11",
    note: "Try the minimum, maximum, an empty value, and keyboard steps. Keep the allowed range visible after an error.",
  },
  {
    id: "CDR-110",
    title: "Date picker focus return",
    area: "Overlays",
    status: "progress",
    reviewer: "nina",
    due: "2026-11-12",
    note: "Choose a date, then cancel a second attempt. Check where focus returns and which value remains.",
  },
  {
    id: "CDR-111",
    title: "Toast reading time",
    area: "Feedback",
    status: "ready",
    reviewer: "omar",
    due: "2026-11-12",
    note: "Give the message enough reading time. Keep important recovery instructions available after the toast closes.",
  },
  {
    id: "CDR-112",
    title: "Tabs with long names",
    area: "Navigation",
    status: "progress",
    reviewer: "unassigned",
    due: "2026-11-13",
    note: "Check long names at narrow widths. Keep the selected tab visible and preserve the expected arrow-key behavior.",
  },
];

export type WorkspaceSettings = {
  name: string;
  email: string;
  reviewer: Reviewer;
  limit: number;
  digest: boolean;
  completed: boolean;
};

export const initialSettings: WorkspaceSettings = {
  name: "Cinder studio",
  email: "reviews@cinder.example",
  reviewer: "maya",
  limit: 4,
  digest: true,
  completed: false,
};

export function findReviews(
  reviews: Review[],
  query: string,
  status: StatusFilter,
  sort: SortDescriptor,
) {
  const term = query.trim().toLowerCase();
  return reviews
    .filter(
      (review) =>
        (status === "all" || review.status === status) &&
        `${review.id} ${review.title} ${review.area} ${reviewers[review.reviewer].name}`
          .toLowerCase()
          .includes(term),
    )
    .sort((a, b) => {
      const result =
        sort.column === "title" ? a.title.localeCompare(b.title) : a.due.localeCompare(b.due);
      return (sort.direction === "descending" ? -result : result) || a.id.localeCompare(b.id);
    });
}

console.assert(
  new Set(sampleReviews.map((review) => review.id)).size === sampleReviews.length &&
    sampleReviews.every((review) => review.reviewer in reviewers && review.status in reviewStates),
  "The prototype needs unique review IDs and valid reviewers and statuses.",
);
