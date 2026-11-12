import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Accordion, AccordionItem, Button, Theme, useTheme, type Key } from "@hashti/react";
import "./navigation.css";

const meta = {
  title: "Navigation/Accordion",
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component:
          "Accordion (built on React Aria DisclosureGroup) lets users show and hide sections of related content on a page, conserving vertical space while keeping headings accessible.",
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div className="navigation-story-stack">
      <Accordion aria-label="System configuration sections">
        <AccordionItem id="network" title="Network settings">
          <p style={{ margin: 0 }}>
            Configure DNS records, VPC peering, and subnet route tables for inbound traffic.
          </p>
        </AccordionItem>
        <AccordionItem id="security" title="Security & Compliance">
          <p style={{ margin: 0 }}>
            Manage TLS certificates, Web Application Firewall (WAF) rules, and IP allowlists.
          </p>
        </AccordionItem>
        <AccordionItem id="storage" title="Storage volumes">
          <p style={{ margin: 0 }}>
            Attach persistent SSD block storage with automated snapshots and encryption at rest.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const netTrigger = canvas.getByRole("button", { name: "Network settings" });
    const secTrigger = canvas.getByRole("button", { name: "Security & Compliance" });

    expect(netTrigger).toHaveAttribute("aria-expanded", "false");
    expect(secTrigger).toHaveAttribute("aria-expanded", "false");

    // Click to expand
    await userEvent.click(netTrigger);
    expect(netTrigger).toHaveAttribute("aria-expanded", "true");
    expect(
      canvas.getByText(/Configure DNS records, VPC peering, and subnet route tables/),
    ).toBeVisible();

    // Click another accordion item (default single-select accordion closes previous)
    await userEvent.click(secTrigger);
    expect(secTrigger).toHaveAttribute("aria-expanded", "true");
    expect(netTrigger).toHaveAttribute("aria-expanded", "false");
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="navigation-story-stack">
      <div>
        <h4 style={{ margin: "0 0 0.5rem" }}>Small (sm)</h4>
        <Accordion size="sm" aria-label="Small accordion">
          <AccordionItem id="s1" title="Summary overview">
            Metrics aggregated across 12 pods.
          </AccordionItem>
          <AccordionItem id="s2" title="Log aggregation">
            Streaming audit logs enabled.
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 style={{ margin: "0 0 0.5rem" }}>Medium (md - default)</h4>
        <Accordion size="md" aria-label="Medium accordion">
          <AccordionItem id="m1" title="Cluster auto-scaler">
            Min 3 nodes, max 10 nodes in region us-east-1.
          </AccordionItem>
          <AccordionItem id="m2" title="Ingress controller">
            NGINX ingress with automated Let's Encrypt certificates.
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 style={{ margin: "0 0 0.5rem" }}>Large (lg)</h4>
        <Accordion size="lg" aria-label="Large accordion">
          <AccordionItem id="l1" title="High-availability topology">
            Multi-zone deployment with hot standby database replicas.
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const smTrigger = canvas.getByRole("button", { name: "Summary overview" });
    await userEvent.click(smTrigger);
    expect(smTrigger).toHaveAttribute("aria-expanded", "true");
    expect(canvas.getByText("Metrics aggregated across 12 pods.")).toBeVisible();
  },
};

export const AllowsMultipleExpanded: Story = {
  render: () => (
    <div className="navigation-story-stack">
      <Accordion
        allowsMultipleExpanded
        defaultExpandedKeys={["item-1"]}
        aria-label="Multiple expanded accordion"
      >
        <AccordionItem id="item-1" title="Overview and SLA">
          Guaranteed 99.99% uptime with automated failover across three availability zones.
        </AccordionItem>
        <AccordionItem id="item-2" title="Compute specs">
          64 vCPUs, 256GB ECC RAM, NVMe ephemeral scratch disk per instance.
        </AccordionItem>
        <AccordionItem id="item-3" title="Disaster recovery">
          Point-in-time snapshots created every 15 minutes and replicated globally.
        </AccordionItem>
      </Accordion>
    </div>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const trigger1 = canvas.getByRole("button", { name: "Overview and SLA" });
    const trigger2 = canvas.getByRole("button", { name: "Compute specs" });

    // Item 1 is expanded by default
    expect(trigger1).toHaveAttribute("aria-expanded", "true");
    expect(trigger2).toHaveAttribute("aria-expanded", "false");

    // Click item 2; both should remain expanded
    await userEvent.click(trigger2);
    expect(trigger1).toHaveAttribute("aria-expanded", "true");
    expect(trigger2).toHaveAttribute("aria-expanded", "true");
    expect(canvas.getByText(/64 vCPUs, 256GB ECC RAM/)).toBeVisible();
  },
};

function ControlledAccordionExample() {
  const [expandedKeys, setExpandedKeys] = useState<Iterable<Key>>(new Set(["general"]));

  return (
    <div className="navigation-story-stack">
      <div className="navigation-story-row">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setExpandedKeys(new Set(["general", "advanced"]))}
        >
          Expand all
        </Button>
        <Button size="sm" variant="ghost" onPress={() => setExpandedKeys(new Set())}>
          Collapse all
        </Button>
      </div>

      <Accordion
        allowsMultipleExpanded
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
        aria-label="Controlled accordion"
      >
        <AccordionItem id="general" title="General preferences">
          Theme mode, default editor font, and autosave intervals.
        </AccordionItem>
        <AccordionItem id="advanced" title="Advanced debugging">
          Kernel flags, heap tracing thresholds, and raw socket access.
        </AccordionItem>
        <AccordionItem id="locked" title="Organization policy (Locked)" isDisabled>
          Managed by enterprise administrator. Cannot be modified.
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export const DisabledAndControlled: Story = {
  render: () => <ControlledAccordionExample />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const expandAllBtn = canvas.getByRole("button", { name: "Expand all" });
    const collapseAllBtn = canvas.getByRole("button", { name: "Collapse all" });
    const generalTrigger = canvas.getByRole("button", { name: "General preferences" });
    const advTrigger = canvas.getByRole("button", { name: "Advanced debugging" });
    const lockedTrigger = canvas.getByRole("button", { name: "Organization policy (Locked)" });

    expect(lockedTrigger).toBeDisabled();
    expect(generalTrigger).toHaveAttribute("aria-expanded", "true");
    expect(advTrigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(expandAllBtn);
    expect(generalTrigger).toHaveAttribute("aria-expanded", "true");
    expect(advTrigger).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(collapseAllBtn);
    expect(generalTrigger).toHaveAttribute("aria-expanded", "false");
    expect(advTrigger).toHaveAttribute("aria-expanded", "false");
  },
};

function LocalizedAccordion() {
  const { theme } = useTheme();
  return (
    <div className="navigation-story-stack">
      <Theme theme={theme} locale="fa-IR">
        <div dir="rtl">
          <Accordion aria-label="راهنمای تنظیمات سامانه">
            <AccordionItem id="fa-1" title="تنظیمات پایگاه داده">
              پیکربندی خوشه‌های توزیع‌شده با رونوشت‌های همگام و ذخیره‌سازی داده‌های ساختاریافته.
            </AccordionItem>
            <AccordionItem id="fa-2" title="احراز هویت و دسترسی">
              پشتیبانی از ورود یکپارچه سازمانی با پروتکل‌های OAuth 2.0 و SAML.
            </AccordionItem>
            <AccordionItem id="fa-3" title="پایش و رهگیری کارایی">
              نمودارهای بی‌درنگ مصرف حافظه، بار پردازنده و تحلیل لاگ‌های زیرساخت.
            </AccordionItem>
          </Accordion>
        </div>
      </Theme>
    </div>
  );
}

export const LongContentAndLocales: Story = {
  render: () => <LocalizedAccordion />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const dbTrigger = canvas.getByRole("button", { name: "تنظیمات پایگاه داده" });
    expect(dbTrigger).toBeVisible();

    await userEvent.click(dbTrigger);
    expect(dbTrigger).toHaveAttribute("aria-expanded", "true");
    expect(canvas.getByText(/پیکربندی خوشه‌های توزیع‌شده/)).toBeVisible();
  },
};
