import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, TOKEN_KEY } from "../api/http";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch (_error) {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const persistAuth = (payload) => {
    localStorage.setItem(TOKEN_KEY, payload.token);
    setUser(payload.user);
  };

  const login = async (values) => {
    const { data } = await api.post("/auth/login", values);
    persistAuth(data);
    return data;
  };

  const register = async (values) => {
    const { data } = await api.post("/auth/register", values);
    persistAuth(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      authLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
