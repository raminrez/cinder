import { useState } from "react";
import { parseDate, Time } from "@internationalized/date";
import {
  Accordion,
  AccordionItem,
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Calendar,
  Checkbox,
  CheckboxGroup,
  CodeSnippet,
  ComboBox,
  ContentSwitcher,
  DatePicker,
  DateRangePicker,
  Dialog,
  DialogTrigger,
  FileUploader,
  FilterTag,
  Form,
  GridList,
  GridListItem,
  Header,
  HeaderName,
  HeaderNav,
  Heading,
  Icon,
  InlineLoading,
  InlineNotification,
  Layer,
  Link,
  List,
  ListBoxItem,
  Loading,
  Menu,
  MenuItem,
  MenuTrigger,
  Modal,
  NativeSelect,
  NumberField,
  Pagination,
  Popover,
  ProgressBar,
  ProgressIndicator,
  Radio,
  RadioGroup,
  SearchField,
  Select,
  Separator,
  Skeleton,
  Slider,
  Stack,
  StructuredList,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  TagGroup,
  TextArea,
  TextField,
  Tile,
  TimeField,
  ToggleButton,
  Tooltip,
  TooltipTrigger,
  Tree,
  TreeItem,
  TreeItemContent,
  useToast,
  type Key,
} from "@cinder/react";
import { WorkspaceTable } from "./workbench";

const sampleDate = parseDate("2026-11-16");

export function ButtonExample() {
  const [count, setCount] = useState(0);
  return (
    <Stack gap={6}>
      <Stack orientation="horizontal" gap={4}>
        <Button onPress={() => setCount((value) => value + 1)}>
          Create workspace <Icon name="plus" />
        </Button>
        <Button variant="secondary" onPress={() => setCount((value) => value + 1)}>
          Secondary
        </Button>
        <Button variant="tertiary" onPress={() => setCount((value) => value + 1)}>
          Tertiary
        </Button>
        <Button variant="ghost" onPress={() => setCount((value) => value + 1)}>
          Ghost <Icon name="arrowRight" />
        </Button>
      </Stack>
      <Stack orientation="horizontal" gap={4}>
        <Button variant="danger" onPress={() => setCount((value) => value + 1)}>
          Delete
        </Button>
        <Button isDisabled>Unavailable</Button>
        <Button isPending>Saving</Button>
        <Button
          variant="ghost"
          iconOnly
          aria-label="Add an item"
          onPress={() => setCount((value) => value + 1)}
        >
          <Icon name="plus" />
        </Button>
      </Stack>
      <p className="demo-output" role="status">
        {count === 0
          ? "Press a button to try its interaction."
          : `${count} button ${count === 1 ? "press" : "presses"} recorded.`}
      </p>
    </Stack>
  );
}

function TextInputExample() {
  return (
    <Stack gap={6}>
      <TextField
        label="Workspace name"
        description="Use a name your team will recognize."
        placeholder="e.g. Design studio"
      />
      <TextField
        label="Email address"
        defaultValue="hello@"
        isInvalid
        errorMessage="Enter a complete email address."
      />
      <TextField label="Organization ID" defaultValue="cinder-workspace" isReadOnly />
      <TextField label="Unavailable field" placeholder="Disabled" isDisabled />
    </Stack>
  );
}
function CheckboxExample() {
  const [value, setValue] = useState(["releases"]);
  return (
    <Stack gap={5}>
      <CheckboxGroup
        label="Email preferences"
        value={value}
        onChange={setValue}
        description="Choose the updates you want to receive."
      >
        <Checkbox value="releases">Product releases</Checkbox>
        <Checkbox value="tips">Tips and tutorials</Checkbox>
        <Checkbox value="research">Design research</Checkbox>
      </CheckboxGroup>
      <Checkbox isIndeterminate>Some items selected</Checkbox>
      <Checkbox isDisabled>Unavailable option</Checkbox>
      <p className="demo-output" role="status">
        {value.length} preferences selected
      </p>
    </Stack>
  );
}
function DropdownExample({ multiple = false }: { multiple?: boolean }) {
  const [single, setSingle] = useState<Key | null>("preview");
  const [multi, setMulti] = useState<Key[]>(["preview"]);
  const choices = (
    <>
      <ListBoxItem id="development">Development</ListBoxItem>
      <ListBoxItem id="preview">Preview</ListBoxItem>
      <ListBoxItem id="production">Production</ListBoxItem>
      <ListBoxItem id="archived" isDisabled>
        Archived
      </ListBoxItem>
    </>
  );
  return (
    <Stack gap={6}>
      {multiple ? (
        <Select
          selectionMode="multiple"
          label="Environments"
          description="Choose one or more environments."
          value={multi}
          onChange={setMulti}
        >
          {choices}
        </Select>
      ) : (
        <Select
          label="Environment"
          description="Choose where this workspace runs."
          value={single}
          onChange={setSingle}
        >
          {choices}
        </Select>
      )}
      <p className="demo-output" role="status">
        Selected: {multiple ? multi.join(", ") || "none" : single}
      </p>
    </Stack>
  );
}
function ComboBoxExample() {
  const [value, setValue] = useState<Key | null>(null);
  return (
    <Stack gap={6}>
      <ComboBox
        label="Framework"
        placeholder="Find a framework"
        description="Type to filter the available frameworks."
        value={value}
        onChange={setValue}
      >
        <ListBoxItem id="react">React</ListBoxItem>
        <ListBoxItem id="next">Next.js</ListBoxItem>
        <ListBoxItem id="remix">Remix</ListBoxItem>
        <ListBoxItem id="astro">Astro</ListBoxItem>
        <ListBoxItem id="tanstack">TanStack Start</ListBoxItem>
      </ComboBox>
      <p className="demo-output" role="status">
        Selected: {value ?? "none"}
      </p>
    </Stack>
  );
}
function RadioExample() {
  return (
    <RadioGroup
      label="Workspace access"
      defaultValue="private"
      description="Only one access level can be active."
    >
      <Radio value="private">Private — only you</Radio>
      <Radio value="team">Team — invited members</Radio>
      <Radio value="public">Public — anyone with a link</Radio>
    </RadioGroup>
  );
}
function SwitchExample() {
  const [enabled, setEnabled] = useState(true);
  return (
    <Stack gap={6}>
      <Switch isSelected={enabled} onChange={setEnabled}>
        Email notifications
      </Switch>
      <Switch size="sm">Compact toggle</Switch>
      <Switch isDisabled>Unavailable setting</Switch>
      <p className="demo-output" role="status">
        Email notifications are {enabled ? "on" : "off"}.
      </p>
    </Stack>
  );
}
function SliderExample() {
  return (
    <Stack gap={7}>
      <Slider label="Capacity" defaultValue={60} />
      <Slider<number[]>
        label="Range"
        defaultValue={[20, 75]}
        thumbLabels={["Minimum capacity", "Maximum capacity"]}
      />
      <Slider label="Disabled capacity" defaultValue={30} isDisabled />
    </Stack>
  );
}
function SearchExample() {
  const [query, setQuery] = useState("");
  const options = ["Button", "Checkbox", "Combo box", "Date picker", "Dropdown", "Modal", "Tabs"];
  const filtered = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));
  return (
    <Stack>
      <SearchField
        label="Search the collection"
        value={query}
        onChange={setQuery}
        placeholder="Try “box”"
      />
      <div className="search-example-results" aria-live="polite">
        {filtered.length ? (
          filtered.map((item) => <div key={item}>{item}</div>)
        ) : (
          <p>No components match this query.</p>
        )}
      </div>
    </Stack>
  );
}
export function FormExample() {
  const [email, setEmail] = useState("");
  return (
    <Form
      className="example-form"
      onSubmit={(event) => {
        event.preventDefault();
        setEmail(String(new FormData(event.currentTarget).get("email")));
      }}
    >
      <TextField name="name" label="Name" isRequired placeholder="Your name" />
      <TextField
        name="email"
        type="email"
        label="Email"
        isRequired
        placeholder="you@example.com"
        description="Used only in this local example."
      />
      <Checkbox name="updates">Send me release notes</Checkbox>
      <Button type="submit">
        Save profile <Icon name="arrowRight" />
      </Button>
      {email && (
        <InlineNotification kind="success" title="Profile saved locally">
          {email}
        </InlineNotification>
      )}
    </Form>
  );
}
function AccordionExample() {
  return (
    <Accordion defaultExpandedKeys={["design"]} allowsMultipleExpanded>
      <AccordionItem id="design" title="Design foundations">
        Carbon's semantic tokens, IBM Plex typography, 2x grid, and four themes give every component
        a shared visual language.
      </AccordionItem>
      <AccordionItem id="interaction" title="Accessible interaction">
        RAC supplies keyboard, pointer, touch, and assistive-technology behavior. Cinder keeps those
        contracts intact.
      </AccordionItem>
      <AccordionItem id="runtime" title="Bun-native development">
        One workspace manages tokens, React components, and the documentation application.
      </AccordionItem>
    </Accordion>
  );
}
function TabsExample() {
  return (
    <Tabs>
      <TabList aria-label="Workspace sections">
        <Tab id="overview">Overview</Tab>
        <Tab id="members">Members</Tab>
        <Tab id="settings">Settings</Tab>
        <Tab id="disabled" isDisabled>
          Unavailable
        </Tab>
      </TabList>
      <TabPanel id="overview">
        <p>A shared place for your team's components, patterns, and decisions.</p>
        <Tag color="green">Active workspace</Tag>
      </TabPanel>
      <TabPanel id="members">
        <p>Sample team</p>
        <List>
          <li>Design</li>
          <li>Engineering</li>
          <li>Product</li>
        </List>
      </TabPanel>
      <TabPanel id="settings">
        <Switch defaultSelected>Weekly summaries</Switch>
      </TabPanel>
      <TabPanel id="disabled">Unavailable</TabPanel>
    </Tabs>
  );
}
function ContentSwitcherExample() {
  const [view, setView] = useState("list");
  return (
    <Stack gap={6}>
      <ContentSwitcher
        aria-label="Content view"
        selectedKeys={[view]}
        onSelectionChange={(keys) => setView(String([...keys][0]))}
      >
        <ToggleButton id="list">List</ToggleButton>
        <ToggleButton id="grid">Grid</ToggleButton>
        <ToggleButton id="detail">Detail</ToggleButton>
      </ContentSwitcher>
      <div role="status" className={`view-example view-${view}`}>
        {["Primitives", "Components", "Patterns"].map((name) => (
          <div key={name}>
            <span>{name}</span>
            {view === "detail" && <p>Part of the shared system.</p>}
          </div>
        ))}
      </div>
    </Stack>
  );
}
function PaginationExample() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  return (
    <Stack gap={6}>
      <p className="demo-output">Showing page {page} of a 48-item sample collection.</p>
      <Pagination
        totalItems={48}
        page={page}
        pageSize={size}
        onPageChange={setPage}
        onPageSizeChange={(value) => {
          setSize(value);
          setPage(1);
        }}
      />
    </Stack>
  );
}
function TreeExample() {
  return (
    <Tree
      aria-label="Project files"
      selectionMode="single"
      defaultExpandedKeys={["packages", "react"]}
    >
      <TreeItem id="packages" textValue="packages">
        <TreeItemContent>
          {({ isExpanded }) => (
            <>
              <Button
                slot="chevron"
                variant="ghost"
                size="sm"
                iconOnly
                aria-label={isExpanded ? "Collapse packages" : "Expand packages"}
              >
                <Icon name="chevronRight" />
              </Button>
              <Icon name="folder" />
              <span>packages</span>
            </>
          )}
        </TreeItemContent>
        <TreeItem id="react" textValue="react">
          <TreeItemContent>
            {({ isExpanded }) => (
              <>
                <Button
                  slot="chevron"
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label={isExpanded ? "Collapse react" : "Expand react"}
                >
                  <Icon name="chevronRight" />
                </Button>
                <Icon name="folder" />
                <span>react</span>
              </>
            )}
          </TreeItemContent>
          <TreeItem id="button" textValue="buttons.tsx">
            <TreeItemContent>
              <Button
                slot="chevron"
                variant="ghost"
                size="sm"
                iconOnly
                aria-label="Expand buttons"
              />
              <Icon name="file" />
              <span>buttons.tsx</span>
            </TreeItemContent>
          </TreeItem>
          <TreeItem id="styles" textValue="styles.css">
            <TreeItemContent>
              <Button
                slot="chevron"
                variant="ghost"
                size="sm"
                iconOnly
                aria-label="Expand styles"
              />
              <Icon name="file" />
              <span>styles.css</span>
            </TreeItemContent>
          </TreeItem>
        </TreeItem>
        <TreeItem id="tokens" textValue="tokens">
          <TreeItemContent>
            <Button slot="chevron" variant="ghost" size="sm" iconOnly aria-label="Expand tokens" />
            <Icon name="folder" />
            <span>tokens</span>
          </TreeItemContent>
        </TreeItem>
      </TreeItem>
      <TreeItem id="readme" textValue="README.md">
        <TreeItemContent>
          <Button slot="chevron" variant="ghost" size="sm" iconOnly aria-label="Expand readme" />
          <Icon name="file" />
          <span>README.md</span>
        </TreeItemContent>
      </TreeItem>
    </Tree>
  );
}
function TagExample() {
  const [tags, setTags] = useState(["React", "RAC", "Bun"]);
  return (
    <Stack gap={6}>
      <Stack orientation="horizontal" gap={3}>
        <Tag color="gray">Draft</Tag>
        <Tag color="blue">In review</Tag>
        <Tag color="green">Available</Tag>
        <Tag color="red">Needs attention</Tag>
        <Tag color="teal">Team</Tag>
      </Stack>
      <TagGroup
        label="Selected technologies"
        onRemove={(keys) => setTags((items) => items.filter((item) => !keys.has(item)))}
      >
        {tags.map((item) => (
          <FilterTag id={item} key={item} textValue={item}>
            {item}
          </FilterTag>
        ))}
      </TagGroup>
      {tags.length < 3 && (
        <Button size="sm" variant="ghost" onPress={() => setTags(["React", "RAC", "Bun"])}>
          Reset filters
        </Button>
      )}
    </Stack>
  );
}
function NotificationExample() {
  const [visible, setVisible] = useState(true);
  return (
    <Stack gap={5}>
      {visible ? (
        <InlineNotification
          kind="info"
          title="A new version is available"
          onDismiss={() => setVisible(false)}
        >
          Review the release notes before updating.
        </InlineNotification>
      ) : (
        <Button size="sm" variant="tertiary" onPress={() => setVisible(true)}>
          Restore notification
        </Button>
      )}
      <InlineNotification kind="success" title="Changes saved">
        Your local preferences are up to date.
      </InlineNotification>
      <InlineNotification kind="warning" title="Storage is nearly full">
        Remove unused files to make more room.
      </InlineNotification>
      <InlineNotification kind="error" title="Unable to save">
        Check the details and try again.
      </InlineNotification>
    </Stack>
  );
}
function ToastExample() {
  const toast = useToast();
  return (
    <Stack gap={5}>
      <p>Notifications stay visible until dismissed in this example.</p>
      <Button
        onPress={() =>
          toast.add({
            title: "Preferences saved",
            description: "A local demonstration of a queued notification.",
            kind: "success",
          })
        }
      >
        Show notification <Icon name="plus" />
      </Button>
    </Stack>
  );
}
function ProgressExample() {
  const [value, setValue] = useState(48);
  return (
    <Stack gap={6}>
      <ProgressBar
        label="File processing"
        value={value}
        status={value === 100 ? "success" : "active"}
        helperText={`${value} of 100 sample files`}
      />
      <Slider label="Preview progress" value={value} onChange={setValue} />
      <ProgressBar label="Preparing workspace" isIndeterminate />
    </Stack>
  );
}
function ProgressIndicatorExample() {
  const [current, setCurrent] = useState("review");
  const ids = ["details", "review", "complete"];
  return (
    <ProgressIndicator
      onStepChange={setCurrent}
      steps={ids.map((id, index) => ({
        id,
        label: id[0]!.toUpperCase() + id.slice(1),
        status:
          id === current ? "current" : index < ids.indexOf(current) ? "complete" : "incomplete",
      }))}
    />
  );
}
export function ModalExample() {
  const [name, setName] = useState("Cinder studio");
  const [saved, setSaved] = useState("");
  return (
    <Stack gap={5}>
      <DialogTrigger>
        <Button>
          Workspace settings <Icon name="settings" />
        </Button>
        <Modal isDismissable size="sm">
          <Dialog>
            {({ close }) => (
              <>
                <Heading slot="title">Workspace settings</Heading>
                <Button slot="close" variant="ghost" size="md" iconOnly aria-label="Close dialog">
                  <Icon name="close" />
                </Button>
                <p>Changes in this example are kept in this page only.</p>
                <TextField label="Workspace name" value={name} onChange={setName} autoFocus />
                <div className="cinder-dialog-footer">
                  <Button variant="secondary" onPress={close}>
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      setSaved(name);
                      close();
                    }}
                  >
                    Save changes <Icon name="check" />
                  </Button>
                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </DialogTrigger>
      {saved && (
        <p role="status" className="demo-output">
          Saved locally: {saved}
        </p>
      )}
    </Stack>
  );
}
export function MenuExample({ overflow = false }: { overflow?: boolean }) {
  const [action, setAction] = useState("");
  return (
    <Stack gap={5}>
      <MenuTrigger>
        <Button
          variant={overflow ? "ghost" : "secondary"}
          iconOnly={overflow}
          aria-label={overflow ? "Workspace actions" : undefined}
        >
          {overflow ? (
            <Icon name="overflow" />
          ) : (
            <>
              Actions <Icon name="chevronDown" />
            </>
          )}
        </Button>
        <Popover placement="bottom start">
          <Menu aria-label="Workspace actions" onAction={(key) => setAction(String(key))}>
            <MenuItem id="Rename">Rename</MenuItem>
            <MenuItem id="Duplicate">Duplicate</MenuItem>
            <MenuItem id="Move" isDisabled>
              Move to organization
            </MenuItem>
            <Separator />
            <MenuItem id="Archive">Archive</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
      <p role="status" className="demo-output">
        {action ? `Action selected: ${action}` : "Choose an action from the menu."}
      </p>
    </Stack>
  );
}
function PopoverExample() {
  return (
    <DialogTrigger>
      <Button variant="tertiary">
        Display settings <Icon name="settings" />
      </Button>
      <Popover placement="bottom start">
        <Dialog aria-label="Display settings">
          <Stack gap={5}>
            <Switch defaultSelected>Show helper text</Switch>
            <Switch>Compact layout</Switch>
            <Button variant="ghost" size="sm" slot="close">
              Done
            </Button>
          </Stack>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
function TooltipExample() {
  return (
    <Stack orientation="horizontal" gap={6}>
      <TooltipTrigger delay={300}>
        <Button variant="ghost" iconOnly aria-label="Settings">
          <Icon name="settings" />
        </Button>
        <Tooltip>Manage workspace settings</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={300}>
        <Button variant="ghost" iconOnly aria-label="Download">
          <Icon name="download" />
        </Button>
        <Tooltip>Download the current selection</Tooltip>
      </TooltipTrigger>
      <p className="demo-output">Hover or use keyboard focus.</p>
    </Stack>
  );
}

export function ComponentExample({ slug }: { slug: string }) {
  switch (slug) {
    case "button":
      return <ButtonExample />;
    case "link":
      return (
        <Stack gap={5}>
          <Link href="/foundations">
            Explore foundations <Icon name="arrowRight" />
          </Link>
          <p>
            Read the{" "}
            <Link inline href="/get-started">
              getting started guide
            </Link>{" "}
            to run Cinder locally.
          </p>
          <Link isDisabled href="/">
            Unavailable link
          </Link>
        </Stack>
      );
    case "text-input":
      return <TextInputExample />;
    case "text-area":
      return (
        <Stack gap={6}>
          <TextArea
            label="Workspace description"
            description="A short introduction for your team."
            placeholder="What will you build here?"
          />
          <TextArea
            label="Read-only notes"
            defaultValue="This workspace uses Carbon's four-theme model."
            isReadOnly
            rows={2}
          />
        </Stack>
      );
    case "number-input":
      return (
        <Stack gap={6}>
          <NumberField
            label="Team seats"
            defaultValue={8}
            minValue={1}
            maxValue={100}
            description="Between 1 and 100 seats."
          />
          <NumberField
            label="Monthly budget"
            defaultValue={120}
            minValue={0}
            step={10}
            formatOptions={{ style: "currency", currency: "USD" }}
          />
        </Stack>
      );
    case "search":
      return <SearchExample />;
    case "select":
      return (
        <NativeSelect
          label="Region"
          defaultValue="eu"
          description="Select the region nearest your team."
        >
          <option value="eu">Europe</option>
          <option value="us">North America</option>
          <option value="asia">Asia Pacific</option>
        </NativeSelect>
      );
    case "dropdown":
      return <DropdownExample />;
    case "multi-select":
      return <DropdownExample multiple />;
    case "combo-box":
      return <ComboBoxExample />;
    case "checkbox":
      return <CheckboxExample />;
    case "radio-button":
      return <RadioExample />;
    case "toggle":
      return <SwitchExample />;
    case "slider":
      return <SliderExample />;
    case "date-picker":
      return (
        <Stack gap={6}>
          <DatePicker
            label="Start date"
            defaultValue={sampleDate}
            description="Choose the first day of your project."
          />
          <Calendar aria-label="Project calendar" defaultValue={sampleDate} />
        </Stack>
      );
    case "date-range-picker":
      return (
        <DateRangePicker
          label="Reporting period"
          defaultValue={{ start: parseDate("2026-11-01"), end: parseDate("2026-11-15") }}
          description="Select the first and last day of the report."
        />
      );
    case "time-picker":
      return (
        <Stack gap={6}>
          <TimeField label="Reminder time" defaultValue={new Time(9, 30)} />
          <TimeField label="24-hour time" defaultValue={new Time(17, 0)} hourCycle={24} />
        </Stack>
      );
    case "file-uploader":
      return (
        <FileUploader
          label="Attachments"
          description="PNG, SVG, or plain text. Maximum 2 MB per file. Selection stays local."
          acceptedFileTypes={["image/png", ".svg", "text/plain"]}
          maxSize={2 * 1024 * 1024}
          allowsMultiple
        />
      );
    case "form":
      return <FormExample />;
    case "accordion":
      return <AccordionExample />;
    case "breadcrumb":
      return (
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Breadcrumb</BreadcrumbItem>
        </Breadcrumbs>
      );
    case "content-switcher":
      return <ContentSwitcherExample />;
    case "tabs":
      return <TabsExample />;
    case "pagination":
      return <PaginationExample />;
    case "tree-view":
      return <TreeExample />;
    case "ui-shell":
      return (
        <div className="shell-example">
          <Header>
            <HeaderName href="/">Cinder studio</HeaderName>
            <HeaderNav aria-label="Example primary">
              <Link href="/components" aria-current="page">
                Components
              </Link>
              <Link href="/foundations">Foundations</Link>
            </HeaderNav>
          </Header>
          <div className="shell-example-content">
            <p>A stable frame for your application.</p>
            <Link href="/get-started">Open the setup guide</Link>
          </div>
        </div>
      );
    case "data-table":
      return <WorkspaceTable />;
    case "contained-list":
      return (
        <GridList aria-label="Sample teams" selectionMode="single">
          <GridListItem id="design" textValue="Design">
            <span>Design</span>
            <Tag color="blue">8 members</Tag>
          </GridListItem>
          <GridListItem id="engineering" textValue="Engineering">
            <span>Engineering</span>
            <Tag color="gray">12 members</Tag>
          </GridListItem>
          <GridListItem id="product" textValue="Product">
            <span>Product</span>
            <Tag color="gray">4 members</Tag>
          </GridListItem>
        </GridList>
      );
    case "structured-list":
      return (
        <StructuredList>
          <div>
            <dt>Runtime</dt>
            <dd>Bun 1.4.4</dd>
          </div>
          <div>
            <dt>Interaction</dt>
            <dd>RAC 1.22.1</dd>
          </div>
          <div>
            <dt>Typography</dt>
            <dd>IBM Plex Sans and IBM Plex Mono</dd>
          </div>
          <div>
            <dt>Themes</dt>
            <dd>White, Gray 10, Gray 90, Gray 100</dd>
          </div>
        </StructuredList>
      );
    case "list":
      return (
        <Stack gap={6}>
          <List>
            <li>Semantic tokens</li>
            <li>Accessible components</li>
            <li>Composable patterns</li>
          </List>
          <List ordered>
            <li>Install dependencies</li>
            <li>Start the workspace</li>
            <li>Build your interface</li>
          </List>
        </Stack>
      );
    case "tag":
      return <TagExample />;
    case "tile":
      return (
        <Stack gap={5}>
          <Tile>
            <h3>Component workspace</h3>
            <p>A shared foundation for your next interface.</p>
            <Link href="/components/button">
              Explore the components <Icon name="arrowRight" />
            </Link>
          </Tile>
          <Layer className="tile-layer-example">
            <Tile>
              <h3>Nested surface</h3>
              <p>Layer tokens adjust the relationship automatically.</p>
            </Tile>
          </Layer>
        </Stack>
      );
    case "code-snippet":
      return (
        <CodeSnippet label="Component example" language="tsx">
          {
            'import { Button } from "@cinder/react";\n\nexport function SaveAction() {\n  return <Button onPress={save}>Save changes</Button>;\n}'
          }
        </CodeSnippet>
      );
    case "notification":
      return <NotificationExample />;
    case "toast":
      return <ToastExample />;
    case "progress-bar":
      return <ProgressExample />;
    case "progress-indicator":
      return <ProgressIndicatorExample />;
    case "loading":
      return (
        <Stack orientation="horizontal" gap={7}>
          <Loading label="Loading workspace" />
          <Loading size="sm" label="Loading details" />
        </Stack>
      );
    case "inline-loading":
      return (
        <Stack gap={5}>
          <InlineLoading>Saving changes…</InlineLoading>
          <InlineLoading status="success">Changes saved</InlineLoading>
          <InlineLoading status="error">Unable to save</InlineLoading>
        </Stack>
      );
    case "skeleton":
      return (
        <div role="region" aria-busy="true" aria-label="Loading workspace details">
          <Stack gap={6}>
            <Skeleton width="50%" height="1.5rem" />
            <Skeleton lines={3} />
            <Skeleton width="8rem" height="2.5rem" />
          </Stack>
        </div>
      );
    case "modal":
      return <ModalExample />;
    case "menu":
      return <MenuExample />;
    case "overflow-menu":
      return <MenuExample overflow />;
    case "popover":
      return <PopoverExample />;
    case "tooltip":
      return <TooltipExample />;
    default:
      return <p>Choose a component from the navigation.</p>;
  }
}
