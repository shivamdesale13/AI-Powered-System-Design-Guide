import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../lib/storage";
import type { User } from "../types";

type AuthState = {
  token: string | null;
  user: User | null;
  login: (payload: { token: string; user: User }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => storage.getToken());
  const [user, setUser] = useState<User | null>(() => storage.getUser() as User | null);

  useEffect(() => {
    const handleStorage = () => {
      setToken(storage.getToken());
      setUser(storage.getUser() as User | null);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      token,
      user,
      login: ({ token: nextToken, user: nextUser }) => {
        storage.setToken(nextToken);
        storage.setUser(nextUser);
        setToken(nextToken);
        setUser(nextUser);
        navigate("/app", { replace: true });
      },
      logout: () => {
        storage.clearToken();
        storage.clearUser();
        setToken(null);
        setUser(null);
        navigate("/", { replace: true });
      }
    }),
    [navigate, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
};
