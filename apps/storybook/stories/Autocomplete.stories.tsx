import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import {
  Autocomplete,
  SearchField,
  Menu,
  MenuItem,
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
  args: {
    children: null,
  },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <Autocomplete {...args} filter={() => true}>
        <SearchField label="Search users" placeholder="Type a name..." />
        <Menu aria-label="Users">
          <MenuItem id="alice">Alice Johnson</MenuItem>
          <MenuItem id="bob">Bob Smith</MenuItem>
          <MenuItem id="charlie">Charlie Davis</MenuItem>
        </Menu>
      </Autocomplete>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type a name...");
    expect(input).toBeInTheDocument();
  },
};
