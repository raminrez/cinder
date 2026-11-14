import { useState } from "react";
import { Button, ListBoxItem, Select, TextField, Theme } from "@hashti/react";
import type { Key } from "react-aria-components";
import { act, snapshot, useAgentSurface } from "@hashti/agent";

const REGIONS = [
  { value: "europe", label: "Europe" },
  { value: "north-america", label: "North America" },
  { value: "asia-pacific", label: "Asia Pacific" },
];

export default function App() {
  const [name, setName] = useState("Apollo");
  const [region, setRegion] = useState<Key>("europe");
  const [saved, setSaved] = useState<string | null>(null);
  const [page, setPage] = useState<string>("");

  useAgentSurface({
    component: "text-field",
    label: "Project name",
    value: name,
    actions: {
      setValue: ([value]) => setName(String(value)),
      clear: () => setName(""),
    },
  });

  useAgentSurface({
    component: "select",
    label: "Region",
    value: region,
    items: REGIONS,
    actions: {
      setValue: ([value]) => {
        setRegion(String(value));
        return String(value);
      },
    },
  });

  useAgentSurface({
    component: "button",
    label: "Save project",
    actions: {
      press: () => {
        setSaved(`${name} · ${region}`);
        return "saved";
      },
    },
    mark: { confirm: "Saves the project" },
  });

  return (
    <Theme className="playground">
      <h1>Agent contract</h1>

      <TextField label="Project name" value={name} onChange={setName} />

      <Select
        label="Region"
        selectedKey={region}
        onSelectionChange={(key) => setRegion(key ?? "europe")}
      >
        {REGIONS.map((item) => (
          <ListBoxItem key={item.value} id={item.value}>
            {item.label}
          </ListBoxItem>
        ))}
      </Select>

      <Button onPress={() => setSaved(`${name} · ${region}`)}>Save project</Button>

      {saved ? <p role="status">Saved {saved}</p> : null}

      <Button variant="secondary" onPress={() => setPage(JSON.stringify(snapshot(), null, 2))}>
        Read the page
      </Button>

      <Button
        variant="secondary"
        onPress={async () =>
          setPage(
            JSON.stringify(
              await act({
                steps: [{ ref: "Project name", action: "setValue", args: ["Atlas"] }],
              }),
              null,
              2,
            ),
          )
        }
      >
        Agent: set name to Atlas
      </Button>

      <Button
        variant="secondary"
        onPress={async () =>
          setPage(
            JSON.stringify(
              await act({ steps: [{ ref: "Save project", action: "press" }] }),
              null,
              2,
            ),
          )
        }
      >
        Agent: press Save
      </Button>

      {page ? <pre className="playground__page">{page}</pre> : null}
    </Theme>
  );
}