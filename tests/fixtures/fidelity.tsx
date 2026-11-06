import { createRoot } from "react-dom/client";
import { CalendarDate } from "@internationalized/date";
import { isThemeName } from "@cinder/tokens";
import {
  Accordion,
  AccordionItem,
  Button,
  Calendar,
  CodeSnippet,
  ContentSwitcher,
  Icon,
  InlineNotification,
  RangeCalendar,
  Slider,
  Stack,
  Switch,
  TextField,
  Theme,
  ToastProvider,
  ToggleButton,
  useToast,
  type ButtonVariant,
} from "@cinder/react";

const variants: ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "danger",
  "danger-tertiary",
  "danger-ghost",
];
const date = new CalendarDate(2026, 11, 12);

function ToastExample() {
  const toast = useToast();
  return (
    <Button
      onPress={() =>
        toast.add({
          title: "Visual contract toast",
          description: "Saved locally.",
          kind: "success",
        })
      }
    >
      Show contract toast
    </Button>
  );
}

function App() {
  const requested = new URLSearchParams(location.search).get("theme");
  const theme = isThemeName(requested) ? requested : "white";
  return (
    <Theme theme={theme} locale="en-US">
      <ToastProvider>
        <main style={{ padding: "2rem", maxWidth: "52rem" }}>
          <h1>Cinder visual contracts</h1>
          <Stack gap={7}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {variants.map((variant) => (
                <Button key={variant} variant={variant} aria-label={variant}>
                  <span>Action</span>
                  <Icon name="arrowRight" />
                </Button>
              ))}
              <Button variant="ghost" iconOnly aria-label="Icon ghost">
                <Icon name="plus" />
              </Button>
              <Button variant="ghost" isDisabled>
                Disabled ghost
              </Button>
            </div>
            {(["sm", "md", "lg"] as const).map((size) => (
              <section key={size} data-density={size}>
                <Accordion size={size} defaultExpandedKeys={["first"]}>
                  <AccordionItem id="first" title={`${size} first item`}>
                    Panel content
                  </AccordionItem>
                  <AccordionItem id="second" title={`${size} second item`}>
                    Other content
                  </AccordionItem>
                </Accordion>
                <ContentSwitcher
                  size={size}
                  aria-label={`${size} view`}
                  defaultSelectedKeys={["first"]}
                  style={{ width: "360px" }}
                >
                  <ToggleButton id="first">A</ToggleButton>
                  <ToggleButton id="second">A longer label</ToggleButton>
                  <ToggleButton id="third">Last</ToggleButton>
                </ContentSwitcher>
              </section>
            ))}
            <ToggleButton aria-label="Standalone toggle">Standalone</ToggleButton>
            {(["ltr", "rtl"] as const).map((direction) => (
              <Theme key={direction} theme={theme} locale={direction === "rtl" ? "ar-AE" : "en-US"}>
                {(["sm", "md"] as const).map((size) => (
                  <Switch key={size} size={size} data-fixture={`toggle-${size}-${direction}`}>
                    {size} {direction} toggle
                  </Switch>
                ))}
              </Theme>
            ))}
            <Slider label="Single geometry" defaultValue={50} />
            <Slider
              label="Range geometry"
              defaultValue={[25, 75]}
              thumbLabels={["Lower geometry", "Upper geometry"]}
            />
            <TextField label="Type label" description="Type helper" />
            <CodeSnippet label="Type specimen" copyable={false}>
              {"const cinder = true;"}
            </CodeSnippet>
            {(["info", "success", "warning", "error"] as const).map((kind) => (
              <section key={kind}>
                <InlineNotification kind={kind} title={`${kind} low`} onDismiss={() => {}} />
                <InlineNotification
                  kind={kind}
                  title={`${kind} inverse`}
                  lowContrast={false}
                  onDismiss={() => {}}
                />
              </section>
            ))}
            <ToastExample />
            <Calendar aria-label="Single contract date" defaultValue={date} />
            <RangeCalendar
              aria-label="Range contract dates"
              defaultValue={{ start: date, end: new CalendarDate(2026, 11, 16) }}
            />
          </Stack>
        </main>
      </ToastProvider>
    </Theme>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
