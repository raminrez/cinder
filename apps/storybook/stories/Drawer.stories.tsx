import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Button, Drawer, TextField, Theme, type DrawerPlacement } from "@cinder/react";
import "./overlays.css";

const meta = {
  title: "Overlays/Drawer",
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component:
          "Drawer (slide-over sheet) provides edge-anchored overlay surfaces for secondary views, filters, and forms. Supports start/end/top/bottom placement and full RTL mirroring.",
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof Drawer>;

function DrawerDemo({ placement = "end" }: { placement?: DrawerPlacement }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overlay-story-stack">
      <Button onPress={() => setIsOpen(true)}>Open {placement} Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement={placement}
        title="Project Settings"
        description="Configure your environment variables and deployment pipeline."
        footer={
          <>
            <Button variant="secondary" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onPress={() => setIsOpen(false)}>
              Save changes
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField label="Deployment Name" defaultValue="cinder-production" />
          <TextField label="Domain" defaultValue="app.cinder.dev" />
          <p style={{ margin: 0, color: "var(--cinder-text-secondary)", fontSize: "0.875rem" }}>
            Changes will be deployed automatically after commit.
          </p>
        </div>
      </Drawer>
    </div>
  );
}

export const Playground: Story = {
  render: () => <DrawerDemo placement="end" />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Open end Drawer/i });
    await userEvent.click(trigger);

    const body = within(document.body);
    expect(await body.findByText("Project Settings")).toBeInTheDocument();

    const cancelBtn = body.getByRole("button", { name: "Cancel" });
    await userEvent.click(cancelBtn);
  },
};

function DrawerPlacementsDemo() {
  const [activePlacement, setActivePlacement] = useState<DrawerPlacement | null>(null);

  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {(["start", "end", "top", "bottom"] as const).map((p) => (
        <Button key={p} variant="secondary" onPress={() => setActivePlacement(p)}>
          {p.toUpperCase()} Drawer
        </Button>
      ))}
      {activePlacement && (
        <Drawer
          isOpen={true}
          onOpenChange={(open) => !open && setActivePlacement(null)}
          placement={activePlacement}
          title={`${activePlacement.toUpperCase()} Drawer`}
          description={`Drawer mounted from the ${activePlacement} edge of the screen.`}
          footer={
            <Button variant="primary" onPress={() => setActivePlacement(null)}>
              Close
            </Button>
          }
        >
          <p>Drawer content aligned to {activePlacement}.</p>
        </Drawer>
      )}
    </div>
  );
}

function DrawerRtlDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Theme direction="rtl">
      <div dir="rtl" className="overlay-story-stack">
        <Button onPress={() => setIsOpen(true)}>باز کردن کشوی کناری</Button>
        <Drawer
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          dir="rtl"
          placement="end"
          title="تنظیمات پروژه"
          description="پیکربندی متغیرهای محیطی و خط لوله انتشار."
          footer={
            <>
              <Button variant="secondary" onPress={() => setIsOpen(false)}>
                انصراف
              </Button>
              <Button variant="primary" onPress={() => setIsOpen(false)}>
                ذخیره تغییرات
              </Button>
            </>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField label="نام استقرار" defaultValue="cinder-production" />
            <TextField label="دامنه اصلی" defaultValue="app.cinder.dev" />
          </div>
        </Drawer>
      </div>
    </Theme>
  );
}

export const Placements: Story = {
  render: () => <DrawerPlacementsDemo />,
};

export const RTL: Story = {
  render: () => <DrawerRtlDemo />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "باز کردن کشوی کناری" });
    await userEvent.click(trigger);

    const body = within(document.body);
    expect(await body.findByText("تنظیمات پروژه")).toBeInTheDocument();

    const cancelBtn = body.getByRole("button", { name: "انصراف" });
    await userEvent.click(cancelBtn);
  },
};
