import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { ActionableNotification, Button } from "@hashti/react";
import "./feedback.css";

const meta = {
  title: "Feedback/ActionableNotification",
  component: ActionableNotification,
  parameters: {
    docs: {
      description: {
        component:
          "ActionableNotification provides an interactive banner backed by role='alertdialog' that focuses an action button on mount for immediate user resolution.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function ActionableNotificationDemo() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <div className="feedback-story-stack">
        <Button variant="secondary" onPress={() => setVisible(true)}>
          Show Notification
        </Button>
      </div>
    );
  }

  return (
    <div className="feedback-story-stack">
      <ActionableNotification
        kind="warning"
        title="Unsaved changes detected"
        action={
          <Button variant="secondary" size="sm">
            Save now
          </Button>
        }
        onDismiss={() => setVisible(false)}
      >
        Your edits will be lost if you leave this tab without saving.
      </ActionableNotification>
    </div>
  );
}

export const Playground: Story = {
  render: () => <ActionableNotificationDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = canvas.getByRole("alertdialog");
    expect(dialog).toBeInTheDocument();
    expect(canvas.getByText("Unsaved changes detected")).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Save now" })).toBeInTheDocument();
  },
};

export const Kinds: Story = {
  render: () => (
    <div className="feedback-story-stack">
      <ActionableNotification
        kind="error"
        autoFocusAction={false}
        title="Build deployment failed"
        action={
          <Button variant="secondary" size="sm">
            View logs
          </Button>
        }
      >
        Docker image exited with status code 137 (OOM).
      </ActionableNotification>

      <ActionableNotification
        kind="success"
        autoFocusAction={false}
        title="Payment verified"
        action={
          <Button variant="secondary" size="sm">
            Download receipt
          </Button>
        }
      >
        Your subscription invoice #INV-2026 has been settled.
      </ActionableNotification>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Build deployment failed")).toBeInTheDocument();
    expect(canvas.getByText("Payment verified")).toBeInTheDocument();
  },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="feedback-story-stack">
      <ActionableNotification
        kind="info"
        autoFocusAction={false}
        title="نسخه جدید در دسترس است"
        action={
          <Button variant="secondary" size="sm">
            به‌روزرسانی
          </Button>
        }
      >
        نسخه ۲.۴.۰ با بهبودهای عملکردی و امنیتی آماده نصب می‌باشد.
      </ActionableNotification>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("نسخه جدید در دسترس است")).toBeInTheDocument();
  },
};
