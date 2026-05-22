"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { AuthSession, DashboardRole } from "@/types/auth";
import {
  getStoredSession,
  persistSession,
  clearSession,
  createMockSession,
  isSessionValid,
} from "@/lib/auth";

type AuthContextValue = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (role: DashboardRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredSession();
    if (stored && isSessionValid(stored)) {
      setSession(stored);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((role: DashboardRole) => {
    const existing = getStoredSession();
    if (existing && existing.dashboardRole === role && isSessionValid(existing)) {
      setSession(existing);
      return;
    }
    const newSession = createMockSession(role);
    persistSession(newSession);
    setSession(newSession);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: session !== null && isSessionValid(session),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
