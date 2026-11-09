import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { AlertDialog, Button, Theme } from "@cinder/react";
import "./overlays.css";

const onConfirm = fn();

const meta = {
  title: "Overlays/AlertDialog",
  component: AlertDialog,
  parameters: {
    docs: {
      description: {
        component:
          "AlertDialog is a modal dialog preset for high-impact confirmation decisions (such as deleting a project or terminating an instance).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function AlertDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <div className="overlay-story-stack">
      <Button variant="danger" onPress={() => setIsOpen(true)}>
        Delete Cluster
      </Button>

      <AlertDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        kind="danger"
        title="Delete production cluster?"
        description="This action cannot be undone. All active containers and associated volume storage will be permanently destroyed."
        confirmLabel="Yes, delete cluster"
        cancelLabel="Cancel"
        isPending={isPending}
        onConfirm={() => {
          setIsPending(true);
          onConfirm();
          setTimeout(() => {
            setIsPending(false);
            setIsOpen(false);
          }, 800);
        }}
      />
    </div>
  );
}

export const Playground: Story = {
  render: () => <AlertDialogDemo />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Delete Cluster" });
    await userEvent.click(trigger);

    const body = within(document.body);
    const dialog = await body.findByRole("alertdialog");
    expect(dialog).toBeInTheDocument();
    expect(body.getByText("Delete production cluster?")).toBeInTheDocument();

    const cancelBtn = body.getByRole("button", { name: "Cancel" });
    await userEvent.click(cancelBtn);
  },
};

function AlertDialogRtlDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Theme direction="rtl">
      <div dir="rtl" className="overlay-story-stack">
        <Button variant="danger" onPress={() => setIsOpen(true)}>
          حذف پایگاه داده
        </Button>
        <AlertDialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          dir="rtl"
          kind="danger"
          title="آیا از حذف پایگاه داده اطمینان دارید؟"
          description="این عملیات غیرقابل بازگشت است و تمامی داده‌های مربوط به آن برای همیشه پاک خواهند شد."
          confirmLabel="بله، حذف کن"
          cancelLabel="انصراف"
          onConfirm={() => setIsOpen(false)}
        />
      </div>
    </Theme>
  );
}

export const RTL: Story = {
  render: () => <AlertDialogRtlDemo />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "حذف پایگاه داده" });
    await userEvent.click(trigger);

    const body = within(document.body);
    expect(await body.findByText("آیا از حذف پایگاه داده اطمینان دارید؟")).toBeInTheDocument();

    const cancelBtn = body.getByRole("button", { name: "انصراف" });
    await userEvent.click(cancelBtn);
  },
};
