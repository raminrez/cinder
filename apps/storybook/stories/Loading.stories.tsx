import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import {
  Loading,
  InlineLoading,
  Skeleton,
  Theme,
  useTheme,
} from "@cinder/react";
import "./feedback.css";

const meta = {
  title: "Feedback/Loading",
  component: Loading,
  parameters: {
    docs: {
      description: {
        component:
          "Loading, InlineLoading, and Skeleton components inform users of background asynchronous operations, state changes, and content layout placeholders.",
      },
    },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

function PlaygroundExample() {
  return (
    <div className="feedback-story-stack">
      <div className="feedback-card">
        <div>
          <h3 className="feedback-card-title">Asynchronous Loading Indicators</h3>
          <p className="feedback-card-description">
            Circular spinners and inline text loading cues.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div>
            <span style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.75rem", color: "var(--cinder-text-secondary)" }}>
              Large Spinner
            </span>
            <Loading size="lg" label="Synchronizing cloud resources" />
          </div>

          <div>
            <span style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.75rem", color: "var(--cinder-text-secondary)" }}>
              Small Spinner
            </span>
            <Loading size="sm" label="Fetching data" />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
          <InlineLoading status="active">Deploying changes to worker nodes…</InlineLoading>
          <InlineLoading status="success">Deployment finished successfully</InlineLoading>
          <InlineLoading status="error">Build process encountered an error</InlineLoading>
        </div>
      </div>
    </div>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Synchronizing cloud resources")).toBeInTheDocument();
    expect(canvas.getByText("Deploying changes to worker nodes…")).toBeInTheDocument();
    expect(canvas.getByText("Deployment finished successfully")).toBeInTheDocument();
  },
};

function SkeletonLoadersExample() {
  return (
    <div className="feedback-story-stack">
      <div className="feedback-card">
        <div>
          <h4 className="feedback-card-title">Content Placeholder Skeletons</h4>
          <p className="feedback-card-description">
            Low-fidelity layout mocks during initial resource fetching.
          </p>
        </div>

        {/* Card skeleton */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Skeleton height="1.5rem" width="40%" />
          <Skeleton lines={3} height="0.875rem" />
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <Skeleton height="2rem" width="6rem" />
            <Skeleton height="2rem" width="6rem" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const SkeletonLoaders: Story = {
  render: () => <SkeletonLoadersExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Content Placeholder Skeletons")).toBeInTheDocument();
  },
};

function LongContentAndLocalesExample() {
  const { theme } = useTheme();

  return (
    <div className="feedback-story-stack">
      <Theme theme={theme} locale="fa-IR">
        <div dir="rtl" className="feedback-card">
          <div>
            <h4 className="feedback-card-title">نشانگرهای بارگذاری به زبان فارسی</h4>
            <p className="feedback-card-description">نمایش وضعیت عملیات‌های در حال اجرا در محیط راست‌به‌چپ</p>
          </div>

          <InlineLoading status="active">در حال دریافت اطلاعات از سرور مرکزی…</InlineLoading>
          <InlineLoading status="success">اطلاعات حساب کاربری با موفقیت به‌روزرسانی شد</InlineLoading>
          <InlineLoading status="error">خطا در بارگذاری داده‌ها</InlineLoading>
        </div>
      </Theme>
    </div>
  );
}

export const LongContentAndLocales: Story = {
  render: () => <LongContentAndLocalesExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("نشانگرهای بارگذاری به زبان فارسی")).toBeInTheDocument();
    expect(canvas.getByText("در حال دریافت اطلاعات از سرور مرکزی…")).toBeInTheDocument();
  },
};
