import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { useListData } from "react-aria-components";
import { useDragAndDrop } from "react-aria-components/useDragAndDrop";
import { ListBox } from "@hashti/react";

const meta = {
  title: "Collections/ListBox",
  component: ListBox,
  parameters: {
    docs: {
      description: {
        component:
          "ListBox displays a list of options and allows a user to select one or more items with keyboard navigation, section grouping, and drag reordering.",
      },
    },
  },
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <ListBox aria-label="Favorite animals" selectionMode="single" variant="bordered">
        <ListBox.Item id="cat" textValue="Cat">
          Cat
        </ListBox.Item>
        <ListBox.Item id="dog" textValue="Dog">
          Dog
        </ListBox.Item>
        <ListBox.Item id="rabbit" textValue="Rabbit">
          Rabbit
        </ListBox.Item>
        <ListBox.Item id="fox" textValue="Fox">
          Fox
        </ListBox.Item>
      </ListBox>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const listbox = canvas.getByRole("listbox", { name: "Favorite animals" });
    expect(listbox).toBeInTheDocument();
    const options = canvas.getAllByRole("option");
    expect(options).toHaveLength(4);
  },
};

export const GroupedWithSections: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <ListBox aria-label="Select framework" selectionMode="single" variant="bordered">
        <ListBox.Section>
          <ListBox.Header>Frontend</ListBox.Header>
          <ListBox.Item id="react" textValue="React">
            React
          </ListBox.Item>
          <ListBox.Item id="vue" textValue="Vue">
            Vue
          </ListBox.Item>
          <ListBox.Item id="svelte" textValue="Svelte">
            Svelte
          </ListBox.Item>
        </ListBox.Section>
        <ListBox.Section>
          <ListBox.Header>Backend</ListBox.Header>
          <ListBox.Item id="node" textValue="Node.js">
            Node.js
          </ListBox.Item>
          <ListBox.Item id="bun" textValue="Bun">
            Bun
          </ListBox.Item>
          <ListBox.Item id="go" textValue="Go">
            Go
          </ListBox.Item>
        </ListBox.Section>
      </ListBox>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const listbox = canvas.getByRole("listbox", { name: "Select framework" });
    expect(listbox).toBeInTheDocument();
    expect(canvas.getByText("Frontend")).toBeInTheDocument();
    expect(canvas.getByText("Backend")).toBeInTheDocument();
  },
};

export const Reorderable: Story = {
  render: () => <ReorderableExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const listbox = canvas.getByRole("listbox", { name: "Prioritized backlog" });
    expect(listbox).toBeInTheDocument();
    const options = canvas.getAllByRole("option");
    expect(options).toHaveLength(3);
  },
};

// The option is the list's single focus stop: React Aria reorders from it (Enter, then
// arrows), so no second focusable drag button is nested inside it.
function ReorderableExample() {
  const list = useListData({
    initialItems: [
      { id: "item-1", name: "High Priority Item" },
      { id: "item-2", name: "Medium Priority Item" },
      { id: "item-3", name: "Low Priority Item" },
    ],
  });
  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys, items: typeof list.items) =>
      items.map((item) => ({ "text/plain": item.name })),
    onReorder(event) {
      if (event.target.dropPosition === "before") {
        list.moveBefore(event.target.key, event.keys);
      } else if (event.target.dropPosition === "after") {
        list.moveAfter(event.target.key, event.keys);
      }
    },
  });
  return (
    <div style={{ maxWidth: 360 }}>
      <ListBox
        aria-label="Prioritized backlog"
        selectionMode="multiple"
        variant="bordered"
        items={list.items}
        dragAndDropHooks={dragAndDropHooks}
      >
        {(item) => (
          <ListBox.Item id={item.id} textValue={item.name}>
            {item.name}
          </ListBox.Item>
        )}
      </ListBox>
    </div>
  );
}

export const InfiniteScrollingLoadMore: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <ListBox aria-label="Infinite server logs" variant="bordered">
        <ListBox.Item id="log-1" textValue="Log 1">
          Server initialized on port 3000
        </ListBox.Item>
        <ListBox.Item id="log-2" textValue="Log 2">
          Connected to database pool
        </ListBox.Item>
        <ListBox.Item id="log-3" textValue="Log 3">
          Loaded environment configuration
        </ListBox.Item>
        <ListBox.LoadMore id="load-more-logs" isLoading={true} label="Loading more logs…" />
      </ListBox>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const listbox = canvas.getByRole("listbox", { name: "Infinite server logs" });
    expect(listbox).toBeInTheDocument();
    expect(canvas.getByText("Loading more logs…")).toBeInTheDocument();
  },
};
