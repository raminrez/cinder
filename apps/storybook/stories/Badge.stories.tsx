import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Badge, Button, Icon } from "@cinder/react";
import "./content.css";

const meta = {
  title: "Content/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "Badges provide floating numeric counts or status dot indicators on icons, buttons, or standalone counters.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: () => (
    <div className="content-story-stack">
      <div className="content-card">
        <h4 className="content-card-title">Floating count badges</h4>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Badge count={5} kind="danger">
            <Button variant="secondary" iconOnly aria-label="Notifications">
              <Icon name="alert" />
            </Button>
          </Badge>

          <Badge count={120} max={99} kind="info">
            <Button variant="secondary" iconOnly aria-label="Messages">
              <Icon name="inbox" />
            </Button>
          </Badge>

          <Badge isDot kind="success" placement="bottom-right">
            <Button variant="secondary" iconOnly aria-label="System status">
              <Icon name="settings" />
            </Button>
          </Badge>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("5")).toBeInTheDocument();
    expect(canvas.getByText("99+")).toBeInTheDocument();
  },
};

export const KindsAndPlacements: Story = {
  render: () => (
    <div className="content-story-stack">
      <div className="content-card">
        <h4 className="content-card-title">Status Kinds</h4>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Badge count={3} kind="danger" />
          <Badge count={8} kind="warning" />
          <Badge count={14} kind="success" />
          <Badge count={42} kind="info" />
          <Badge count={99} kind="neutral" />
          <Badge isDot kind="danger" />
          <Badge isDot kind="success" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("42")).toBeInTheDocument();
  },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="content-story-stack">
      <div className="content-card">
        <h4 className="content-card-title">نشان‌های شمارنده راست‌به‌چپ (RTL)</h4>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Badge count={12} kind="danger">
            <Button variant="secondary" iconOnly aria-label="پیام‌ها">
              <Icon name="inbox" />
            </Button>
          </Badge>
          <Badge count={150} max={99} kind="warning">
            <Button variant="secondary" iconOnly aria-label="هشدارها">
              <Icon name="alert" />
            </Button>
          </Badge>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("12")).toBeInTheDocument();
    expect(canvas.getByText("99+")).toBeInTheDocument();
  },
};
