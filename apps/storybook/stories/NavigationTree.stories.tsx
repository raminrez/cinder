import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { NavigationTree } from "@hashti/react";

const meta = {
  title: "Collections/NavigationTree",
  component: NavigationTree,
  parameters: {
    docs: {
      description: {
        component:
          "NavigationTree provides nested, hierarchical links for site structure and documentation with route active-state tracking, expandable sections, and accessible keyboard navigation.",
      },
    },
  },
} satisfies Meta<typeof NavigationTree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <NavigationTree
        aria-label="Docs Navigation"
        selectedRoute="/docs/components/navigation-tree"
      >
        <NavigationTree.Section>
          <NavigationTree.Header>Getting Started</NavigationTree.Header>
          <NavigationTree.Item
            id="intro"
            href="/docs/intro"
            textValue="Introduction"
          >
            <NavigationTree.Content>Introduction</NavigationTree.Content>
          </NavigationTree.Item>
          <NavigationTree.Item
            id="quickstart"
            href="/docs/quickstart"
            textValue="Quick Start"
          >
            <NavigationTree.Content>Quick Start</NavigationTree.Content>
          </NavigationTree.Item>
        </NavigationTree.Section>
        <NavigationTree.Section>
          <NavigationTree.Header>Components</NavigationTree.Header>
          <NavigationTree.Item
            id="collections"
            textValue="Collections"
          >
            <NavigationTree.Content>
              <NavigationTree.Indicator />
              <span>Collections</span>
            </NavigationTree.Content>
            <NavigationTree.Item
              id="listbox"
              href="/docs/components/listbox"
              textValue="ListBox"
            >
              <NavigationTree.Content>ListBox</NavigationTree.Content>
            </NavigationTree.Item>
            <NavigationTree.Item
              id="navigation-tree"
              href="/docs/components/navigation-tree"
              textValue="NavigationTree"
            >
              <NavigationTree.Content>NavigationTree</NavigationTree.Content>
            </NavigationTree.Item>
          </NavigationTree.Item>
        </NavigationTree.Section>
      </NavigationTree>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("treegrid", { name: "Docs Navigation" });
    expect(nav).toBeInTheDocument();
    expect(canvas.getByText("Introduction")).toBeInTheDocument();
    expect(canvas.getByText("Getting Started")).toBeInTheDocument();
  },
};
