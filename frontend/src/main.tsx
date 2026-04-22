import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Anwendung from "./Anwendung.tsx";
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Anwendung />
  </StrictMode>,
)
