import { createRoot } from "react-dom/client";
import { isThemeName } from "@hashti/tokens";
import { StatusConsumer } from "./status";
import "@hashti/react/styles.css";

const params = new URLSearchParams(location.search);
const theme = params.get("theme");
document.body.style.margin = "0";
createRoot(document.getElementById("root")!).render(
  <StatusConsumer
    theme={isThemeName(theme) ? theme : "frame-light"}
    locale={params.get("locale") ?? "en-US"}
  />,
);
