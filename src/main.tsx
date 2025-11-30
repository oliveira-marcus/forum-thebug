import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/Home.tsx";
import FeedLayout from "./layouts/FeedLayout.tsx";
import Sports from "./routes/Sports.tsx";
import Events from "./routes/Events.tsx";
import Polls from "./routes/Polls.tsx";
import Finances from "./routes/Finances.tsx";
import PostPage from "./routes/PostPage.tsx";
import Login from "./routes/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<FeedLayout />}>
          <Route index element={<Home />} />
          <Route path="enquetes" element={<Polls />} />
          <Route path="financas" element={<Finances />} />
          <Route path="esportes" element={<Sports />} />
          <Route path="eventos" element={<Events />} />
          <Route path=":postId" element={<PostPage />} />
        </Route>

        <Route>
          <Route path="login" element={<Login />} />
          <Route path="register" />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
