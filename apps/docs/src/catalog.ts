export type ComponentCategory =
  "Actions" | "Inputs" | "Selection" | "Navigation" | "Data display" | "Feedback" | "Overlays";
export interface ComponentEntry {
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  anatomy: string;
  keyboard: string;
  carbon: string;
  rac?: string;
  code: string;
  props: [string, string, string][];
  status?: "Experimental";
}

const carbon = (path: string) =>
  `https://carbondesignsystem.com/building-blocks/core/components/${path}/usage/`;
const rac = (name: string) => `https://react-aria.adobe.com/${name}`;
const controlProps: [string, string, string][] = [
  ["size", '"sm" | "md" | "lg"', "32, 40, or 48 px control height."],
  ["isDisabled", "boolean", "Disable interaction and apply the disabled treatment."],
  [
    "className",
    "string | render function",
    "Extend the base styles with custom class names.",
  ],
];
const fieldProps: [string, string, string][] = [
  ["label", "ReactNode", "Visible, programmatically associated field label."],
  ["description", "ReactNode", "Help text associated with the input."],
  [
    "errorMessage",
    "ReactNode | render function",
    "Validation message; RAC supports native and ARIA validation.",
  ],
  [
    "value / onChange",
    "See RAC type",
    "Controlled state; defaultValue enables uncontrolled state.",
  ],
  ...controlProps,
];

export const components: ComponentEntry[] = [
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    description: "One clear action, with room for the next step.",
    anatomy:
      "A 32, 40, 48, 64, or 80 px control. Text aligns to the left; the optional 16 px icon occupies the trailing space. A two-pixel focus outline remains visible on every theme.",
    keyboard:
      "Tab to focus. Space or Enter activates. Pending buttons retain focus while blocking another press.",
    carbon: carbon("button"),
    rac: rac("Button"),
    code: '<Button variant="primary" onPress={save}>\n  Save changes <Icon name="arrowRight" />\n</Button>',
    props: [
      [
        "variant",
        '"primary" | "secondary" | "tertiary" | "ghost" | "danger" | "danger-tertiary" | "danger-ghost"',
        "Choose an action's visual priority.",
      ],
      ["iconOnly", "boolean", "Square icon control. Supply an aria-label."],
      ["isPending", "boolean", "Show pending feedback and prevent duplicate actions."],
      [
        "pendingLabel",
        "string",
        "Accessible progress text; defaults to Pending. Localize with the action.",
      ],
      ["size", '"sm" | "md" | "lg" | "xl" | "2xl"', "32, 40, 48, 64, or 80 px button height."],
      ...controlProps.filter(([name]) => name !== "size"),
    ],
  },
  {
    slug: "link",
    name: "Link",
    category: "Actions",
    description: "Navigation that says where it goes.",
    anatomy:
      "Semantic links use link tokens and an optional inline underline. Navigation and actions retain different HTML semantics.",
    keyboard: "Tab to focus. Enter follows the link. Standard open-in-new-tab shortcuts work.",
    carbon: carbon("link"),
    rac: rac("Link"),
    code: '<Link href="/foundations" inline>Read the foundations</Link>',
    props: [
      ["href", "string", "Navigation destination."],
      ["inline", "boolean", "Underlined style for links within sentences."],
      ["isDisabled", "boolean", "Disable the link through RAC."],
    ],
  },
  {
    slug: "text-input",
    name: "Text input",
    category: "Inputs",
    description: "A label, an input, and the right amount of help.",
    anatomy:
      "The field surface has a bottom border and 16 px inline padding. Labels, descriptions, and errors are connected by RAC. Children can replace the convenience anatomy with RAC parts.",
    keyboard: "Tab enters the field. Standard text selection and editing shortcuts are preserved.",
    carbon: carbon("text-input"),
    rac: rac("TextField"),
    code: '<TextField\n  label="Workspace name"\n  name="workspace"\n  isRequired\n  description="Use a name your team will recognize."\n/>',
    props: fieldProps,
  },
  {
    slug: "text-area",
    name: "Text area",
    category: "Inputs",
    description: "More room for a complete thought.",
    anatomy:
      "A multiline field with the same label, helper, error, focus, and disabled language as text input. The user can resize it vertically.",
    keyboard: "Tab to focus. Enter creates a new line. Native text editing works as expected.",
    carbon: carbon("text-input"),
    rac: rac("TextField"),
    code: '<TextArea label="Description" rows={4} maxLength={300} />',
    props: [
      ["rows", "number", "Initial visible line count, defaults to 4."],
      ...fieldProps.filter(([name]) => name !== "size"),
    ],
  },
  {
    slug: "number-input",
    name: "Number input",
    category: "Inputs",
    description: "A numeric value with deliberate bounds.",
    anatomy:
      "A localized number input with separate decrement and increment actions. RAC handles parsing, formatting, and min/max values.",
    keyboard: "Arrow Up and Down change the value. Home and End go to the bounds when defined.",
    carbon: carbon("number-input"),
    rac: rac("NumberField"),
    code: '<NumberField label="Seats" minValue={1} maxValue={100} defaultValue={8} />',
    props: [
      ["minValue / maxValue", "number", "Numeric limits."],
      ["step", "number", "Amount per increment."],
      [
        "formatOptions",
        "Intl.NumberFormatOptions",
        "Units, decimal precision, currency, or percentage.",
      ],
      ...fieldProps,
    ],
  },
  {
    slug: "search",
    name: "Search",
    category: "Inputs",
    description: "Find a known item or narrow a collection.",
    anatomy:
      "A search glyph, text input, and clear action. The clear control is hidden when the input is empty.",
    keyboard: "Type to update the query. Escape clears the value; Enter can submit a search.",
    carbon: carbon("search"),
    rac: rac("SearchField"),
    code: '<SearchField label="Search components" value={query} onChange={setQuery} />',
    props: fieldProps,
  },
  {
    slug: "select",
    name: "Select",
    category: "Selection",
    description: "A compact list of mutually exclusive choices.",
    anatomy:
      "NativeSelect uses the browser's select behavior and Cinder's field geometry. Use the Dropdown for richer option content or multiple selection.",
    keyboard: "Platform-native select interaction: arrows, typeahead, and Enter to choose.",
    carbon: carbon("select"),
    code: '<NativeSelect label="Region" defaultValue="eu">\n  <option value="eu">Europe</option>\n  <option value="us">North America</option>\n</NativeSelect>',
    props: [
      ["label", "ReactNode", "Required visible label."],
      ["size", '"sm" | "md" | "lg"', "Control height."],
      ["value / onChange", "Native select props", "Uses the native change event."],
    ],
  },
  {
    slug: "dropdown",
    name: "Dropdown",
    category: "Selection",
    description: "A consistent collection of choices across platforms.",
    anatomy:
      "Cinder Select composes RAC Select, a trigger, a themed Popover, and a ListBox. Use ListBoxItem for static choices or supply items and a render function.",
    keyboard:
      "Enter, Space, or Arrow Down opens the list. Arrows move, typing searches, Enter selects, Escape closes.",
    carbon: carbon("dropdown"),
    rac: rac("Select"),
    code: '<Select label="Environment" defaultValue="preview">\n  <ListBoxItem id="preview">Preview</ListBoxItem>\n  <ListBoxItem id="production">Production</ListBoxItem>\n</Select>',
    props: [
      ["items", "Iterable<T>", "Optional dynamic collection."],
      ["children", "ReactNode | (item: T) => ReactNode", "ListBoxItem children."],
      ...fieldProps,
    ],
  },
  {
    slug: "combo-box",
    name: "Combo box",
    category: "Selection",
    description: "Search and select without losing context.",
    anatomy:
      "An input and listbox share RAC's collection model. The default filter is locale-sensitive. Custom values are opt-in.",
    keyboard:
      "Type to filter, Arrow Down to move through results, Enter to choose, Escape to dismiss.",
    carbon: carbon("dropdown"),
    rac: rac("ComboBox"),
    code: '<ComboBox label="Framework" placeholder="Find a framework">\n  <ListBoxItem id="react">React</ListBoxItem>\n  <ListBoxItem id="next">Next.js</ListBoxItem>\n</ComboBox>',
    props: [
      ["defaultFilter", "(text, input) => boolean", "Override the locale-aware filter."],
      ["allowsCustomValue", "boolean", "Allow values outside the collection."],
      ...fieldProps,
    ],
  },
  {
    slug: "multi-select",
    name: "Multi-select",
    category: "Selection",
    description: "Several choices, one coherent field.",
    anatomy:
      "Uses RAC 1.22's multiple-selection Select model. Selected values appear in the trigger and remain checked in the list.",
    keyboard:
      "Open with Enter; use arrows and Space to toggle choices. Escape closes without losing selection.",
    carbon: carbon("dropdown"),
    rac: rac("Select"),
    code: '<Select selectionMode="multiple" label="Regions"\n  value={regions} onChange={setRegions}>\n  <ListBoxItem id="eu">Europe</ListBoxItem>\n  <ListBoxItem id="us">North America</ListBoxItem>\n</Select>',
    props: [
      ["selectionMode", '"multiple"', "Enable multiple values."],
      [
        "value / onChange",
        "Key[] / (value: Key[]) => void",
        "RAC's current value API, rather than selectedKeys.",
      ],
      ...fieldProps.filter(([name]) => name !== "value / onChange"),
    ],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Selection",
    description: "Independent choices, individually or as a group.",
    anatomy:
      "A 16 px square with selected, indeterminate, invalid, and disabled states. CheckboxGroup associates a group label, validation, and submitted values.",
    keyboard: "Tab to a checkbox. Space toggles selection.",
    carbon: carbon("checkbox"),
    rac: rac("Checkbox"),
    code: '<CheckboxGroup label="Notifications" defaultValue={["releases"]}>\n  <Checkbox value="releases">Product releases</Checkbox>\n  <Checkbox value="tips">Usage tips</Checkbox>\n</CheckboxGroup>',
    props: [
      [
        "isSelected / onChange",
        "boolean / (selected: boolean) => void",
        "Controlled checkbox state.",
      ],
      ["isIndeterminate", "boolean", "Display a mixed selection state."],
      ["value", "string", "Submitted value within a group."],
    ],
  },
  {
    slug: "radio-button",
    name: "Radio button",
    category: "Selection",
    description: "Make one choice visible among a few.",
    anatomy:
      "RadioGroup manages mutually exclusive values. The 18 px radio target is paired with a larger label area.",
    keyboard: "Tab enters the group. Arrow keys move and select. Tab moves to the next control.",
    carbon: carbon("radio-button"),
    rac: rac("RadioGroup"),
    code: '<RadioGroup label="Access" defaultValue="private">\n  <Radio value="private">Private</Radio>\n  <Radio value="team">Team</Radio>\n</RadioGroup>',
    props: [
      ["value / onChange", "string / (value: string) => void", "Controlled group selection."],
      ["orientation", '"horizontal" | "vertical"', "Layout and directional navigation."],
      ["isRequired", "boolean", "Require a choice at form submission."],
    ],
  },
  {
    slug: "toggle",
    name: "Toggle",
    category: "Selection",
    description: "An immediate setting with two clear states.",
    anatomy:
      "A 48 × 24 px track or compact 32 × 16 px variant. Label the setting consistently; selected state is communicated through switch semantics.",
    keyboard:
      "Tab to focus. Space toggles the setting. Cinder retains RAC's input-backed behavior; Enter is not a toggle shortcut and may submit a containing form.",
    carbon: carbon("toggle"),
    rac: rac("Switch"),
    code: "<Switch isSelected={enabled} onChange={setEnabled}>Email notifications</Switch>",
    props: [
      ["isSelected / onChange", "boolean / (selected: boolean) => void", "Controlled setting."],
      ["size", '"sm" | "md"', "Compact or standard track."],
      ["isDisabled", "boolean", "Disable interaction."],
    ],
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Inputs",
    description: "Explore a range with continuous feedback.",
    anatomy:
      "A four-pixel track, fill, circular thumb, and formatted output. A single thumb grows from 14 to 20 px when active; range thumbs stay 16 px. Number values create one thumb; arrays create a range.",
    keyboard:
      "Arrows change by one step; Page Up/Down use larger steps; Home/End reach the bounds.",
    carbon: carbon("slider"),
    rac: rac("Slider"),
    code: '<Slider label="Capacity" defaultValue={60} minValue={0} maxValue={100} />',
    props: [
      ["value / defaultValue", "number | number[]", "One value or a range."],
      ["thumbLabels", "string[]", "Accessible labels for range thumbs."],
      ["formatOptions", "Intl.NumberFormatOptions", "Format the value output."],
    ],
  },
  {
    slug: "date-picker",
    name: "Date picker",
    category: "Inputs",
    description: "Enter a date or find it on a calendar.",
    anatomy:
      "Editable date segments and a themed calendar popover. DateValue preserves calendar and time-zone information; plain JavaScript Date is not the field model.",
    keyboard:
      "Arrows edit date segments. In the calendar, arrows move days; Page Up/Down changes months. Escape returns focus to the trigger.",
    carbon: carbon("date-picker"),
    rac: rac("DatePicker"),
    code: 'import { parseDate } from "@internationalized/date";\n\n<DatePicker label="Start date" defaultValue={parseDate("2026-11-16")} />',
    props: [
      ["value / defaultValue", "DateValue", "A calendar-aware date value."],
      ["minValue / maxValue", "DateValue", "Allowed date range."],
      ["isDateUnavailable", "(date) => boolean", "Disable specific dates."],
      ...fieldProps,
    ],
  },
  {
    slug: "date-range-picker",
    name: "Date range picker",
    category: "Inputs",
    description: "A start and an end, connected by one decision.",
    anatomy:
      "Two segmented inputs and a range calendar. Both endpoints are announced and editable.",
    keyboard:
      "Edit segments with arrows, or choose the start and end in the calendar. Escape closes the overlay.",
    carbon: carbon("date-picker"),
    rac: rac("DateRangePicker"),
    code: '<DateRangePicker label="Reporting period"\n  defaultValue={{ start: parseDate("2026-11-01"), end: parseDate("2026-11-15") }}\n/>',
    props: [
      ["value / defaultValue", "{ start: DateValue; end: DateValue }", "Both range endpoints."],
      ...fieldProps,
    ],
  },
  {
    slug: "time-picker",
    name: "Time picker",
    category: "Inputs",
    description: "Time entry that respects the reader's locale.",
    anatomy:
      "Cinder TimeField uses RAC's segmented time input. The locale controls 12/24-hour presentation, with explicit overrides available.",
    keyboard:
      "Left and Right move between segments. Up and Down adjust a segment. Type digits directly.",
    carbon: carbon("date-picker"),
    rac: rac("TimeField"),
    code: 'import { Time } from "@internationalized/date";\n\n<TimeField label="Reminder time" defaultValue={new Time(9, 30)} />',
    props: [
      ["hourCycle", "12 | 24", "Override the locale's hour cycle."],
      ["granularity", '"hour" | "minute" | "second"', "Finest editable unit."],
      ...fieldProps,
    ],
  },
  {
    slug: "file-uploader",
    name: "File uploader",
    category: "Inputs",
    description: "Choose files with a pointer, keyboard, or drop.",
    anatomy:
      "RAC FileTrigger and DropZone share one selection path. Accepted types and file size are checked for both. Files remain local until an application uploads them.",
    keyboard:
      "Tab to the choose-files button and press Enter. Selected files have individually labeled remove actions.",
    carbon: carbon("file-uploader"),
    rac: rac("FileTrigger"),
    code: '<FileUploader label="Attachments"\n  acceptedFileTypes={[".pdf", "image/*"]}\n  maxSize={10 * 1024 * 1024} allowsMultiple\n  onFilesChange={setFiles}\n/>',
    props: [
      [
        "files / onFilesChange",
        "File[] / (files: File[]) => void",
        "Optional controlled file selection.",
      ],
      ["acceptedFileTypes", "string[]", "MIME types, wildcard types, or extensions."],
      ["maxSize", "number", "Optional per-file byte limit."],
      ["allowsMultiple", "boolean", "Allow more than one file."],
    ],
  },
  {
    slug: "form",
    name: "Form",
    category: "Inputs",
    description: "Connected labels, useful errors, and a real submission.",
    anatomy:
      "RAC Form coordinates field validation. Use name on each field for FormData, and validationErrors for server responses. Cinder adds no form-state framework.",
    keyboard:
      "Tab through controls. Enter submits where appropriate. Invalid fields receive focus and expose their error text.",
    carbon: carbon("form"),
    rac: rac("Form"),
    code: '<Form onSubmit={(event) => {\n  event.preventDefault();\n  save(new FormData(event.currentTarget));\n}}>\n  <TextField label="Email" name="email" type="email" isRequired />\n  <Button type="submit">Save</Button>\n</Form>',
    props: [
      ["onSubmit", "FormEventHandler", "Handle validated form submission."],
      [
        "validationErrors",
        "Record<string, string | string[]>",
        "Associate server errors by field name.",
      ],
      [
        "validationBehavior",
        '"native" | "aria"',
        "Native blocking validation or application-managed validation.",
      ],
    ],
  },
  {
    slug: "accordion",
    name: "Accordion",
    category: "Navigation",
    description: "Make detailed content available at the right moment.",
    anatomy:
      "DisclosureGroup controls expansion; each item contains a real heading, trigger, and panel. Supports single or multiple expanded items.",
    keyboard:
      "Tab to a heading button, then Enter or Space to expand. Collapsed content is excluded from the tab order.",
    carbon: carbon("accordion"),
    rac: rac("DisclosureGroup"),
    code: '<Accordion allowsMultipleExpanded>\n  <AccordionItem id="details" title="Details">Content</AccordionItem>\n</Accordion>',
    props: [
      ["expandedKeys / onExpandedChange", "Set<Key> / handler", "Controlled expanded items."],
      ["allowsMultipleExpanded", "boolean", "Keep more than one panel open."],
      ["headingLevel", "1 | 2 | 3 | 4 | 5 | 6", "AccordionItem heading level; defaults to 3."],
    ],
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    description: "A clear path back through the hierarchy.",
    anatomy: "An ordered list of links with slash separators and aria-current on the current page.",
    keyboard: "Tab between links. Enter follows the selected destination.",
    carbon: carbon("breadcrumb"),
    rac: rac("Breadcrumbs"),
    code: '<Breadcrumbs>\n  <BreadcrumbItem href="/">Home</BreadcrumbItem>\n  <BreadcrumbItem isCurrent>Components</BreadcrumbItem>\n</Breadcrumbs>',
    props: [
      ["children", "BreadcrumbItem[]", "Hierarchy from broadest to current."],
      ["isCurrent", "boolean", "Mark the current item with aria-current."],
    ],
  },
  {
    slug: "content-switcher",
    name: "Content switcher",
    category: "Navigation",
    description: "Alternate views of the same content.",
    anatomy:
      "A single-selection RAC ToggleButtonGroup with radio-group semantics. One selection is required; each item occupies a shared horizontal track. This is a segmented view control. Carbon's ContentSwitcher uses tabs; use Cinder Tabs when content needs tab-to-panel relationships.",
    keyboard: "Arrow keys move between choices. Space selects the focused item.",
    carbon: carbon("content-switcher"),
    rac: rac("ToggleButtonGroup"),
    code: '<ContentSwitcher aria-label="View" defaultSelectedKeys={["list"]}>\n  <ToggleButton id="list">List</ToggleButton>\n  <ToggleButton id="grid">Grid</ToggleButton>\n</ContentSwitcher>',
    props: [
      ["selectedKeys / onSelectionChange", "Iterable<Key> / handler", "Controlled view selection."],
      ["size", '"sm" | "md" | "lg"', "Shared control height."],
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Related sections, organized in one place.",
    anatomy:
      "Line or contained tabs with RAC's tab-to-panel relationships. Active tabs receive an interactive border and stronger type weight.",
    keyboard:
      "Tab enters the selected tab. Arrows move between tabs. Home and End move to the first and last tab.",
    carbon: carbon("tabs"),
    rac: rac("Tabs"),
    code: '<Tabs>\n  <TabList aria-label="Workspace">\n    <Tab id="overview">Overview</Tab>\n    <Tab id="settings">Settings</Tab>\n  </TabList>\n  <TabPanel id="overview">Overview content</TabPanel>\n  <TabPanel id="settings">Settings content</TabPanel>\n</Tabs>',
    props: [
      ["variant", '"line" | "contained"', "Visual style."],
      ["selectedKey / onSelectionChange", "Key / handler", "Controlled active tab."],
      ["keyboardActivation", '"automatic" | "manual"', "When a focused tab becomes selected."],
    ],
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Navigation",
    description: "Move through a collection without losing your place.",
    anatomy:
      "A one-based controlled page, item range, page-size selector, and bounded previous/next controls. Empty collections read 0–0 of 0.",
    keyboard:
      "Tab to the page-size selector and navigation buttons. Boundary actions are disabled.",
    carbon: carbon("pagination"),
    code: "<Pagination totalItems={items.length} page={page} pageSize={10}\n  onPageChange={setPage}\n/>",
    props: [
      ["page / onPageChange", "number / (page: number) => void", "One-based current page."],
      ["pageSize", "number", "Items on each page."],
      ["totalItems", "number", "Number of items after filtering."],
      ["onPageSizeChange", "(size: number) => void", "Show and handle the size selector."],
    ],
  },
  {
    slug: "tree-view",
    name: "Tree view",
    category: "Navigation",
    description: "Explore a hierarchy at any depth.",
    anatomy:
      "RAC Tree uses treegrid semantics, nested TreeItem collections, and a slotted chevron button. This intentionally differs from Carbon's tree/treeitem model. Keyboard navigation, expansion, and selection remain RAC behavior.",
    keyboard:
      "Up/Down moves items. Right expands; Left collapses or moves to the parent. Typeahead finds an item.",
    carbon: carbon("tree-view"),
    rac: rac("Tree"),
    code: '<Tree aria-label="Files" selectionMode="single">\n  <TreeItem id="readme" textValue="README.md">\n    <TreeItemContent>README.md</TreeItemContent>\n  </TreeItem>\n</Tree>',
    props: [
      ["selectionMode", '"none" | "single" | "multiple"', "Selection behavior."],
      [
        "expandedKeys / onExpandedChange",
        "Iterable<Key> / handler",
        "Controlled expanded branches.",
      ],
      ["items", "Iterable<T>", "Dynamic hierarchical collection."],
    ],
  },
  {
    slug: "ui-shell",
    name: "UI shell",
    category: "Navigation",
    description: "A stable frame around a changing workspace.",
    anatomy:
      "A 48 px header, named navigation regions, and a 256 px side navigation. Applications compose responsive disclosure behavior from RAC.",
    keyboard:
      "A skip link moves to the main content. Tab follows navigation order; the current page uses aria-current.",
    carbon: carbon("ui-shell-header"),
    code: '<Header>\n  <HeaderName href="/">Workspace</HeaderName>\n  <HeaderNav aria-label="Primary">\n    <Link href="/projects" aria-current="page">Projects</Link>\n  </HeaderNav>\n</Header>',
    props: [
      ["Header / HeaderNav / SideNav", "Native element props", "Composable semantic structure."],
      ["HeaderName", "LinkProps", "Product name and home link."],
    ],
  },
  {
    slug: "data-table",
    name: "Data table",
    category: "Data display",
    description: "Readable data with useful, predictable interactions.",
    anatomy:
      "An interactive RAC grid, with Carbon-aligned header and row geometry. Arrow-key cell navigation deliberately differs from Carbon's ordinary table navigation. Sorting and selection are controlled; filtering and pagination operate on the actual example data.",
    keyboard:
      "Tab enters the grid. Arrow keys navigate cells. Space selects a row; sortable headers activate with Enter or Space.",
    carbon: carbon("data-table"),
    rac: rac("Table"),
    code: '<Table aria-label="Packages" sortDescriptor={sort} onSortChange={setSort}>\n  <TableHeader>\n    <Column id="name" isRowHeader allowsSorting>Name</Column>\n    <Column id="version">Version</Column>\n  </TableHeader>\n  <TableBody items={sortedItems}>\n    {(item) => <Row id={item.id}><Cell>{item.name}</Cell><Cell>{item.version}</Cell></Row>}\n  </TableBody>\n</Table>',
    props: [
      ["size", '"sm" | "md" | "lg" | "xl"', "32, 40, 48, or 64 px rows."],
      [
        "sortDescriptor / onSortChange",
        "SortDescriptor / handler",
        "Sort state; the application sorts the items.",
      ],
      ["selectedKeys / onSelectionChange", "Selection / handler", "Controlled row selection."],
      ["selectionMode", '"none" | "single" | "multiple"', "Select one or more rows."],
    ],
  },
  {
    slug: "contained-list",
    name: "Contained list",
    category: "Data display",
    description: "A focused collection, with an action on each item.",
    anatomy:
      "Styled RAC GridList handles interactive rows with optional controls and grid semantics. Carbon's ContainedList uses ordinary list navigation; Cinder intentionally uses RAC's arrow-key collection model. A collection name supplies context.",
    keyboard:
      "Arrows move between rows. Tab reaches row actions. Space changes selection when enabled.",
    carbon: carbon("contained-list"),
    rac: rac("GridList"),
    code: '<GridList aria-label="Team" selectionMode="single">\n  <GridListItem id="design">Design team</GridListItem>\n  <GridListItem id="engineering">Engineering team</GridListItem>\n</GridList>',
    props: [
      ["items", "Iterable<T>", "Dynamic collection."],
      ["selectionMode", '"none" | "single" | "multiple"', "Selection behavior."],
      ["renderEmptyState", "function", "Useful content when the list is empty."],
    ],
  },
  {
    slug: "structured-list",
    name: "Structured list",
    category: "Data display",
    description: "Related facts with a consistent reading order.",
    anatomy:
      "A semantic definition list for term/value relationships. For selectable or interactive rows, compose a GridList instead.",
    keyboard: "Static content follows document reading order; embedded links remain tabbable.",
    carbon: carbon("structured-list"),
    code: "<StructuredList>\n  <div><dt>Runtime</dt><dd>Bun 1.4.4</dd></div>\n  <div><dt>Interaction</dt><dd>RAC 1.22.1</dd></div>\n</StructuredList>",
    props: [
      ["children", "ReactNode", "Rows containing dt and dd."],
      ["...props", "dl element props", "Native semantics and ref support."],
    ],
  },
  {
    slug: "list",
    name: "List",
    category: "Data display",
    description: "Related items, with order when it matters.",
    anatomy: "Native ordered and unordered lists with Carbon productive text and spacing.",
    keyboard: "Read in document order with list semantics exposed to assistive technology.",
    carbon: carbon("list"),
    code: "<List>\n  <li>Install dependencies</li>\n  <li>Start the workspace</li>\n</List>",
    props: [
      ["ordered", "boolean", "Render a numbered list."],
      ["children", "ReactNode", "List item elements."],
    ],
  },
  {
    slug: "tag",
    name: "Tag",
    category: "Data display",
    description: "Compact context that stays close to the content.",
    anatomy:
      "Read-only tags use Carbon's theme-specific tag tokens. FilterTag inside TagGroup adds removal and RAC grid navigation, rather than Carbon's individually tabbable tag actions.",
    keyboard:
      "Read-only tags are not focusable. Filter tags use arrows for navigation and Delete/Backspace for removal.",
    carbon: carbon("tag"),
    rac: rac("TagGroup"),
    code: '<Tag color="green">Available</Tag>\n\n<TagGroup label="Filters" onRemove={removeFilters}>\n  <FilterTag id="react">React</FilterTag>\n</TagGroup>',
    props: [
      ["color", "TagColor", "Ten Carbon token color families."],
      ["size", '"sm" | "md"', "18 or 24 px passive tag."],
      ["onRemove", "(keys: Set<Key>) => void", "TagGroup removal handler."],
    ],
  },
  {
    slug: "tile",
    name: "Tile",
    category: "Data display",
    description: "A surface for content that belongs together.",
    anatomy:
      "A flat layer surface with 16 px padding. Interactive tiles are composed from RAC controls to keep one clear interaction model.",
    keyboard:
      "A static Tile adds no tab stop. Links or controls inside retain their own semantics.",
    carbon: carbon("tile"),
    code: '<Tile>\n  <h3>Workspace</h3>\n  <p>Your shared component library.</p>\n  <Link href="/components">Explore components</Link>\n</Tile>',
    props: [["...props", "div element props", "Content, class, style, events, and ref."]],
  },
  {
    slug: "code-snippet",
    name: "Code snippet",
    category: "Data display",
    description: "Code you can read, select, and copy.",
    anatomy:
      "IBM Plex Mono in a scrollable preformatted region. Clipboard results are announced; a failed permission request has a readable fallback.",
    keyboard:
      "Tab to the copy action. The code region can be focused for keyboard scrolling and selected normally.",
    carbon: carbon("code-snippet"),
    code: '<CodeSnippet label="Install command">bun install</CodeSnippet>',
    props: [
      ["children", "string", "The code, preserved verbatim."],
      ["copyable", "boolean", "Show a copy action; defaults to true."],
      ["maxHeight", "string", "Optional maximum code-region height."],
    ],
  },
  {
    slug: "notification",
    name: "Notification",
    category: "Feedback",
    description: "The right information, at the right level of urgency.",
    anatomy:
      "Info, success, warning, and error variants use Carbon support and notification tokens, with inverse support colors on high-contrast surfaces. This is a passive status region by default. Optional action content does not implement Carbon's focus-managing ActionableNotification alertdialog; use a separately composed Dialog for that interaction.",
    keyboard:
      "New status text is announced politely by default. Use role=alert only for urgent, time-sensitive updates.",
    carbon: carbon("notification"),
    code: '<InlineNotification kind="success" title="Changes saved" onDismiss={dismiss}>\n  Your preferences are up to date.\n</InlineNotification>',
    props: [
      ["kind", '"info" | "success" | "warning" | "error"', "Semantic message type."],
      ["lowContrast", "boolean", "Theme-tinted background; true by default."],
      ["onDismiss", "() => void", "Show a dismiss action."],
      ["role", '"status" | "alert"', "Choose live-region urgency."],
    ],
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    description: "Brief feedback that does not interrupt the work.",
    anatomy:
      "A provider-local RAC toast queue with up to three visible notifications. RAC manages announcements, dismissal, and focus behavior. Its upstream API is experimental.",
    keyboard:
      "Use RAC's notification-region shortcut to reach notifications, then Tab between actions. Close returns focus appropriately.",
    carbon: carbon("notification"),
    rac: rac("Toast"),
    code: 'const toast = useToast();\n\n<Button onPress={() => toast.add({\n  title: "Changes saved", kind: "success"\n})}>Save</Button>',
    props: [
      [
        "ToastProvider",
        "{ children: ReactNode }",
        "Place inside Theme; owns an independent queue.",
      ],
      [
        "useToast().add",
        "(message, options?) => string",
        "Add a message; optional timeout is explicit.",
      ],
      ["useToast().close", "(key: string) => void", "Remove a notification."],
    ],
    status: "Experimental",
  },
  {
    slug: "progress-bar",
    name: "Progress bar",
    category: "Feedback",
    description: "Make measurable progress understandable.",
    anatomy:
      "A labeled eight-pixel progress track with formatted output, helper text, and success/error treatment. Indeterminate progress is explicit.",
    keyboard:
      "Read-only progress does not add a tab stop. RAC exposes bounds and current values to assistive technology.",
    carbon: carbon("progress-bar"),
    rac: rac("ProgressBar"),
    code: '<ProgressBar label="Upload progress" value={64} helperText="64 of 100 files" />',
    props: [
      ["value / minValue / maxValue", "number", "Progress and range."],
      ["isIndeterminate", "boolean", "Unknown completion time."],
      ["status", '"active" | "success" | "error"', "Completion treatment."],
    ],
  },
  {
    slug: "progress-indicator",
    name: "Progress indicator",
    category: "Feedback",
    description: "Where you are in a sequence, and what comes next.",
    anatomy:
      "A semantic ordered list of complete, current, incomplete, and invalid steps. The current item is announced with aria-current=step.",
    keyboard:
      "With onStepChange, each enabled step is an action. Without it, the sequence is read-only.",
    carbon: carbon("progress-indicator"),
    code: '<ProgressIndicator steps={[\n  { id: "details", label: "Details", status: "complete" },\n  { id: "review", label: "Review", status: "current" },\n  { id: "done", label: "Complete" }\n]} />',
    props: [
      ["steps", "ProgressStep[]", "Named steps and states."],
      ["onStepChange", "(id: string) => void", "Optional interactive navigation."],
      ["orientation", '"horizontal" | "vertical"', "Sequence direction."],
    ],
  },
  {
    slug: "loading",
    name: "Loading",
    category: "Feedback",
    description: "A clear signal that work is continuing.",
    anatomy:
      "A circular indicator with an accessible status label. Large and small variants; reduced motion presents a static indicator.",
    keyboard: "The status does not steal focus or add a tab stop.",
    carbon: carbon("loading"),
    code: '<Loading label="Loading packages" size="lg" />',
    props: [
      ["label", "string", "Accessible loading message."],
      ["size", '"sm" | "lg"', "16 or 88 px indicator."],
    ],
  },
  {
    slug: "inline-loading",
    name: "Inline loading",
    category: "Feedback",
    description: "Keep feedback next to the action that caused it.",
    anatomy:
      "Compact active, success, and error feedback with a status message. Applications own the operation lifecycle.",
    keyboard: "Status changes are announced while focus remains on the original control.",
    carbon: carbon("inline-loading"),
    code: '<InlineLoading status="success">Saved</InlineLoading>',
    props: [
      ["status", '"active" | "success" | "error"', "Current operation state."],
      ["children", "ReactNode", "Visible and announced message."],
    ],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    description: "Reserve the shape of content while it arrives.",
    anatomy:
      "Neutral token-based placeholders with subtle opacity motion. Skeleton elements are hidden from assistive technology; label the loading region separately.",
    keyboard: "No interactive elements or tab stops. Respect reduced-motion preferences.",
    carbon: carbon("loading"),
    code: '<div role="region" aria-busy="true" aria-label="Loading description">\n  <Skeleton lines={3} />\n</div>',
    props: [
      ["lines", "number", "Number of placeholders."],
      ["width / height", "string", "Optional dimensions."],
    ],
  },
  {
    slug: "modal",
    name: "Modal",
    category: "Overlays",
    description: "A focused decision with a clear return path.",
    anatomy:
      "An outer cinder-modal-overlay carries the backdrop and Theme's appearance, layer, direction, and language through the portal. An inner cinder-modal holds the named Dialog, title, and actions. RAC contains focus and blocks background scrolling. className/ref target the inner surface; style/render/native props target the outer overlay.",
    keyboard:
      "Opening moves focus into the dialog. Tab stays inside. Escape closes; focus returns to the trigger.",
    carbon: carbon("modal"),
    rac: rac("Modal"),
    code: '<DialogTrigger>\n  <Button>Open dialog</Button>\n  <Modal isDismissable>\n    <Dialog>\n      <Heading slot="title">Workspace settings</Heading>\n      <Button slot="close">Done</Button>\n    </Dialog>\n  </Modal>\n</DialogTrigger>',
    props: [
      ["size", '"xs" | "sm" | "md" | "lg"', "Inner modal maximum width."],
      ["isDismissable", "boolean", "Allow dismissal by clicking the overlay."],
      ["isOpen / onOpenChange", "boolean / handler", "Controlled visibility."],
      [
        "className / ref",
        "string | render function / Ref<HTMLDivElement>",
        "Class and ref for the inner cinder-modal surface; the base class is retained.",
      ],
      [
        "style / render / native props",
        "RAC ModalOverlayProps",
        "Target the outer cinder-modal-overlay, preserving the existing contract.",
      ],
      [
        "overlayClassName / overlayRef",
        'ModalOverlayProps["className"] / Ref<HTMLDivElement>',
        "Class and ref for the outer overlay. The class merges with its base and Theme appearance classes.",
      ],
      ["modalStyle", "CSSProperties | render function", "Style the inner modal surface."],
      [
        "lang",
        "string",
        "Override Theme's HTML language on the outer overlay, including an empty string; locale and direction stay separate.",
      ],
    ],
  },
  {
    slug: "menu",
    name: "Menu",
    category: "Overlays",
    description: "Related actions, close to their point of use.",
    anatomy:
      "RAC MenuTrigger, a themed Popover, and Menu items. Supports sections, selection, disabled actions, and nested submenus.",
    keyboard:
      "Enter opens. Arrow keys navigate, typing finds an action, Enter activates, Escape closes.",
    carbon: carbon("menu"),
    rac: rac("Menu"),
    code: '<MenuTrigger>\n  <Button variant="secondary">Actions</Button>\n  <Popover><Menu onAction={handleAction}>\n    <MenuItem id="edit">Edit</MenuItem>\n    <MenuItem id="duplicate">Duplicate</MenuItem>\n  </Menu></Popover>\n</MenuTrigger>',
    props: [
      ["onAction", "(key: Key) => void", "Run the chosen action."],
      ["disabledKeys", "Iterable<Key>", "Disable unavailable actions."],
      ["selectionMode", '"none" | "single" | "multiple"', "Optional checked menu items."],
    ],
  },
  {
    slug: "overflow-menu",
    name: "Overflow menu",
    category: "Overlays",
    description: "Secondary actions without a crowded toolbar.",
    anatomy:
      "The menu composition with an icon-only trigger. Every instance needs a context-specific accessible label.",
    keyboard: "Same menu behavior: Enter, arrows, typeahead, and Escape.",
    carbon: carbon("menu"),
    rac: rac("Menu"),
    code: '<MenuTrigger>\n  <Button variant="ghost" iconOnly aria-label="Workspace actions">\n    <Icon name="overflow" />\n  </Button>\n  <Popover><Menu onAction={handleAction}>\n    <MenuItem id="rename">Rename</MenuItem>\n  </Menu></Popover>\n</MenuTrigger>',
    props: [
      ["aria-label", "string", "Describe which item the actions affect."],
      ["placement", "RAC Placement", "Popover alignment."],
    ],
  },
  {
    slug: "popover",
    name: "Popover",
    category: "Overlays",
    description: "Contextual information with room for interaction.",
    anatomy:
      "An anchored, portalled cinder-popover surface with automatic positioning and dismissal. className, style, and ref target this same surface, which receives Theme's appearance class, layer, direction, and language. The default dialog moves and contains focus and makes outside content unavailable, unlike Carbon's trigger-retaining disclosure. Use Dialog inside for interactive content and a visible title or aria-label.",
    keyboard:
      "Trigger opens the dialog and moves focus inside. Tab stays within its controls. Escape closes and restores focus. RAC manages non-modal focus for selection popovers such as ComboBox.",
    carbon: carbon("popover"),
    rac: rac("Popover"),
    code: '<DialogTrigger>\n  <Button variant="tertiary">Display settings</Button>\n  <Popover><Dialog aria-label="Display settings">\n    <Switch>Show helper text</Switch>\n  </Dialog></Popover>\n</DialogTrigger>',
    props: [
      ["placement", "RAC Placement", "Preferred position relative to the trigger."],
      ["offset", "number", "Distance from trigger; defaults to 8 px."],
      ["isOpen / onOpenChange", "boolean / handler", "Controlled visibility."],
      [
        "className",
        "string | render function",
        "Extend the base and Theme appearance classes on the portalled surface.",
      ],
      ["style", "CSSProperties | render function", "Inline styles on the portalled surface."],
      ["ref", "Ref<HTMLElement>", "DOM ref to the same portalled surface."],
      [
        "lang",
        "string",
        "Override Theme's HTML language, including an empty string; locale and direction stay separate.",
      ],
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    description: "A short description when a label needs more context.",
    anatomy:
      "A compact inverse cinder-tooltip surface and arrow, connected to its trigger. className, style, and ref target the same portalled surface, which receives Theme's appearance class, layer, direction, and language. Tooltips contain descriptive text; use a Popover for interactive content.",
    keyboard:
      "Keyboard focus reveals the description. Escape dismisses it. The tooltip itself is not focusable.",
    carbon: carbon("tooltip"),
    rac: rac("Tooltip"),
    code: '<TooltipTrigger>\n  <Button variant="ghost" iconOnly aria-label="Settings">\n    <Icon name="settings" />\n  </Button>\n  <Tooltip>Manage workspace settings</Tooltip>\n</TooltipTrigger>',
    props: [
      ["placement", "RAC Placement", "Preferred tooltip position."],
      ["delay", "number (TooltipTrigger)", "Hover delay; focus is immediate."],
      [
        "className",
        "string | render function",
        "Extend the base and Theme appearance classes on the portalled surface.",
      ],
      ["style", "CSSProperties | render function", "Inline styles on the portalled surface."],
      ["ref", "Ref<HTMLDivElement>", "DOM ref to the same portalled surface."],
      [
        "lang",
        "string",
        "Override Theme's HTML language, including an empty string; locale and direction stay separate.",
      ],
    ],
  },
];

export const categories: ComponentCategory[] = [
  "Actions",
  "Inputs",
  "Selection",
  "Navigation",
  "Data display",
  "Feedback",
  "Overlays",
];
