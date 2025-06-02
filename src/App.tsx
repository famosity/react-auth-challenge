import { BrowserRouter, useNavigate } from "react-router";
import React, { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

import { setAuthToken } from "./api/axiosInstance";
import { useAuth } from "./hook/useAuth";
import { SessionExpiredModal } from "./components/SessionExpiredModal";

const AuthSync: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, sessionExpired, setSessionExpired, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const handleSessionExpired = () => {
    logout();
    setSessionExpired(false);
    navigate("/login");
  };

  return (
    <>
      {sessionExpired && (
        <SessionExpiredModal
          onClose={handleSessionExpired}
          open={sessionExpired}
        />
      )}
      {children}
    </>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <AuthSync>
        <AppRoutes />
      </AuthSync>
    </BrowserRouter>
  </AuthProvider>
);

export default App;