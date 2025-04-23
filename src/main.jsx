import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyle from "./GlobalStyle/index.jsx";
import { StoreProvider } from "./mobx/StoreContext.jsx";
import AppRoutes from "./routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <GlobalStyle />
      <AppRoutes />
    </StoreProvider>
  </StrictMode>
);
