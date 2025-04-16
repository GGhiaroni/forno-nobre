import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyle from "./GlobalStyle/index.jsx";
import AppRoutes from "./routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle />
    <AppRoutes />
  </StrictMode>
);
