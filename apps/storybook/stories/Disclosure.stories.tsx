import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Disclosure,
  DisclosureGroup,
  Button,
} from "@hashti/react";
import "./navigation.css";

const meta = {
  title: "Navigation/Disclosure",
  component: Disclosure,
  parameters: {
    docs: {
      description: {
        component:
          "Disclosure provides a standalone collapsible region (or grouped collapsible sections) for progressive disclosure of complex settings, analytics breakdowns, and card details.",
      },
    },
  },
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div className="navigation-story-stack">
      <Disclosure defaultExpanded>
        <Disclosure.Trigger headingLevel={3}>
          <span>Advanced Security Policies</span>
          <Disclosure.Indicator />
        </Disclosure.Trigger>
        <Disclosure.Panel>
          <p style={{ margin: 0 }}>
            Strict Mutual TLS (mTLS) enforcement requires valid client certificates on every request.
            Revocation lists are cached locally and refreshed every 15 minutes.
          </p>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Advanced Security Policies/ });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    const panelContent = canvas.getByText(/Strict Mutual TLS \(mTLS\) enforcement/);
    expect(panelContent).toBeInTheDocument();

    // Toggle collapse
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    // Toggle back to expanded
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  },
};

export const Variants: Story = {
  render: () => (
    <div className="navigation-story-stack">
      <div>
        <h4 style={{ margin: "0 0 0.5rem" }}>Default Variant (Divided)</h4>
        <Disclosure variant="default">
          <Disclosure.Trigger>
            <span>Network Routing Rules</span>
            <Disclosure.Indicator />
          </Disclosure.Trigger>
          <Disclosure.Panel>
            Manage BGP route reflectors and private subnet advertisements.
          </Disclosure.Panel>
        </Disclosure>
      </div>

      <div>
        <h4 style={{ margin: "0 0 0.5rem" }}>Card Variant</h4>
        <Disclosure variant="card" defaultExpanded>
          <Disclosure.Trigger>
            <span>Audit Trail & Event Ingestion</span>
            <Disclosure.Indicator />
          </Disclosure.Trigger>
          <Disclosure.Panel>
            Forward structured JSON events to CloudWatch, Datadog, or S3 bucket destinations.
          </Disclosure.Panel>
        </Disclosure>
      </div>

      <div>
        <h4 style={{ margin: "0 0 0.5rem" }}>Flush Variant</h4>
        <Disclosure variant="flush">
          <Disclosure.Trigger>
            <span>Telemetry & Tracing</span>
            <Disclosure.Indicator />
          </Disclosure.Trigger>
          <Disclosure.Panel>
            OpenTelemetry collector endpoints sampling at 10% rate.
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cardTrigger = canvas.getByRole("button", { name: /Audit Trail & Event Ingestion/ });
    expect(cardTrigger).toHaveAttribute("aria-expanded", "true");

    const flushTrigger = canvas.getByRole("button", { name: /Telemetry & Tracing/ });
    expect(flushTrigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(flushTrigger);
    expect(flushTrigger).toHaveAttribute("aria-expanded", "true");
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="navigation-story-stack">
      <div>
        <h4 style={{ margin: "0 0 0.5rem" }}>Small (sm)</h4>
        <Disclosure size="sm">
          <Disclosure.Trigger>
            <span>Compact Information</span>
            <Disclosure.Indicator />
          </Disclosure.Trigger>
          <Disclosure.Panel>Summary for tight sidebars and tool palettes.</Disclosure.Panel>
        </Disclosure>
      </div>

      <div>
        <h4 style={{ margin: "0 0 0.5rem" }}>Medium (md - default)</h4>
        <Disclosure size="md">
          <Disclosure.Trigger>
            <span>Standard Information</span>
            <Disclosure.Indicator />
          </Disclosure.Trigger>
          <Disclosure.Panel>General application disclosure area.</Disclosure.Panel>
        </Disclosure>
      </div>

      <div>
        <h4 style={{ margin: "0 0 0.5rem" }}>Large (lg)</h4>
        <Disclosure size="lg">
          <Disclosure.Trigger>
            <span>Large Information</span>
            <Disclosure.Indicator />
          </Disclosure.Trigger>
          <Disclosure.Panel>Prominent landing page or checkout disclosure.</Disclosure.Panel>
        </Disclosure>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const smTrigger = canvas.getByRole("button", { name: /Compact Information/ });
    const mdTrigger = canvas.getByRole("button", { name: /Standard Information/ });
    const lgTrigger = canvas.getByRole("button", { name: /Large Information/ });

    expect(smTrigger).toBeInTheDocument();
    expect(mdTrigger).toBeInTheDocument();
    expect(lgTrigger).toBeInTheDocument();
  },
};

export const Grouped: Story = {
  render: () => (
    <div className="navigation-story-stack">
      <DisclosureGroup
        defaultExpandedKeys={["item-1"]}
        allowsMultipleExpanded
        variant="card"
        aria-label="FAQ Accordion"
      >
        <Disclosure id="item-1">
          <Disclosure.Trigger headingLevel={4}>
            <span>How do billing cycles work?</span>
            <Disclosure.Indicator />
          </Disclosure.Trigger>
          <Disclosure.Panel>
            Billing cycles renew on the first calendar day of every month with pro-rated adjustments.
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure id="item-2">
          <Disclosure.Trigger headingLevel={4}>
            <span>Can I migrate across clusters with zero downtime?</span>
            <Disclosure.Indicator />
          </Disclosure.Trigger>
          <Disclosure.Panel>
            Yes, blue-green deployment pipelines coordinate live DNS routing switchovers seamlessly.
          </Disclosure.Panel>
        </Disclosure>
      </DisclosureGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const q1 = canvas.getByRole("button", { name: /How do billing cycles work\?/ });
    const q2 = canvas.getByRole("button", { name: /Can I migrate across clusters with zero downtime\?/ });

    expect(q1).toHaveAttribute("aria-expanded", "true");
    expect(q2).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(q2);
    expect(q2).toHaveAttribute("aria-expanded", "true");
    // allowsMultipleExpanded keeps q1 expanded
    expect(q1).toHaveAttribute("aria-expanded", "true");
  },
};
