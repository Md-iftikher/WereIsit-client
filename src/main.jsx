import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./Router/AppRouter";
import AuthProvider from "./Provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);
