// Throwaway design comparison and working examples at /prototypes.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Cell,
  Checkbox,
  Column,
  Dialog,
  Form,
  Heading,
  Icon,
  ListBoxItem,
  Menu,
  MenuItem,
  MenuTrigger,
  Modal,
  NumberField,
  Popover,
  Row,
  SearchField,
  Select,
  Switch,
  Table,
  TableBody,
  TableHeader,
  Text,
  TextArea,
  TextField,
  Theme,
  paginationRange,
  type Key,
  type Selection,
  type SortDescriptor,
} from "@cinder/react";
import {
  directions,
  directionOrder,
  findReviews,
  initialSettings,
  reviewers,
  reviewStates,
  sampleReviews,
  type Direction,
  type Review,
  type Reviewer,
  type ReviewStatus,
  type StatusFilter,
  type WorkspaceSettings,
} from "./data";
import { ComparisonGuide } from "./comparison";

type View = "workspace" | "settings" | "guide";
type Route = { variant: Direction; view: View; mode: "light" | "dark" };
type LoadState = "ready" | "loading" | "error";
type SaveState = "idle" | "saving" | "saved" | "error";

function readRoute(): Route {
  const params = new URLSearchParams(window.location.search);
  const variant = params.get("variant");
  const view = params.get("view");
  return {
    variant: variant === "relay" || variant === "index" ? variant : "field",
    view: view === "settings" || view === "workspace" ? view : "guide",
    mode: params.get("mode") === "dark" ? "dark" : "light",
  };
}

function isReviewer(value: unknown): value is Reviewer {
  return typeof value === "string" && Object.hasOwn(reviewers, value);
}

function isReviewStatus(value: unknown): value is ReviewStatus {
  return typeof value === "string" && Object.hasOwn(reviewStates, value);
}

function Brand() {
  return (
    <span className="prototype-brand">
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M0 0h24v24H0z" />
        <path fill="var(--p-ground)" d="M6 6h12v4h-8v4h8v4H6z" />
      </svg>
      <span>Cinder</span>
    </span>
  );
}

function Person({ id }: { id: Reviewer }) {
  const person = reviewers[id];
  return (
    <span className="review-person">
      {person.initials ? (
        <span className="review-avatar" data-person={id} aria-hidden="true">
          {person.initials}
        </span>
      ) : null}
      <span>{person.name}</span>
    </span>
  );
}

function Status({ value }: { value: ReviewStatus }) {
  return (
    <span className="review-status" data-status={value}>
      {value === "ready" ? (
        <Icon name="check" />
      ) : (
        <span className="status-mark" aria-hidden="true" />
      )}
      {reviewStates[value]}
    </span>
  );
}

function ReviewerOptions() {
  return Object.entries(reviewers).map(([id, person]) => (
    <ListBoxItem id={id} key={id} textValue={person.name}>
      <Text slot="label">{person.name}</Text>
      <Text slot="description">{person.role}</Text>
    </ListBoxItem>
  ));
}

function StatusOptions() {
  return Object.entries(reviewStates).map(([id, label]) => (
    <ListBoxItem id={id} key={id} textValue={label}>
      {label}
    </ListBoxItem>
  ));
}

function Navigation({ route, onView }: { route: Route; onView: (view: View) => void }) {
  return (
    <nav className="prototype-navigation" aria-label="Sample workspace">
      <Button
        variant="ghost"
        aria-current={route.view === "workspace" ? "page" : undefined}
        onPress={() => onView("workspace")}
      >
        <Icon name="folder" />
        <span>Reviews</span>
      </Button>
      <Button
        variant="ghost"
        aria-current={route.view === "settings" ? "page" : undefined}
        onPress={() => onView("settings")}
      >
        <Icon name="settings" />
        <span>Settings</span>
      </Button>
      <Button
        variant="ghost"
        aria-current={route.view === "guide" ? "page" : undefined}
        onPress={() => onView("guide")}
      >
        <Icon name="info" />
        <span>Compare</span>
      </Button>
    </nav>
  );
}

function WorkspaceProgress({ reviews }: { reviews: Review[] }) {
  const ready = reviews.filter((review) => review.status === "ready").length;
  const waiting = reviews.filter((review) => review.status === "review").length;
  return (
    <div className="workspace-progress">
      <h2>Workspace totals</h2>
      <p>
        <strong>{ready}</strong> of {reviews.length} reviews are ready
      </p>
      <progress aria-label="Reviews ready" value={ready} max={reviews.length} />
      <span>{waiting} still need review.</span>
    </div>
  );
}

function Shell({
  route,
  onView,
  reviews,
  name,
  children,
}: {
  route: Route;
  onView: (view: View) => void;
  reviews: Review[];
  name: string;
  children: ReactNode;
}) {
  if (route.view === "guide") {
    return (
      <main id="main" className="comparison-main" tabIndex={-1}>
        {children}
      </main>
    );
  }
  const navigation = <Navigation route={route} onView={onView} />;
  if (route.variant === "relay") {
    return (
      <div className="relay-shell">
        <section className="relay-header" aria-label="Workspace overview">
          <Brand />
          {navigation}
          <span className="workspace-name">{name}</span>
        </section>
        <main id="main" className="relay-main" tabIndex={-1}>
          {children}
        </main>
      </div>
    );
  }
  if (route.variant === "index") {
    return (
      <div className="index-shell">
        <section className="index-header" aria-label="Workspace overview">
          <Brand />
          <span className="workspace-name">{name}</span>
          <span className="index-context">Component review register</span>
        </section>
        <div className="index-rail">{navigation}</div>
        <main id="main" className="index-main" tabIndex={-1}>
          {children}
        </main>
      </div>
    );
  }
  return (
    <div className="field-shell">
      <aside className="field-sidebar" aria-label="Workspace overview">
        <Brand />
        <div className="workspace-heading">
          <span>Sample workspace</span>
          <strong>{name}</strong>
        </div>
        {navigation}
        <WorkspaceProgress reviews={reviews} />
        <p className="sidebar-note">
          A review brings the component, its owner, and the next decision together.
        </p>
      </aside>
      <section className="field-mobile-header" aria-label="Workspace overview">
        <Brand />
        {navigation}
      </section>
      <main id="main" className="field-main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}

type WorkspaceProps = {
  reviews: Review[];
  visible: Review[];
  query: string;
  filter: StatusFilter;
  sort: SortDescriptor;
  selected: Set<Key>;
  range: ReturnType<typeof paginationRange>;
  loadState: LoadState;
  active: Review;
  detailOpen: boolean;
  onQuery: (value: string) => void;
  onFilter: (value: StatusFilter) => void;
  onSort: (value: SortDescriptor) => void;
  onSelect: (value: Selection) => void;
  onPage: (page: number) => void;
  onOpen: (review: Review) => void;
  onInspect: (review: Review) => void;
  onBack: () => void;
  onBulk: () => void;
  onClear: () => void;
  onRetry: () => void;
};

function Filters(props: WorkspaceProps) {
  return (
    <div className="review-filters">
      <SearchField
        aria-label="Search reviews"
        placeholder="Search reviews"
        value={props.query}
        onChange={props.onQuery}
        inputProps={{ "aria-label": "Search reviews" }}
      />
      <Select
        aria-label="Filter by status"
        value={props.filter}
        onChange={(value) => {
          if (value === "all" || isReviewStatus(value)) props.onFilter(value);
        }}
      >
        <ListBoxItem id="all">All statuses</ListBoxItem>
        <StatusOptions />
      </Select>
      <Select
        aria-label="Sort reviews"
        value={`${props.sort.column}-${props.sort.direction}`}
        onChange={(value) => {
          if (typeof value !== "string") return;
          props.onSort({
            column: value.startsWith("title-") ? "title" : "due",
            direction: value.endsWith("descending") ? "descending" : "ascending",
          });
        }}
      >
        <ListBoxItem id="due-ascending">Due soonest</ListBoxItem>
        <ListBoxItem id="due-descending">Due latest</ListBoxItem>
        <ListBoxItem id="title-ascending">Name A to Z</ListBoxItem>
        <ListBoxItem id="title-descending">Name Z to A</ListBoxItem>
      </Select>
    </div>
  );
}

function SelectionBar(props: WorkspaceProps) {
  return (
    <div className="review-selection" data-has-selection={props.selected.size > 0}>
      <span role="status">
        {props.selected.size > 0
          ? `${props.selected.size} selected on this page`
          : `${props.range.total} ${props.range.total === 1 ? "review" : "reviews"} in this view`}
      </span>
      {props.selected.size > 0 ? (
        <div>
          <Button variant="ghost" onPress={() => props.onSelect(new Set())}>
            Clear
          </Button>
          <Button variant="tertiary" onPress={props.onBulk}>
            Assign selected
          </Button>
        </div>
      ) : (
        <span className="selection-hint">Select reviews to assign them together</span>
      )}
    </div>
  );
}

function Paging({ range, onPage }: Pick<WorkspaceProps, "range" | "onPage">) {
  return (
    <nav className="review-paging" aria-label="Review pages">
      <span aria-live="polite">
        {range.start} to {range.end} of {range.total} reviews
      </span>
      <div>
        <Button
          variant="ghost"
          iconOnly
          aria-label="Previous page"
          isDisabled={range.page <= 1}
          onPress={() => onPage(range.page - 1)}
        >
          <Icon name="chevronLeft" />
        </Button>
        <span>
          Page {range.page} of {range.pages}
        </span>
        <Button
          variant="ghost"
          iconOnly
          aria-label="Next page"
          isDisabled={range.page >= range.pages}
          onPress={() => onPage(range.page + 1)}
        >
          <Icon name="chevronRight" />
        </Button>
      </div>
    </nav>
  );
}

function ReviewTable({ inspect = false, ...props }: WorkspaceProps & { inspect?: boolean }) {
  return (
    <Table
      className="prototype-table"
      aria-label="Component reviews"
      selectionMode="multiple"
      selectionBehavior="toggle"
      selectedKeys={props.selected}
      onSelectionChange={props.onSelect}
      sortDescriptor={props.sort}
      onSortChange={props.onSort}
    >
      <TableHeader>
        <Column id="selection" className="selection-column" aria-label="Select reviews">
          <Checkbox slot="selection" />
        </Column>
        <Column id="title" isRowHeader allowsSorting>
          Review
        </Column>
        <Column id="status">Status</Column>
        <Column id="reviewer">Reviewer</Column>
        <Column id="due" allowsSorting className="due-column">
          Due
        </Column>
        <Column id="action" className="action-column">
          Open
        </Column>
      </TableHeader>
      <TableBody items={props.visible}>
        {(review) => (
          <Row
            id={review.id}
            textValue={review.title}
            data-inspected={inspect && props.active.id === review.id}
          >
            <Cell>
              <Checkbox slot="selection" />
            </Cell>
            <Cell className="react-aria-Cell review-name-cell">
              <Button
                variant="ghost"
                onPress={() => (inspect ? props.onInspect(review) : props.onOpen(review))}
              >
                {review.title}
              </Button>
              <span className="review-subline">
                <code>{review.id}</code>
                <span>{review.area}</span>
              </span>
            </Cell>
            <Cell>
              <Status value={review.status} />
            </Cell>
            <Cell>
              <Person id={review.reviewer} />
            </Cell>
            <Cell className="react-aria-Cell due-cell">
              <time dateTime={review.due}>{review.due}</time>
            </Cell>
            <Cell>
              <Button
                variant="ghost"
                iconOnly
                aria-label={`${inspect ? "Inspect" : "Edit"} ${review.title}`}
                onPress={() => (inspect ? props.onInspect(review) : props.onOpen(review))}
              >
                <Icon name="arrowRight" />
              </Button>
            </Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
}

function ReviewList({ inspect = false, ...props }: WorkspaceProps & { inspect?: boolean }) {
  return (
    <ul className="prototype-review-list" aria-label="Component reviews">
      {props.visible.map((review) => (
        <li key={review.id} data-selected={props.selected.has(review.id)}>
          <Checkbox
            aria-label={`Select ${review.title}`}
            isSelected={props.selected.has(review.id)}
            onChange={(checked) => {
              const next = new Set(props.selected);
              if (checked) next.add(review.id);
              else next.delete(review.id);
              props.onSelect(next);
            }}
          />
          <div className="review-list-copy">
            <Button
              variant="ghost"
              onPress={() => (inspect ? props.onInspect(review) : props.onOpen(review))}
            >
              {review.title}
            </Button>
            <span className="review-subline">
              <code>{review.id}</code>
              <span>{review.area}</span>
            </span>
            <div className="review-list-meta">
              <Person id={review.reviewer} />
              <time dateTime={review.due}>Due {review.due}</time>
            </div>
          </div>
          <Status value={review.status} />
        </li>
      ))}
    </ul>
  );
}

function Records({
  asList = false,
  inspect = false,
  ...props
}: WorkspaceProps & { asList?: boolean; inspect?: boolean }) {
  if (props.loadState === "error") {
    return (
      <div className="review-empty" role="alert">
        <Icon name="error" size={24} />
        <h2>Reviews could not load</h2>
        <p>The sample connection failed. Your review changes are still here.</p>
        <Button variant="tertiary" onPress={props.onRetry}>
          Retry
        </Button>
      </div>
    );
  }
  if (props.loadState === "loading") {
    return (
      <div className="review-loading" role="status" aria-busy="true">
        <span>Loading the sample reviews...</span>
        {[0, 1, 2, 3].map((row) => (
          <div className="review-skeleton" key={row} aria-hidden="true" />
        ))}
      </div>
    );
  }
  if (props.visible.length === 0) {
    return (
      <div className="review-empty">
        <Icon name="search" size={24} />
        <h2>No matching reviews</h2>
        <p>Try another name or show all reviews.</p>
        <Button variant="tertiary" onPress={props.onClear}>
          Clear filters
        </Button>
      </div>
    );
  }
  return (
    <>
      {asList ? (
        <ReviewList {...props} />
      ) : (
        <>
          <div className="desktop-records">
            <ReviewTable {...props} inspect={inspect} />
          </div>
          <div className="mobile-records">
            <ReviewList {...props} inspect={inspect} />
          </div>
        </>
      )}
      <Paging range={props.range} onPage={props.onPage} />
    </>
  );
}

function NextReview({ props, large = false }: { props: WorkspaceProps; large?: boolean }) {
  const next = findReviews(props.reviews, "", "review", {
    column: "due",
    direction: "ascending",
  })[0];
  return (
    <section className={large ? "next-review next-review-large" : "next-review"}>
      <div className="next-review-heading">
        <h2>Next review</h2>
        {next ? <code>{next.id}</code> : null}
      </div>
      {next ? (
        <>
          <h3>{next.title}</h3>
          <p>{next.note}</p>
          <Person id={next.reviewer} />
          <Button onPress={() => props.onOpen(next)}>
            Review this check <Icon name="arrowRight" />
          </Button>
        </>
      ) : (
        <p>Every review has moved forward. Open a record to make another change.</p>
      )}
    </section>
  );
}

function FieldWorkspace(props: WorkspaceProps) {
  const waiting = props.reviews.filter((review) => review.status === "review");
  return (
    <>
      <header className="workspace-title">
        <div>
          <h1>Component reviews</h1>
          <p>{waiting.length} checks need review before the next handoff.</p>
        </div>
        <Button isDisabled={!waiting.length} onPress={() => waiting[0] && props.onOpen(waiting[0])}>
          Review next <Icon name="arrowRight" />
        </Button>
      </header>
      <section className="field-register" aria-label="Review queue">
        <Filters {...props} />
        <SelectionBar {...props} />
        <Records {...props} />
      </section>
      <section className="field-handoff">
        <div>
          <h2>What makes a check ready?</h2>
          <p>Confirm the appearance, keyboard behavior, and recovery message before the handoff.</p>
        </div>
        <div className="handoff-criteria">
          <span>
            <Icon name="check" /> Clear labels
          </span>
          <span>
            <Icon name="check" /> Visible focus
          </span>
          <span>
            <Icon name="check" /> Useful errors
          </span>
        </div>
      </section>
    </>
  );
}

function RelayWorkspace(props: WorkspaceProps) {
  const waiting = props.reviews.filter((review) => review.status === "review").length;
  return (
    <>
      <header className="workspace-title">
        <div>
          <h1>Component reviews</h1>
          <p>{waiting} checks need a decision. Start with the next review.</p>
        </div>
      </header>
      <div className="relay-workspace">
        <div className="relay-next-column">
          <NextReview props={props} large />
          <WorkspaceProgress reviews={props.reviews} />
        </div>
        <section className="relay-queue" aria-labelledby="relay-queue-title">
          <div className="queue-heading">
            <h2 id="relay-queue-title">Review queue</h2>
            <span>{props.reviews.length} total</span>
          </div>
          <Filters {...props} />
          <SelectionBar {...props} />
          <Records {...props} asList />
        </section>
      </div>
    </>
  );
}

function ReviewDetail({
  review,
  onOpen,
  onBack,
  backRef,
}: {
  review: Review;
  onOpen: () => void;
  onBack: () => void;
  backRef: Ref<HTMLButtonElement>;
}) {
  return (
    <aside className="index-detail" aria-label="Selected review">
      <Button ref={backRef} className="detail-back" variant="ghost" onPress={onBack}>
        <Icon name="chevronLeft" />
        Back to reviews
      </Button>
      <div className="detail-heading">
        <h2>Selected review</h2>
        <code>{review.id}</code>
      </div>
      <h3>{review.title}</h3>
      <Status value={review.status} />
      <dl>
        <div>
          <dt>Reviewer</dt>
          <dd>
            <Person id={review.reviewer} />
          </dd>
        </div>
        <div>
          <dt>Area</dt>
          <dd>{review.area}</dd>
        </div>
        <div>
          <dt>Due date</dt>
          <dd>
            <time dateTime={review.due}>{review.due}</time>
          </dd>
        </div>
      </dl>
      <h4>Review note</h4>
      <p>{review.note || "No note has been added."}</p>
      <Button onPress={onOpen}>
        Edit this review <Icon name="arrowRight" />
      </Button>
      <p className="detail-instruction">Choose a name in the table to inspect another review.</p>
    </aside>
  );
}

function IndexWorkspace(props: WorkspaceProps) {
  const backButton = useRef<HTMLButtonElement>(null);
  const inspectButton = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    if (props.detailOpen && backButton.current?.getClientRects().length) backButton.current.focus();
  }, [props.detailOpen]);
  const ready = props.reviews.filter((review) => review.status === "ready").length;
  const waiting = props.reviews.filter((review) => review.status === "review").length;
  return (
    <>
      <header className="workspace-title">
        <div>
          <h1>Component reviews</h1>
          <p>Inspect a record, then update the reviewer or its state.</p>
        </div>
        <dl className="index-counts">
          <div>
            <dt>Need review</dt>
            <dd>{waiting}</dd>
          </div>
          <div>
            <dt>Ready</dt>
            <dd>
              {ready} / {props.reviews.length}
            </dd>
          </div>
        </dl>
      </header>
      <div className="index-workspace" data-detail-open={props.detailOpen}>
        <section className="index-register" aria-label="Review register">
          <Filters {...props} />
          <SelectionBar {...props} />
          <Records
            {...props}
            inspect
            onInspect={(review) => {
              inspectButton.current =
                document.activeElement instanceof HTMLElement ? document.activeElement : null;
              props.onInspect(review);
            }}
          />
        </section>
        <ReviewDetail
          review={props.active}
          backRef={backButton}
          onOpen={() => props.onOpen(props.active)}
          onBack={() => {
            props.onBack();
            requestAnimationFrame(() => inspectButton.current?.focus());
          }}
        />
      </div>
    </>
  );
}

function Settings({
  settings,
  saved,
  saveState,
  failNextSave,
  reviews,
  onChange,
  onSave,
}: {
  settings: WorkspaceSettings;
  saved: WorkspaceSettings;
  saveState: SaveState;
  failNextSave: boolean;
  reviews: Review[];
  onChange: (value: WorkspaceSettings) => void;
  onSave: () => void;
}) {
  const ready = reviews.filter((review) => review.status === "ready").length;
  const dirty = JSON.stringify(settings) !== JSON.stringify(saved);
  const saving = saveState === "saving";
  return (
    <>
      <header className="workspace-title">
        <div>
          <h1>Workspace settings</h1>
          <p>Choose where review updates go and how much work each person can take.</p>
        </div>
      </header>
      {failNextSave ? (
        <p className="prototype-state-note" role="status">
          The next save will fail once. Your entries will stay in the form.
        </p>
      ) : null}
      <div className="settings-layout">
        <Form
          className="workspace-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSave();
          }}
        >
          <fieldset disabled={saving}>
            <legend className="visually-hidden">Workspace settings</legend>
            <section className="settings-section">
              <div className="settings-section-copy">
                <h2>Workspace details</h2>
                <p>Use a name the team recognizes and an address that can receive replies.</p>
              </div>
              <div className="settings-fields">
                <TextField
                  label="Workspace name"
                  name="workspaceName"
                  value={settings.name}
                  onChange={(name) => onChange({ ...settings, name })}
                  isRequired
                  minLength={2}
                  maxLength={60}
                  isDisabled={saving}
                  validate={(value) =>
                    value.trim().length < 2 ? "Enter a name with at least 2 characters." : null
                  }
                  description="This name appears in review invitations."
                  errorMessage="Enter a name with 2 to 60 characters."
                />
                <TextField
                  label="Reply-to email"
                  name="replyTo"
                  type="email"
                  value={settings.email}
                  onChange={(email) => onChange({ ...settings, email })}
                  isRequired
                  isDisabled={saving}
                  description="Replies to review summaries go to this address."
                  errorMessage="Enter an email address, such as reviews@cinder.example."
                />
                <TextField
                  label="Workspace ID"
                  value="cinder-studio-demo"
                  isReadOnly
                  description="This identifier stays fixed when you rename the workspace."
                />
              </div>
            </section>
            <section className="settings-section">
              <div className="settings-section-copy">
                <h2>Review defaults</h2>
                <p>
                  Set the starting reviewer and the number of checks each person can take in a day.
                </p>
              </div>
              <div className="settings-fields settings-fields-pair">
                <Select
                  label="Default reviewer"
                  value={settings.reviewer}
                  onChange={(reviewer) => {
                    if (isReviewer(reviewer)) onChange({ ...settings, reviewer });
                  }}
                  isDisabled={saving}
                  description="Applies to new review assignments."
                >
                  <ReviewerOptions />
                </Select>
                <NumberField
                  label="Daily review limit"
                  name="reviewLimit"
                  value={settings.limit}
                  onChange={(limit) => onChange({ ...settings, limit })}
                  minValue={1}
                  maxValue={24}
                  isRequired
                  isDisabled={saving}
                  description="Allow 1 to 24 reviews per person."
                  errorMessage="Enter a number from 1 to 24."
                />
              </div>
            </section>
            <section className="settings-section">
              <div className="settings-section-copy">
                <h2>Review summary</h2>
                <p>Send one daily email with the checks that still need attention.</p>
              </div>
              <div className="settings-fields">
                <Switch
                  isSelected={settings.digest}
                  onChange={(digest) => onChange({ ...settings, digest })}
                  isDisabled={saving}
                >
                  Send a daily review summary
                </Switch>
                <Checkbox
                  isSelected={settings.completed}
                  onChange={(completed) => onChange({ ...settings, completed })}
                  isDisabled={saving || !settings.digest}
                >
                  Include reviews that are already ready
                </Checkbox>
                {!settings.digest ? (
                  <p className="field-explanation">
                    Turn on the daily summary to include completed reviews.
                  </p>
                ) : null}
              </div>
            </section>
          </fieldset>
          {saveState === "error" ? (
            <div className="save-feedback save-error" role="alert">
              <Icon name="error" />
              <div>
                <strong>Changes could not be saved.</strong>
                <p>
                  The sample service was unavailable. Your entries are still here. Try saving again.
                </p>
              </div>
            </div>
          ) : null}
          <div className="settings-save">
            <span role="status">
              {saveState === "saved"
                ? "Changes saved in this demo."
                : saving
                  ? "Saving your changes..."
                  : dirty
                    ? "You have unsaved changes."
                    : "No unsaved changes."}
            </span>
            <Button type="submit" isPending={saving} isDisabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </Form>
        <aside className="summary-preview" aria-labelledby="summary-preview-title">
          <h2 id="summary-preview-title">Summary preview</h2>
          {settings.digest ? (
            <>
              <div className="summary-message">
                <span>Daily review summary</span>
                <h3>{settings.name.trim() || "Your workspace"}</h3>
                <p>{reviews.length - ready} reviews are still open.</p>
                {settings.completed ? <p>{ready} reviews are ready for handoff.</p> : null}
                <span className="summary-limit">
                  Up to {Number.isFinite(settings.limit) ? settings.limit : 0} reviews per person
                  each day
                </span>
              </div>
              <dl>
                <div>
                  <dt>Replies go to</dt>
                  <dd>{settings.email || "Add a reply-to email"}</dd>
                </div>
                <div>
                  <dt>Default reviewer</dt>
                  <dd>
                    <Person id={settings.reviewer} />
                  </dd>
                </div>
              </dl>
            </>
          ) : (
            <p>The daily summary is off. Review assignments remain available in the workspace.</p>
          )}
          <p className="preview-note">This preview uses the values in the form.</p>
        </aside>
      </div>
    </>
  );
}

type ReviewDraft = { ids: string[]; reviewer: Reviewer; status: ReviewStatus; note: string };

function EditReview({
  draft,
  reviews,
  onChange,
  onClose,
  onSave,
}: {
  draft: ReviewDraft;
  reviews: Review[];
  onChange: (value: ReviewDraft) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const single = draft.ids.length === 1;
  const review = single ? reviews.find((item) => item.id === draft.ids[0]) : undefined;
  return (
    <Modal
      isOpen
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      isDismissable
      size="sm"
      className="review-modal"
    >
      <Dialog>
        <Heading slot="title">
          {single ? "Edit review" : `Assign ${draft.ids.length} reviews`}
        </Heading>
        <Button slot="close" variant="ghost" iconOnly aria-label="Close review">
          <Icon name="close" />
        </Button>
        <p className="review-modal-context">
          {review
            ? `${review.id} · ${review.title}`
            : "Apply the same reviewer and status to the selected reviews."}
        </p>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            onSave();
          }}
        >
          <Select
            autoFocus
            label="Reviewer"
            value={draft.reviewer}
            onChange={(reviewer) => {
              if (isReviewer(reviewer)) onChange({ ...draft, reviewer });
            }}
            description="Open this dropdown to compare a popup inside a dialog."
          >
            <ReviewerOptions />
          </Select>
          <Select
            label="Review status"
            value={draft.status}
            onChange={(status) => {
              if (isReviewStatus(status)) onChange({ ...draft, status });
            }}
          >
            <StatusOptions />
          </Select>
          {single ? (
            <TextArea
              label="Review note"
              value={draft.note}
              onChange={(note) => onChange({ ...draft, note })}
              rows={3}
            />
          ) : null}
          <p className="modal-sample-note">Changes apply to this sample workspace.</p>
          <div className="review-modal-footer">
            <Button variant="tertiary" onPress={onClose}>
              Cancel
            </Button>
            <Button type="submit">{single ? "Save review" : "Apply assignment"}</Button>
          </div>
        </Form>
      </Dialog>
    </Modal>
  );
}

function PrototypeSwitcher({
  route,
  onRoute,
}: {
  route: Route;
  onRoute: (value: Partial<Route>) => void;
}) {
  function cycle(step: number) {
    const index = directionOrder.indexOf(route.variant);
    const variant = directionOrder[(index + step + directionOrder.length) % directionOrder.length];
    if (variant) onRoute({ variant });
  }
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      // Arrow keys belong to text editing, collections, and open overlays before the comparison bar.
      if (
        event.target instanceof Element &&
        event.target.closest(
          "input, textarea, select, [contenteditable], [role='dialog'], [role='grid'], [role='tablist'], [role='listbox'], [role='menu'], [role='combobox'], [role='slider']",
        )
      )
        return;
      event.preventDefault();
      cycle(event.key === "ArrowLeft" ? -1 : 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });
  return (
    <nav className="prototype-switcher" aria-label="Compare design directions">
      <Button variant="ghost" iconOnly aria-label="Previous design" onPress={() => cycle(-1)}>
        <Icon name="chevronLeft" size={20} />
      </Button>
      <div className="switcher-description" aria-live="polite" aria-atomic="true">
        <span>
          <strong>{directions[route.variant].name}</strong>
          <span>
            {directionOrder.indexOf(route.variant) + 1} of {directionOrder.length}
          </span>
        </span>
        <small>{directions[route.variant].geometry}</small>
      </div>
      <Button variant="ghost" iconOnly aria-label="Next design" onPress={() => cycle(1)}>
        <Icon name="chevronRight" size={20} />
      </Button>
      <Button
        className="switcher-guide"
        variant="ghost"
        onPress={() => onRoute({ view: route.view === "guide" ? "workspace" : "guide" })}
      >
        {route.view === "guide" ? "Reviews" : "Compare"}
      </Button>
    </nav>
  );
}

function Demo({
  route,
  onRoute,
  onReset,
}: {
  route: Route;
  onRoute: (value: Partial<Route>) => void;
  onReset: () => void;
}) {
  const [reviews, setReviews] = useState(sampleReviews);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortDescriptor>({ column: "due", direction: "ascending" });
  const [selected, setSelected] = useState<Set<Key>>(new Set());
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState("CDR-101");
  const [detailOpen, setDetailOpen] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>("ready");
  const [settings, setSettings] = useState(initialSettings);
  const [savedSettings, setSavedSettings] = useState(initialSettings);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [failNextSave, setFailNextSave] = useState(false);
  const [draft, setDraft] = useState<ReviewDraft | null>(null);
  const [notice, setNotice] = useState("");
  const previousView = useRef(route.view);

  useLayoutEffect(() => {
    if (previousView.current !== route.view) {
      document.getElementById("main")?.focus({ preventScroll: true });
      previousView.current = route.view;
    }
  }, [route.view]);

  useEffect(() => {
    if (loadState !== "loading") return;
    const timer = window.setTimeout(() => setLoadState("ready"), 650);
    return () => window.clearTimeout(timer);
  }, [loadState]);

  useEffect(() => {
    if (saveState !== "saving") return;
    const timer = window.setTimeout(() => {
      if (failNextSave) {
        setSaveState("error");
        setFailNextSave(false);
      } else {
        setSavedSettings(settings);
        setSaveState("saved");
      }
    }, 750);
    return () => window.clearTimeout(timer);
  }, [saveState, failNextSave, settings]);

  const filtered = findReviews(reviews, query, filter, sort);
  const range = paginationRange(filtered.length, 6, page);
  const visible = filtered.slice((range.page - 1) * range.pageSize, range.page * range.pageSize);
  const active = reviews.find((review) => review.id === activeId) ?? reviews[0];
  if (!active) throw new Error("The sample review workspace must contain a review.");

  function resetPage() {
    setPage(1);
    setSelected(new Set());
    setDetailOpen(false);
  }

  function openReview(review: Review) {
    setDraft({
      ids: [review.id],
      reviewer: review.reviewer,
      status: review.status,
      note: review.note,
    });
  }

  function saveReview() {
    if (!draft) return;
    const single = draft.ids.length === 1;
    setReviews((current) =>
      current.map((review) =>
        draft.ids.includes(review.id)
          ? {
              ...review,
              reviewer: draft.reviewer,
              status: draft.status,
              note: single ? draft.note : review.note,
            }
          : review,
      ),
    );
    setNotice(
      `${single ? "Review" : `${draft.ids.length} reviews`} saved. Reviewer set to ${reviewers[draft.reviewer].name}.`,
    );
    setSelected(new Set());
    setDraft(null);
  }

  const workspace: WorkspaceProps = {
    reviews,
    visible,
    query,
    filter,
    sort,
    selected,
    range,
    loadState,
    active,
    detailOpen,
    onQuery: (value) => {
      setQuery(value);
      resetPage();
    },
    onFilter: (value) => {
      setFilter(value);
      resetPage();
    },
    onSort: (value) => {
      setSort(value);
      resetPage();
    },
    onSelect: (value) =>
      setSelected(value === "all" ? new Set(visible.map((review) => review.id)) : new Set(value)),
    onPage: (value) => {
      setPage(value);
      setSelected(new Set());
      setDetailOpen(false);
    },
    onOpen: openReview,
    onInspect: (review) => {
      setActiveId(review.id);
      setDetailOpen(true);
    },
    onBack: () => setDetailOpen(false),
    onBulk: () =>
      setDraft({
        ids: reviews.filter((review) => selected.has(review.id)).map((review) => review.id),
        reviewer: savedSettings.reviewer,
        status: "progress",
        note: "",
      }),
    onClear: () => {
      setQuery("");
      setFilter("all");
      resetPage();
    },
    onRetry: () => setLoadState("loading"),
  };

  function tryState(key: Key) {
    resetPage();
    setNotice("");
    if (key === "save-error") {
      setFailNextSave(true);
      setSaveState("idle");
      onRoute({ view: "settings" });
    } else {
      setQuery(key === "empty" ? "No matching review" : "");
      setFilter("all");
      setLoadState(key === "load-error" ? "error" : key === "loading" ? "loading" : "ready");
      onRoute({ view: "workspace" });
    }
  }

  return (
    <Theme
      theme={route.mode === "dark" ? "g100" : "white"}
      locale="en-US"
      className="prototype-app"
    >
      <a className="prototype-skip" href="#main">
        {route.view === "guide" ? "Skip to comparisons" : "Skip to workspace"}
      </a>
      <header className="study-header">
        <div>
          <strong>Cinder prototypes</strong>
          <span className="study-note">
            {route.view === "guide"
              ? "Design proposals and published references"
              : "Sample data. Changes last until reload."}
          </span>
        </div>
        <div className="study-actions">
          {route.view === "guide" ? (
            <Button variant="ghost" onPress={() => onRoute({ view: "workspace" })}>
              Open workspace
              <Icon name="arrowRight" />
            </Button>
          ) : (
            <>
              <MenuTrigger>
                <Button
                  variant="ghost"
                  isDisabled={saveState === "saving"}
                  aria-label="Try a prototype state"
                >
                  Try a state
                  <Icon name="chevronDown" />
                </Button>
                <Popover placement="bottom end">
                  <Menu aria-label="Prototype states" onAction={tryState}>
                    <MenuItem id="empty">Empty results</MenuItem>
                    <MenuItem id="loading">Loading reviews</MenuItem>
                    <MenuItem id="load-error">Failed load</MenuItem>
                    <MenuItem id="save-error">Failed save</MenuItem>
                  </Menu>
                </Popover>
              </MenuTrigger>
              <Button variant="ghost" onPress={onReset}>
                Reset demo
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            iconOnly
            aria-label={`Switch to ${route.mode === "light" ? "dark" : "light"} mode`}
            onPress={() => onRoute({ mode: route.mode === "light" ? "dark" : "light" })}
          >
            <Icon name={route.mode === "light" ? "moon" : "sun"} size={20} />
          </Button>
        </div>
      </header>
      <Shell
        route={route}
        onView={(view) => onRoute({ view })}
        reviews={reviews}
        name={savedSettings.name}
      >
        {notice ? (
          <div className="review-notice" role="status">
            <Icon name="check" />
            <span>{notice}</span>
            <Button
              variant="ghost"
              iconOnly
              aria-label="Dismiss confirmation"
              onPress={() => setNotice("")}
            >
              <Icon name="close" />
            </Button>
          </div>
        ) : null}
        {route.view === "guide" ? (
          <ComparisonGuide
            mode={route.mode}
            onTry={(variant, example) => {
              if (example === "dialog") {
                onRoute({ variant });
                openReview(active);
              } else {
                onRoute({ variant, view: example === "form" ? "settings" : "workspace" });
              }
            }}
          />
        ) : route.view === "settings" ? (
          <Settings
            settings={settings}
            saved={savedSettings}
            saveState={saveState}
            failNextSave={failNextSave}
            reviews={reviews}
            onChange={(value) => {
              setSettings(value);
              setSaveState("idle");
            }}
            onSave={() => setSaveState("saving")}
          />
        ) : route.variant === "relay" ? (
          <RelayWorkspace {...workspace} />
        ) : route.variant === "index" ? (
          <IndexWorkspace {...workspace} />
        ) : (
          <FieldWorkspace {...workspace} />
        )}
      </Shell>
      {draft ? (
        <EditReview
          draft={draft}
          reviews={reviews}
          onChange={setDraft}
          onClose={() => setDraft(null)}
          onSave={saveReview}
        />
      ) : null}
      {process.env.NODE_ENV !== "production" && route.view !== "guide" ? (
        <PrototypeSwitcher route={route} onRoute={onRoute} />
      ) : null}
    </Theme>
  );
}

function App() {
  const [route, setRoute] = useState(readRoute);
  const [reset, setReset] = useState(0);
  useLayoutEffect(() => {
    document.documentElement.dataset.prototype = route.variant;
    document.documentElement.dataset.mode = route.mode;
    document.documentElement.style.colorScheme = route.mode;
    document.title = `Cinder prototypes | ${route.view === "guide" ? "Compare the designs" : directions[route.variant].name}`;
  }, [route.variant, route.mode, route.view]);
  useEffect(() => {
    const onPopState = () => setRoute(readRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function navigate(update: Partial<Route>) {
    const next = { ...route, ...update };
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(next)) url.searchParams.set(key, value);
    window.history.pushState(null, "", url);
    setRoute(next);
    if (next.view !== route.view) window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <Demo
      key={reset}
      route={route}
      onRoute={navigate}
      onReset={() => setReset((value) => value + 1)}
    />
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("The Cinder prototype root is missing.");
const root = (import.meta.hot.data.root ??= createRoot(rootElement));
root.render(<App />);
