import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { parseDate } from "@internationalized/date";
import {
  Button,
  CodeSnippet,
  DatePicker,
  Dialog,
  DialogTrigger,
  Form,
  Heading,
  Layer,
  ListBoxItem,
  Modal,
  Select,
  Stack,
  TextField,
  Theme,
  type Key,
  type ThemeName,
} from "@cinder/react";
import { token, themes, typeStyles, type TypeStyleName } from "@cinder/tokens";
import tokenData from "@cinder/tokens/tokens.json";
import "@cinder/react/styles.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";

const theme: ThemeName = "g90";
const typeStyleName: TypeStyleName = "fluid-heading-05";

function App() {
  const action = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);
  const [region, setRegion] = useState<Key | null>("eu");
  const [saved, setSaved] = useState("");
  return (
    <Theme theme={theme} locale="en-US" style={{ minHeight: "100vh", padding: "2rem" }}>
      <main style={{ maxWidth: "40rem", color: token("text-primary") }}>
        <h1>Installed from tarballs</h1>
        <Stack gap={6}>
          <Button ref={action} onPress={() => setCount(count + 1)} aria-label="Activate counter">
            {({ isPressed }) => (isPressed ? "Pressed" : `Count: ${count}`)}
          </Button>
          <Button variant="ghost" onPress={() => action.current?.focus()}>
            Focus counter
          </Button>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(String(new FormData(event.currentTarget).get("email")));
            }}
          >
            <Stack>
              <TextField label="Email" name="email" type="email" isRequired />
              <Select label="Region" value={region} onChange={setRegion}>
                <ListBoxItem id="eu">Europe</ListBoxItem>
                <ListBoxItem id="us">United States</ListBoxItem>
              </Select>
              <DatePicker label="Start date" defaultValue={parseDate("2026-11-06")} />
              <Button type="submit">Save profile</Button>
            </Stack>
          </Form>
          <output aria-label="Saved profile">{saved || "Nothing saved"}</output>
          <output aria-label="Selected region">{region}</output>
          <Layer>
            <DialogTrigger>
              <Button>Open details</Button>
              <Modal>
                <Dialog>
                  <Heading slot="title">Package details</Heading>
                  <p>Theme and layer crossed the package boundary.</p>
                  <Button slot="close">Close details</Button>
                </Dialog>
              </Modal>
            </DialogTrigger>
          </Layer>
          <CodeSnippet label="Token exports">
            {JSON.stringify(
              {
                css: token("background"),
                js: themes[theme].background,
                json: tokenData.themes[theme].background,
                typeStyle: typeStyles[typeStyleName],
                jsonTypeStyle: tokenData.typeStyles[typeStyleName],
              },
              null,
              2,
            )}
          </CodeSnippet>
        </Stack>
      </main>
    </Theme>
  );
}

document.body.style.margin = "0";
createRoot(document.getElementById("root")!).render(<App />);
