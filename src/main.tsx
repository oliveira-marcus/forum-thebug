import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import AllRoutes from "./routes/AllRoutes.tsx";
import { SidebarProvider } from "./contexts/SidebarProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <SidebarProvider>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </SidebarProvider>
  </AuthProvider>
);
