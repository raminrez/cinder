import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { GridList, Tag } from "@hashti/react";

const meta = {
  title: "Collections/GridList",
  component: GridList,
  parameters: {
    docs: {
      description: {
        component:
          "GridList displays an interactive collection of list items with keyboard arrow navigation, selection modes, and drag-and-drop handles.",
      },
    },
  },
} satisfies Meta<typeof GridList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <GridList aria-label="Development teams" selectionMode="single">
        <GridList.Item id="design" textValue="Design">
          <span>Design Systems</span>
          <Tag color="blue">8 members</Tag>
        </GridList.Item>
        <GridList.Item id="engineering" textValue="Engineering">
          <span>Frontend Engineering</span>
          <Tag color="gray">12 members</Tag>
        </GridList.Item>
        <GridList.Item id="product" textValue="Product">
          <span>Product Management</span>
          <Tag color="purple">4 members</Tag>
        </GridList.Item>
      </GridList>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole("grid", { name: "Development teams" });
    expect(grid).toBeInTheDocument();
    expect(canvas.getByText("Design Systems")).toBeInTheDocument();
  },
};

export const MultiSelectionAndReorder: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <GridList aria-label="Task priority queue" selectionMode="multiple" variant="card">
        <GridList.Item id="task-1" textValue="Fix login redirect bug">
          <GridList.DragHandle aria-label="Reorder login task" />
          <GridList.Checkbox aria-label="Select login task" />
          <div style={{ flex: 1 }}>Fix login redirect bug</div>
          <Tag color="red">High</Tag>
        </GridList.Item>
        <GridList.Item id="task-2" textValue="Update dependencies">
          <GridList.DragHandle aria-label="Reorder dependencies task" />
          <GridList.Checkbox aria-label="Select dependencies task" />
          <div style={{ flex: 1 }}>Update dependencies to RAC 1.22</div>
          <Tag color="blue">Medium</Tag>
        </GridList.Item>
        <GridList.Item id="task-3" textValue="Audit color contrast">
          <GridList.DragHandle aria-label="Reorder contrast task" />
          <GridList.Checkbox aria-label="Select contrast task" />
          <div style={{ flex: 1 }}>Audit secondary button contrast</div>
          <Tag color="green">Low</Tag>
        </GridList.Item>
      </GridList>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = canvas.getAllByRole("row");
    expect(rows).toHaveLength(3);
  },
};

export const EmptyState: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <GridList
        aria-label="Empty task queue"
        renderEmptyState={() => <GridList.EmptyState>No pending tasks found.</GridList.EmptyState>}
      >
        {[]}
      </GridList>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("No pending tasks found.")).toBeInTheDocument();
  },
};
