import { useState } from "react";
import { Button, Checkbox, ListBoxItem, Select, TextField, Theme } from "@hashti/react";
import type { Key } from "react-aria-components";
import { act, snapshot } from "@hashti/agent";

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
  const [refuseAgents, setRefuseAgents] = useState(false);

  const refuses = (details: { source: string; cancel: () => void }) => {
    if (refuseAgents && details.source === "agent") {
      details.cancel();
      return true;
    }
    return false;
  };

  return (
    <Theme className="playground">
      <h1>Agent contract</h1>

      <TextField
        label="Project name"
        value={name}
        onChange={(value, details) => {
          if (refuses(details)) return;
          setName(value);
        }}
      />

      <Select
        label="Region"
        selectedKey={region}
        onSelectionChange={(key, details) => {
          if (refuses(details)) return;
          setRegion(key ?? "europe");
        }}
      >
        {REGIONS.map((item) => (
          <ListBoxItem key={item.value} id={item.value}>
            {item.label}
          </ListBoxItem>
        ))}
      </Select>

      <Checkbox isSelected={refuseAgents} onChange={setRefuseAgents}>
        Refuse agent edits
      </Checkbox>

      <Button agentConfirm="Saves the project" onPress={() => setSaved(`${name} · ${region}`)}>
        Save project
      </Button>

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
              await act({
                steps: [{ ref: "Region", action: "setValue", args: ["asia-pacific"] }],
              }),
              null,
              2,
            ),
          )
        }
      >
        Agent: choose Asia Pacific
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