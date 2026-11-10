import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import {
  Autocomplete,
  SearchField,
  Menu,
} from "@cinder/react";

const meta = {
  title: "Collections/Autocomplete",
  component: Autocomplete,
  parameters: {
    docs: {
      description: {
        component:
          "Autocomplete combines a text input or search field with a menu or listbox to provide search suggestions as the user types.",
      },
    },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Autocomplete filter={() => true}>
        <SearchField label="Search users" placeholder="Type a name..." />
        <Menu.Root aria-label="Users">
          <Menu.Item id="alice">Alice Johnson</Menu.Item>
          <Menu.Item id="bob">Bob Smith</Menu.Item>
          <Menu.Item id="charlie">Charlie Davis</Menu.Item>
        </Menu.Root>
      </Autocomplete>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type a name...");
    expect(input).toBeInTheDocument();
  },
};
