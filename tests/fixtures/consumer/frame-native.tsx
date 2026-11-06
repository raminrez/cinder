import { createRoot } from "react-dom/client";
import { FrameConsumer } from "./frame";
import "@cinder/react/styles.css";

createRoot(document.getElementById("root")!).render(<FrameConsumer integration="native" />);
