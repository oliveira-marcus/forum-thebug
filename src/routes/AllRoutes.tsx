import Home from "./Home.tsx";
import FeedLayout from "../layouts/FeedLayout.tsx";
import Sports from "./Sports.tsx";
import Events from "./Events.tsx";
import Polls from "./Polls.tsx";
import Finances from "./Finances.tsx";
import PostPage from "./PostPage.tsx";
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import CreatePoll from "./CreatePoll.tsx";
import Submit from "./Submit.tsx";
import { Route, Routes, Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.tsx";
import type { JSX } from "react";
import UserPage from "./UserPage.tsx";
import SearchPost from "./SearchPost.tsx";

export default function AllRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" replace />;
  }

  function PublicRoute({ children }: { children: JSX.Element }) {
    const { token } = useAuth();
    return token ? <Navigate to="/" replace /> : children;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <FeedLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="posts/criar" element={<Submit />} />
        <Route path="enquetes" element={<Polls />} />
        <Route path="enquetes/criar" element={<CreatePoll />} />
        <Route path="financas" element={<Finances />} />
        <Route path="esportes" element={<Sports />} />
        <Route path="eventos" element={<Events />} />
        <Route path="posts/:postId" element={<PostPage />} />
        <Route path="users/:userId" element={<UserPage />}></Route>
        <Route path="search" element={<SearchPost />}></Route>
      </Route>
    </Routes>
  );
}
