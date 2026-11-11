import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Avatar, AvatarGroup, getInitials } from "@hashti/react";
import "./content.css";

const meta = {
  title: "Content/Avatar",
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          "Avatars represent users or entities with images, Persian/Arabic grapheme-aware initials, or fallback icons. Supports presence tangent indicators and AvatarGroup with count overflow.",
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div className="content-story-stack">
      <div className="content-card">
        <h4 className="content-card-title">Sizes</h4>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar size="xs" name="Alex Morgan" />
          <Avatar size="sm" name="Alex Morgan" />
          <Avatar size="md" name="Alex Morgan" />
          <Avatar size="lg" name="Alex Morgan" />
          <Avatar size="xl" name="Alex Morgan" />
        </div>
      </div>

      <div className="content-card">
        <h4 className="content-card-title">Presence indicators</h4>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar name="Sarah Connor" presence="online" presenceLabel="Active now" />
          <Avatar name="John Doe" presence="away" presenceLabel="Away" />
          <Avatar name="Ellen Ripley" presence="busy" presenceLabel="In a meeting" />
          <Avatar name="Bruce Wayne" presence="dnd" presenceLabel="Do not disturb" />
          <Avatar name="Clark Kent" presence="offline" presenceLabel="Offline" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const avatar = canvas.getByRole("img", { name: "Sarah Connor" });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("data-size", "md");
  },
};

export const InitialsAndFallbacks: Story = {
  render: () => (
    <div className="content-story-stack">
      <div className="content-card">
        <h4 className="content-card-title">Latin & Persian / Arabic Initials</h4>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar name="John Smith" />
          <Avatar name="Marie Curie" />
          <Avatar name="سارا احمدی" />
          <Avatar name="علی رضایی" />
          <Avatar fallback={<span aria-hidden="true">★</span>} aria-label="Starred Agent" />
          <Avatar aria-label="Default Anonymous User" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("img", { name: "John Smith" })).toBeInTheDocument();
    expect(canvas.getByRole("img", { name: "سارا احمدی" })).toBeInTheDocument();
    expect(getInitials("سارا احمدی")).toBe("سا");
  },
};

export const Group: Story = {
  render: () => (
    <div className="content-story-stack">
      <div className="content-card">
        <h4 className="content-card-title">Avatar Group with Overflow</h4>
        <AvatarGroup max={3} size="md">
          <Avatar name="Ada Lovelace" presence="online" />
          <Avatar name="Grace Hopper" presence="online" />
          <Avatar name="Margaret Hamilton" presence="away" />
          <Avatar name="Katherine Johnson" />
          <Avatar name="Joan Clarke" />
        </AvatarGroup>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("group")).toBeInTheDocument();
    expect(canvas.getByText("+2")).toBeInTheDocument();
  },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="content-story-stack">
      <div className="content-card">
        <h4 className="content-card-title">پروفایل کاربری راست‌به‌چپ (RTL)</h4>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar name="رضا پهلوانی" presence="online" presenceLabel="آنلاین" />
          <Avatar name="مریم میرزاخانی" presence="busy" presenceLabel="مشغول" />
          <AvatarGroup max={2}>
            <Avatar name="علی احمدی" />
            <Avatar name="فاطمه حسینی" />
            <Avatar name="حسین محمدی" />
          </AvatarGroup>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("img", { name: "رضا پهلوانی" })).toBeInTheDocument();
    expect(canvas.getByText("+1")).toBeInTheDocument();
  },
};
