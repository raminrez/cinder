import { createRoot } from "react-dom/client";
import { FrameConsumer } from "./frame";
import "./tailwind.generated.css";

createRoot(document.getElementById("root")!).render(<FrameConsumer integration="tailwind" />);
