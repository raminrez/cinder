import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Alert, Theme } from "@cinder/react";
import "./feedback.css";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          "Alert provides contextual feedback messages with subtle, solid, and bordered surface treatments across semantic kinds.",
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const VariantsAndKinds: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ margin: "0 0 0.75rem" }}>Subtle (Default)</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Alert kind="info" variant="subtle" title="Scheduled Maintenance">
            Database backup will begin tonight at 02:00 UTC.
          </Alert>
          <Alert kind="success" variant="subtle" title="Deployment Succeeded">
            Production release v2.4.0 is live across all edge regions.
          </Alert>
          <Alert kind="warning" variant="subtle" title="High Memory Consumption">
            Instance usage exceeded 85% for the last 15 minutes.
          </Alert>
          <Alert kind="error" variant="subtle" title="Payment Authorization Failed">
            Please verify your billing method before service suspension.
          </Alert>
        </div>
      </div>

      <div>
        <h4 style={{ margin: "0 0 0.75rem" }}>Solid (High Emphasis)</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Alert kind="info" variant="solid" title="System Announcement">
            New features are available in the preview release.
          </Alert>
          <Alert kind="success" variant="solid" title="Cluster Healthy">
            All nodes are responding within normal latency thresholds.
          </Alert>
          <Alert kind="warning" variant="solid" title="Quota Limit Warning">
            You have used 92% of your monthly bandwidth allowance.
          </Alert>
          <Alert kind="error" variant="solid" title="Service Disrupted">
            Incident active on us-east-1. Engineers are investigating.
          </Alert>
        </div>
      </div>

      <div>
        <h4 style={{ margin: "0 0 0.75rem" }}>Bordered</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Alert kind="info" variant="bordered" title="Information Note">
            Review your API credentials before upgrading SDK.
          </Alert>
          <Alert kind="success" variant="bordered" title="Verification Complete">
            Domain ownership confirmed via DNS TXT record.
          </Alert>
          <Alert kind="warning" variant="bordered" title="Certificates Expiring Soon">
            SSL certificate renews in 7 days.
          </Alert>
          <Alert kind="error" variant="bordered" title="Build Pipeline Failed">
            Syntax error in dockerfile at line 14.
          </Alert>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Scheduled Maintenance")).toBeInTheDocument();
    expect(canvas.getByText("Deployment Succeeded")).toBeInTheDocument();
    expect(canvas.getByText("System Announcement")).toBeInTheDocument();
    expect(canvas.getByText("Information Note")).toBeInTheDocument();
  },
};

export const RTL: Story = {
  render: () => (
    <Theme direction="rtl">
      <div dir="rtl" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Alert kind="info" variant="subtle" title="نگهداری دوره‌ای سیستم">
          عملیات پشتیبان‌گیری پایگاه داده امشب ساعت ۰۲:۰۰ آغاز می‌شود.
        </Alert>
        <Alert kind="success" variant="solid" title="استقرار با موفقیت انجام شد">
          نسخه جدید در تمام لبه‌های ابری منتشر شد.
        </Alert>
        <Alert kind="warning" variant="bordered" title="هشدار مصرف حافظه">
          میزان استفاده از منابع سرور از مرز ۸۵ درصد عبور کرده است.
        </Alert>
        <Alert kind="error" variant="subtle" title="خطا در برقراری ارتباط">
          اتصال به سرویس احراز هویت با اختلال مواجه شد.
        </Alert>
      </div>
    </Theme>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("نگهداری دوره‌ای سیستم")).toBeInTheDocument();
    expect(canvas.getByText("استقرار با موفقیت انجام شد")).toBeInTheDocument();
  },
};
