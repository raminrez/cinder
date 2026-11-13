import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Tree } from "@hashti/react";

const meta = {
  title: "Collections/Tree",
  component: Tree,
  parameters: {
    docs: {
      description: {
        component:
          "Tree presents hierarchical data with nested navigation, expandable indicators, selection modes, and optional guideline connectors.",
      },
    },
  },
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Tree aria-label="Project file explorer">
        <Tree.Item id="src" textValue="src">
          <Tree.Content>
            <Tree.Indicator />
            <span>src</span>
          </Tree.Content>
          <Tree.Item id="src/components" textValue="components">
            <Tree.Content>
              <Tree.Indicator />
              <span>components</span>
            </Tree.Content>
            <Tree.Item id="src/components/Button.tsx" textValue="Button.tsx">
              <Tree.Content>
                <span>Button.tsx</span>
              </Tree.Content>
            </Tree.Item>
            <Tree.Item id="src/components/Tree.tsx" textValue="Tree.tsx">
              <Tree.Content>
                <span>Tree.tsx</span>
              </Tree.Content>
            </Tree.Item>
          </Tree.Item>
          <Tree.Item id="src/index.ts" textValue="index.ts">
            <Tree.Content>
              <span>index.ts</span>
            </Tree.Content>
          </Tree.Item>
        </Tree.Item>
        <Tree.Item id="package.json" textValue="package.json">
          <Tree.Content>
            <span>package.json</span>
          </Tree.Content>
        </Tree.Item>
      </Tree>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole("treegrid", { name: "Project file explorer" });
    expect(tree).toBeInTheDocument();
    expect(canvas.getByText("src")).toBeInTheDocument();
  },
};

export const MultiSelectWithCheckboxes: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Tree aria-label="Department permissions" selectionMode="multiple" showGuideLines>
        <Tree.Item id="engineering" textValue="Engineering">
          <Tree.Content>
            <Tree.Indicator />
            <Tree.Checkbox aria-label="Select Engineering" />
            <span>Engineering</span>
          </Tree.Content>
          <Tree.Item id="eng-frontend" textValue="Frontend">
            <Tree.Content>
              <Tree.Checkbox aria-label="Select Frontend" />
              <span>Frontend</span>
            </Tree.Content>
          </Tree.Item>
          <Tree.Item id="eng-backend" textValue="Backend">
            <Tree.Content>
              <Tree.Checkbox aria-label="Select Backend" />
              <span>Backend</span>
            </Tree.Content>
          </Tree.Item>
        </Tree.Item>
        <Tree.Item id="design" textValue="Design">
          <Tree.Content>
            <Tree.Indicator />
            <Tree.Checkbox aria-label="Select Design" />
            <span>Design</span>
          </Tree.Content>
          <Tree.Item id="design-system" textValue="Design Systems">
            <Tree.Content>
              <Tree.Checkbox aria-label="Select Design Systems" />
              <span>Design Systems</span>
            </Tree.Content>
          </Tree.Item>
        </Tree.Item>
      </Tree>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole("treegrid", { name: "Department permissions" });
    expect(tree).toBeInTheDocument();
    const items = canvas.getAllByRole("row");
    expect(items.length).toBeGreaterThanOrEqual(2);
  },
};
