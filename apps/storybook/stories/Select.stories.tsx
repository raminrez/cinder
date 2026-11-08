import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import {
  Button,
  Form,
  Icon,
  ListBoxItem,
  ListBoxSection,
  Select,
  Text,
  Theme,
  type Key,
} from "@cinder/react";
import "./fields.css";

const meta = {
  title: "Fields/Select",
  component: Select,
  args: {
    label: "Workspace role",
    description: "Select the permission profile assigned to this teammate.",
    placeholder: "Choose a role...",
    onSelectionChange: fn(),
    children: null as any,
  },
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    errorMessage: { control: "text" },
    placeholder: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    isDisabled: { control: "boolean" },
    isRequired: { control: "boolean" },
    isInvalid: { control: "boolean" },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The callable Select is shorthand built over additive compound parts: Select.Root, Select.Trigger, Select.Value, Select.Popover, and Select.ListBox, alongside shared fieldParts. Select.Root preserves RAC's underlying select contract; Trigger uses Button variant='ghost' with Chevron down; Popover carries the Theme bridge across portals. Frame defaults place label before guidance, control below, and recovery attached underneath.",
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

interface RoleItem {
  id: string;
  name: string;
  description: string;
}

const standardRoles: RoleItem[] = [
  { id: "admin", name: "Administrator", description: "Full access to settings and billing" },
  { id: "editor", name: "Editor", description: "Can create, edit, and publish content" },
  { id: "viewer", name: "Viewer", description: "Read-only access to existing workspaces" },
];

export const Playground: Story = {
  render: (args) => (
    <div className="field-story-stack">
      <Select {...args} items={standardRoles}>
        {(item) => (
          <ListBoxItem id={item.id} textValue={item.name}>
            <Text slot="label">{item.name}</Text>
            <Text slot="description">{item.description}</Text>
          </ListBoxItem>
        )}
      </Select>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="field-story-grid">
      <div className="field-story-case">
        <h2>Unselected with placeholder</h2>
        <Select
          label="Unselected profile"
          description="A role must be assigned before inviting."
          placeholder="Choose access profile..."
          items={standardRoles}
        >
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.name}>
              {item.name}
            </ListBoxItem>
          )}
        </Select>
      </div>

      <div className="field-story-case">
        <h2>Selected value</h2>
        <Select
          label="Assigned profile"
          description="Current role for this member."
          defaultSelectedKey="editor"
          items={standardRoles}
        >
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.name}>
              {item.name}
            </ListBoxItem>
          )}
        </Select>
      </div>

      <div className="field-story-case">
        <h2>Invalid with recovery</h2>
        <Select
          label="Restricted environment"
          description="Select an authorized production cluster."
          placeholder="Choose environment..."
          isInvalid
          errorMessage="Select an authorized cluster to continue."
          items={[
            { id: "prod-us", name: "Production US-East" },
            { id: "prod-eu", name: "Production EU-Central" },
          ]}
        >
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.name}>
              {item.name}
            </ListBoxItem>
          )}
        </Select>
      </div>

      <div className="field-story-case">
        <h2>Disabled selection</h2>
        <Select
          label="Locked security policy"
          description="Role modifications are managed by directory sync."
          defaultSelectedKey="admin"
          isDisabled
          items={standardRoles}
        >
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.name}>
              {item.name}
            </ListBoxItem>
          )}
        </Select>
      </div>
    </div>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Unselected profile/ });
    await expect(trigger).toBeVisible();
    await expect(canvas.getByText("Choose access profile...")).toBeVisible();

    await userEvent.click(trigger);
    const option = await waitFor(() => {
      const opt = document.querySelector<HTMLElement>('.react-aria-ListBoxItem[data-key="editor"]');
      expect(opt).not.toBeNull();
      return opt!;
    });
    await userEvent.click(option);

    await waitFor(async () => {
      await expect(within(trigger).getByText("Editor")).toBeVisible();
    });

    // Check invalid recovery error message presence
    await expect(canvas.getByText("Select an authorized cluster to continue.")).toBeVisible();

    // Verify disabled select button cannot be focused/opened
    const disabledTrigger = canvas.getByRole("button", { name: /Locked security policy/ });
    await expect(disabledTrigger).toBeDisabled();
  },
};

export const RichOptionsAndSections: Story = {
  render: () => {
    return (
      <div className="field-story-stack">
        <Select
          label="Deployment cluster"
          description="Choose a destination environment for this workflow."
          placeholder="Select cluster..."
          disabledKeys={["prod-dr"]}
        >
          <ListBoxSection>
            <header>Internal clusters</header>
            <ListBoxItem id="dev-1" textValue="Development alpha">
              <Text slot="label">Development alpha</Text>
              <Text slot="description">Sandbox testing node</Text>
            </ListBoxItem>
            <ListBoxItem id="stage-1" textValue="Staging release">
              <Text slot="label">Staging release</Text>
              <Text slot="description">Pre-production verification</Text>
            </ListBoxItem>
          </ListBoxSection>
          <ListBoxSection>
            <header>Protected clusters</header>
            <ListBoxItem id="prod-1" textValue="Production primary">
              <Text slot="label">Production primary</Text>
              <Text slot="description">Live traffic routing</Text>
            </ListBoxItem>
            <ListBoxItem id="prod-dr" textValue="Disaster recovery">
              <Text slot="label">Disaster recovery (Locked)</Text>
              <Text slot="description">Failover standby only</Text>
            </ListBoxItem>
          </ListBoxSection>
        </Select>
      </div>
    );
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Deployment cluster/ });
    await userEvent.click(trigger);

    const lockedOption = await waitFor(() =>
      within(document.body).getByRole("option", { name: /Disaster recovery/ }),
    );
    await expect(lockedOption).toHaveAttribute("aria-disabled", "true");

    const liveOption = within(document.body).getByRole("option", { name: /Production primary/ });
    await userEvent.click(liveOption);

    await waitFor(async () => {
      await expect(within(trigger).getByText("Production primary")).toBeVisible();
    });
  },
};

function ControlledSelectionExample() {
  const [selected, setSelected] = useState<Key | null>("viewer");
  return (
    <div className="field-story-grid">
      <div className="field-story-case">
        <h2>Controlled selection</h2>
        <Select
          label="Managed workspace role"
          description="State is held and observed externally."
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key)}
          items={standardRoles}
        >
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.name}>
              {item.name}
            </ListBoxItem>
          )}
        </Select>
        <div className="overlay-row">
          <output aria-label="Observed selection">Selected: {String(selected ?? "none")}</output>
          <Button variant="ghost" size="sm" onPress={() => setSelected("admin")}>
            Reset to Admin
          </Button>
        </div>
      </div>

      <div className="field-story-case">
        <h2>Uncontrolled selection</h2>
        <Select
          label="Autonomous selection"
          description="Uses defaultSelectedKey without re-renders."
          defaultSelectedKey="editor"
          items={standardRoles}
        >
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.name}>
              {item.name}
            </ListBoxItem>
          )}
        </Select>
      </div>
    </div>
  );
}

export const ControlledAndUncontrolled: Story = {
  render: () => <ControlledSelectionExample />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const output = canvas.getByRole("status", { name: "Observed selection" });
    await expect(output).toHaveTextContent("Selected: viewer");

    const resetButton = canvas.getByRole("button", { name: "Reset to Admin" });
    await userEvent.click(resetButton);
    await expect(output).toHaveTextContent("Selected: admin");

    const trigger = canvas.getByRole("button", { name: /Managed workspace role/ });
    await userEvent.click(trigger);
    const viewerOption = await waitFor(() => {
      const opt = document.querySelector<HTMLElement>('.react-aria-ListBoxItem[data-key="viewer"]');
      expect(opt).not.toBeNull();
      return opt!;
    });
    await userEvent.click(viewerOption);

    await waitFor(async () => {
      await expect(output).toHaveTextContent("Selected: viewer");
    });
  },
};

function FormSelectionExample() {
  const [submitted, setSubmitted] = useState<string>("");
  return (
    <div className="field-story-grid">
      <div className="field-story-case">
        <h2>Form submission with Select</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            setSubmitted(`role=${formData.get("role")}&team=${formData.get("team")}`);
          }}
        >
          <Select
            isRequired
            name="role"
            label="Mandatory member role"
            description="A role is required before submitting."
            placeholder="Pick a role..."
            items={standardRoles}
          >
            {(item) => (
              <ListBoxItem id={item.id} textValue={item.name}>
                {item.name}
              </ListBoxItem>
            )}
          </Select>

          {/* Custom whole-tree compound composition */}
          <Select.Root name="team" size="md" isRequired>
            <Select.Label>Assigned development team</Select.Label>
            <Select.Description>Route reviews to this squad.</Select.Description>
            <Select.Trigger>
              <Select.Value />
              <Icon name="chevronDown" />
            </Select.Trigger>
            <Select.Help>
              <Select.ErrorMessage>Team selection is required.</Select.ErrorMessage>
            </Select.Help>
            <Select.Popover>
              <Select.ListBox>
                <ListBoxItem id="core" textValue="Core Platform">
                  Core Platform
                </ListBoxItem>
                <ListBoxItem id="infra" textValue="Cloud Infrastructure">
                  Cloud Infrastructure
                </ListBoxItem>
              </Select.ListBox>
            </Select.Popover>
          </Select.Root>

          <div className="overlay-row" style={{ marginTop: "1rem" }}>
            <Button type="submit">Submit assignment</Button>
          </div>
        </Form>
        <output aria-label="Submitted assignment" style={{ overflowWrap: "anywhere" }}>
          {submitted || "Awaiting form submission."}
        </output>
      </div>
    </div>
  );
}

export const CompositionAndFormData: Story = {
  render: () => <FormSelectionExample />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByRole("button", { name: "Submit assignment" });
    const output = canvas.getByRole("status", { name: "Submitted assignment" });

    // Submit while empty - required triggers validation
    await userEvent.click(submitBtn);

    // Pick role
    const roleTrigger = canvas.getByRole("button", { name: /Mandatory member role/ });
    await userEvent.click(roleTrigger);
    const editorOpt = await waitFor(() => {
      const opt = document.querySelector<HTMLElement>('.react-aria-ListBoxItem[data-key="editor"]');
      expect(opt).not.toBeNull();
      return opt!;
    });
    await userEvent.click(editorOpt);

    // Pick team via compound select
    const teamTrigger = canvas.getByRole("button", { name: /Assigned development team/ });
    await userEvent.click(teamTrigger);
    const coreOpt = await waitFor(() => {
      const opt = document.querySelector<HTMLElement>('.react-aria-ListBoxItem[data-key="core"]');
      expect(opt).not.toBeNull();
      return opt!;
    });
    await userEvent.click(coreOpt);

    // Submit form
    await userEvent.click(submitBtn);
    await waitFor(async () => {
      await expect(output).toHaveTextContent("role=editor&team=core");
    });
  },
};

export const LongContentAndLocales: Story = {
  render: () => (
    <div className="field-story-grid">
      <div className="field-story-case field-story-narrow">
        <h2>Narrow container with long option labels</h2>
        <Select
          label="Long enterprise service profile"
          description="Labels wrap cleanly inside bounded containers without overflow."
          defaultSelectedKey="dedicated-cluster"
          items={[
            {
              id: "dedicated-cluster",
              name: "Dedicated high-availability multi-region cluster with automated snapshot replication",
            },
            {
              id: "shared-node",
              name: "Shared standard single-tenant compute instance with standard monitoring",
            },
          ]}
        >
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.name}>
              {item.name}
            </ListBoxItem>
          )}
        </Select>
      </div>

      <div className="field-story-case">
        <h2>Persian RTL with Latin identifier</h2>
        <Theme locale="fa-IR">
          <Select
            label="نقش کاربری در سامانه"
            description="سطح دسترسی خود را برای اتصال به اطلس مشخص نمایید."
            defaultSelectedKey="admin"
            items={[
              { id: "admin", name: "مدیر ارشد سامانه (atlas-prod-01)" },
              { id: "editor", name: "ویرایشگر محتوا و گردش‌کار" },
              { id: "viewer", name: "ناظر گزارش‌های حسابرسی" },
            ]}
          >
            {(item) => (
              <ListBoxItem id={item.id} textValue={item.name}>
                {item.name}
              </ListBoxItem>
            )}
          </Select>
        </Theme>
      </div>

      <div className="field-story-case">
        <h2>Arabic RTL</h2>
        <Theme locale="ar-AE">
          <Select
            label="الصلاحية المخصصة للمستخدم"
            description="حدد مستوى الأذونات الخاصة ببيئة العمل."
            defaultSelectedKey="dev"
            items={[
              { id: "dev", name: "مطور برمجيات البنية التحتية" },
              { id: "lead", name: "مدير الفريق التقني" },
            ]}
          >
            {(item) => (
              <ListBoxItem id={item.id} textValue={item.name}>
                {item.name}
              </ListBoxItem>
            )}
          </Select>
        </Theme>
      </div>

      <div className="field-story-case">
        <h2>German expanding labels</h2>
        <Select
          label="Berechtigungsstufe für Systemverwaltung"
          description="Wählen Sie die entsprechende Zugriffsrichtlinie für dieses Teammitglied."
          defaultSelectedKey="hauptadministrator"
          items={[
            {
              id: "hauptadministrator",
              name: "Hauptsystemadministrator mit uneingeschränkten Rechten",
            },
            {
              id: "sicherheitsbeauftragter",
              name: "Sicherheitsbeauftragter für Zugriffskontrolle",
            },
          ]}
        >
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.name}>
              {item.name}
            </ListBoxItem>
          )}
        </Select>
      </div>
    </div>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const persianTrigger = canvas.getByRole("button", { name: /نقش کاربری در سامانه/ });
    await expect(persianTrigger).toBeVisible();

    await userEvent.click(persianTrigger);
    const editorOpt = await waitFor(() =>
      within(document.body).getByRole("option", { name: /ویرایشگر محتوا/ }),
    );
    await userEvent.click(editorOpt);

    await waitFor(async () => {
      await expect(within(persianTrigger).getByText("ویرایشگر محتوا و گردش‌کار")).toBeVisible();
    });
  },
};
