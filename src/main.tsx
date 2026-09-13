import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/shell.css";
import "./styles/map.css";
import "./styles/metro.css";
import "./styles/library.css";
import "./styles/compare.css";
import "./styles/source.css";
import "./styles/about.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
