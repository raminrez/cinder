import { createRoot } from "react-dom/client";
import { isThemeName } from "@cinder/tokens";
import { StatusConsumer } from "./consumer/status";

const params = new URLSearchParams(location.search);
const theme = params.get("theme");
createRoot(document.getElementById("root")!).render(
  <StatusConsumer
    theme={isThemeName(theme) ? theme : "frame-light"}
    locale={params.get("locale") ?? "en-US"}
  />,
);
