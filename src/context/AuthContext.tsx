import React, { createContext, useState, useEffect, useRef } from "react";
import { generateFakeToken } from "../utils/fakeToken";
import { SESSION_DURATION } from "../utils/constant";

type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  sessionExpired: boolean;
  setSessionExpired: (v: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );
  const [sessionExpired, setSessionExpired] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("token_timestamp", Date.now().toString());
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("token_timestamp");
    }
  }, [token]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (token) {
      const timestamp = localStorage.getItem("token_timestamp");
      if (timestamp) {
        const expiresIn =
          SESSION_DURATION - (Date.now() - parseInt(timestamp, 10));
        if (expiresIn <= 0) {
          handleSessionExpired();
        } else {
          timerRef.current = setTimeout(handleSessionExpired, expiresIn);
        }
      }
    }
  }, [token]);

  const handleSessionExpired = () => {
    setSessionExpired(true);
  };

  const login = async (email: string, password: string) => {
    console.info("Logging in with", email, password);
    const fakeToken = generateFakeToken();
    setToken(fakeToken);
    setSessionExpired(false);
  };

  const logout = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToken(null);
    setSessionExpired(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, sessionExpired, setSessionExpired }}
    >
      {children}
    </AuthContext.Provider>
  );
};