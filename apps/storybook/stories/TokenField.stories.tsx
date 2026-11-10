import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, userEvent } from "storybook/test";
import {
  TokenField,
  TokenFieldValue,
  Icon,
} from "@cinder/react";
import "./fields.css";

const meta = {
  title: "Fields/TokenField",
  component: TokenField,
  parameters: {
    docs: {
      description: {
        component:
          "TokenField provides an editable text area with inline structured tokens for AI prompt construction, mention tagging, structured search, and filter builders.",
      },
    },
  },
} satisfies Meta<typeof TokenField>;

export default meta;
type Story = StoryObj<typeof meta>;

function PlaygroundExample() {
  const [value, setValue] = useState(
    () =>
      new TokenFieldValue([
        { type: "text", text: "Summarize " },
        { type: "token", text: "@DesignTokens", value: { id: "tokens" } },
        { type: "text", text: " and contrast with " },
        { type: "token", text: "@FrameTheme", value: { id: "theme" } },
        { type: "text", text: " " },
      ]),
  );

  return (
    <div className="field-story-stack">
      <TokenField
        label="AI Prompt with Context Tokens"
        description="Type text or reference design assets with @ tokens."
        placeholder="Type a prompt..."
        value={value}
        onChange={setValue}
      />
      <div style={{ marginTop: "1rem", fontSize: "0.8125rem", color: "var(--cinder-text-secondary)" }}>
        Current serialized value: <code>{value.toString()}</code>
      </div>
    </div>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText("AI Prompt with Context Tokens");
    expect(label).toBeInTheDocument();

    const token1 = canvas.getByText("@DesignTokens");
    expect(token1).toBeInTheDocument();

    const token2 = canvas.getByText("@FrameTheme");
    expect(token2).toBeInTheDocument();
  },
};

function CompoundExample() {
  const [segments, setSegments] = useState([
    { id: "1", text: "gemini-1.5-pro", icon: "sparkle" as const },
    { id: "2", text: "temperature: 0.7", icon: "settings" as const },
  ]);

  const removeSegment = (id: string) => {
    setSegments((prev) => prev.filter((s) => s.id !== id));
  };

  const val = new TokenFieldValue(
    segments.flatMap((s) => [
      { type: "token" as const, text: s.text, value: s },
      { type: "text" as const, text: " " },
    ]),
  );

  return (
    <div className="field-story-stack">
      <TokenField.Root value={val} size="md">
        <TokenField.Label>Configured Model & Hyperparameters</TokenField.Label>
        <TokenField.Input>
          {(segment) => (
            <TokenField.Token
              key={segment.text}
              icon={<Icon name={(segment.value as any)?.icon ?? "sparkle"} />}
              onRemove={() => removeSegment((segment.value as any)?.id)}
            >
              {segment.text}
            </TokenField.Token>
          )}
        </TokenField.Input>
        <TokenField.Description>Click the remove button on any token to delete it.</TokenField.Description>
        <TokenField.ErrorMessage />
      </TokenField.Root>
      <div data-testid="token-count" style={{ marginTop: "0.5rem", fontSize: "0.8125rem" }}>
        Active tokens: {segments.length}
      </div>
    </div>
  );
}

export const CompoundAnatomy: Story = {
  render: () => <CompoundExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("gemini-1.5-pro")).toBeInTheDocument();
    expect(canvas.getByText("temperature: 0.7")).toBeInTheDocument();

    const removeButtons = canvas.getAllByLabelText("Remove token");
    expect(removeButtons.length).toBe(2);

    await userEvent.click(removeButtons[0]!);
    expect(canvas.getByTestId("token-count")).toHaveTextContent("Active tokens: 1");
  },
};

function MultilineExample() {
  const [val, setVal] = useState(
    () =>
      new TokenFieldValue([
        { type: "text", text: "You are an expert design systems engineer.\nAnalyze " },
        { type: "token", text: "@packages/react", value: { path: "packages/react" } },
        { type: "text", text: "\nGenerate unit tests for all new productivity components." },
      ]),
  );

  return (
    <div className="field-story-stack">
      <TokenField
        label="Multi-line AI Agent Directive"
        description="Supports multi-line prompt boxes with Enter/newline formatting."
        multiline
        placeholder="Enter multi-line system instructions..."
        value={val}
        onChange={setVal}
      />
    </div>
  );
}

export const MultilineAIPrompt: Story = {
  render: () => <MultilineExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    expect(input).toHaveAttribute("data-multiline", "true");
    expect(canvas.getByText("@packages/react")).toBeInTheDocument();
  },
};

export const SizesAndStates: Story = {
  render: () => {
    const sampleVal = new TokenFieldValue([
      { type: "token", text: "read-only-pill" },
      { type: "text", text: " and sample text" },
    ]);

    return (
      <div className="field-story-stack" style={{ display: "grid", gap: "1.5rem" }}>
        <TokenField
          label="Small Size (sm)"
          size="sm"
          value={sampleVal}
        />
        <TokenField
          label="Medium Size (md - default)"
          size="md"
          value={sampleVal}
        />
        <TokenField
          label="Large Size (lg)"
          size="lg"
          value={sampleVal}
        />
        <TokenField
          label="Disabled State"
          isDisabled
          value={sampleVal}
        />
        <TokenField
          label="Read-Only State"
          isReadOnly
          value={sampleVal}
        />
      </div>
    );
  },
};
