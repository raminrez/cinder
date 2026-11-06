import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Column,
  Table,
  TableHeader,
  TableBody,
  Row,
  Cell,
  SearchField,
  Tag,
  Pagination,
  MenuTrigger,
  Popover,
  Menu,
  MenuItem,
  Icon,
  type Selection,
  type SortDescriptor,
} from "@cinder/react";

const workspaces = [
  { id: "atlas", name: "Atlas", owner: "Design", status: "Active", members: 8 },
  { id: "fieldnotes", name: "Fieldnotes", owner: "Product", status: "Active", members: 4 },
  { id: "meridian", name: "Meridian", owner: "Engineering", status: "In review", members: 12 },
  { id: "studio", name: "Studio", owner: "Design", status: "Active", members: 6 },
  { id: "workshop", name: "Workshop", owner: "Engineering", status: "Draft", members: 3 },
  { id: "sandbox", name: "Sandbox", owner: "Product", status: "Draft", members: 2 },
];

export function WorkspaceTable({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortDescriptor>({ column: "name", direction: "ascending" });
  const [selected, setSelected] = useState<Selection>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [action, setAction] = useState("");
  const items = useMemo(() => {
    const filtered = workspaces.filter((item) =>
      `${item.name} ${item.owner} ${item.status}`.toLowerCase().includes(query.toLowerCase()),
    );
    return filtered.sort((a, b) => {
      let result = 0;
      if (sort.column === "members") result = a.members - b.members;
      else if (sort.column === "owner") result = a.owner.localeCompare(b.owner);
      else result = a.name.localeCompare(b.name);
      return sort.direction === "descending" ? -result : result;
    });
  }, [query, sort]);
  const visible = compact ? items.slice(0, 3) : items.slice((page - 1) * pageSize, page * pageSize);
  const selectedCount = selected === "all" ? items.length : selected.size;
  return (
    <div className="workspace-table" data-ui>
      <div className="workspace-table-title">
        <div>
          <h3>Workspaces</h3>
          <p>Sample data for this interactive example</p>
        </div>
        <Tag color="gray">{items.length} workspaces</Tag>
      </div>
      {!compact && (
        <div className="workspace-table-toolbar">
          <SearchField
            aria-label="Search workspaces"
            placeholder="Search workspaces"
            size="md"
            value={query}
            onChange={(value) => {
              setQuery(value);
              setPage(1);
            }}
          />
          <MenuTrigger>
            <Button variant="ghost" size="md" iconOnly aria-label="Table actions">
              <Icon name="overflow" />
            </Button>
            <Popover>
              <Menu onAction={(key) => setAction(`Action selected: ${key}`)}>
                <MenuItem id="Export">Export selection</MenuItem>
                <MenuItem id="Archive">Archive selection</MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
        </div>
      )}
      {selectedCount > 0 && (
        <div className="table-selection" role="status">
          <span>{selectedCount} selected</span>
          <Button variant="ghost" size="sm" onPress={() => setSelected(new Set())}>
            Clear selection
          </Button>
        </div>
      )}
      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Workspace table, scroll horizontally on small screens"
      >
        <Table
          aria-label="Workspaces"
          size={compact ? "md" : "lg"}
          selectionMode={compact ? "none" : "multiple"}
          selectedKeys={selected}
          onSelectionChange={setSelected}
          sortDescriptor={sort}
          onSortChange={(value) => {
            setSort(value);
            setPage(1);
          }}
        >
          <TableHeader>
            {!compact && (
              <Column id="selection" aria-label="Selection">
                <Checkbox slot="selection" />
              </Column>
            )}
            <Column id="name" isRowHeader allowsSorting>
              Name
            </Column>
            {!compact && (
              <Column id="owner" allowsSorting>
                Team
              </Column>
            )}
            <Column id="status">Status</Column>
            <Column id="members" allowsSorting className="numeric-cell">
              Members
            </Column>
          </TableHeader>
          <TableBody items={visible} renderEmptyState={() => "No workspaces match your search."}>
            {(item) => (
              <Row id={item.id}>
                {!compact && (
                  <Cell>
                    <Checkbox slot="selection" />
                  </Cell>
                )}
                <Cell>{item.name}</Cell>
                {!compact && <Cell>{item.owner}</Cell>}
                <Cell>
                  <Tag
                    color={
                      item.status === "Active"
                        ? "green"
                        : item.status === "In review"
                          ? "blue"
                          : "gray"
                    }
                  >
                    {item.status}
                  </Tag>
                </Cell>
                <Cell className="react-aria-Cell numeric-cell">{item.members}</Cell>
              </Row>
            )}
          </TableBody>
        </Table>
      </div>
      {!compact && (
        <Pagination
          totalItems={items.length}
          page={page}
          pageSize={pageSize}
          pageSizes={[3, 6]}
          onPageChange={setPage}
          onPageSizeChange={(value) => {
            setPageSize(value);
            setPage(1);
          }}
        />
      )}
      {action && (
        <p role="status" className="demo-output">
          {action}
        </p>
      )}
    </div>
  );
}
