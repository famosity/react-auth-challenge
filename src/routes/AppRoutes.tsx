import { Navigate, Route, Routes } from "react-router";

import ErrorPage from "../pages/NotFount";
import Login from "../pages/Login";
import React from "react";
import { useAuth } from "../hook/useAuth";
import ErrorPhoto from "@/pages/ErrorPhoto";
import Home from "@/pages/Home";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  return !token ? <>{children}</> : <Navigate to="/home" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path="/home"
      element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      }
    />
    <Route
      path="/error"
      element={
        <PrivateRoute>
          <ErrorPhoto/>
        </PrivateRoute>
      }
    />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default AppRoutes;