import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import InterviewApp from "../app/page";
import "../app/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element was not found");
}

createRoot(root).render(
  <StrictMode>
    <InterviewApp />
  </StrictMode>,
);
