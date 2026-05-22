import type { AuthSession, DashboardRole } from "@/types/auth";

const STORAGE_KEY = "staysuite_session";
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Persist auth session to localStorage. Avoids repeated token
 * generation by storing the session once and reusing until expiry.
 */
export function persistSession(session: AuthSession): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Storage full or unavailable — degrade gracefully
  }
}

/**
 * Retrieve stored session. Returns null if expired or missing.
 */
export function getStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const session: AuthSession = JSON.parse(raw);
    const expiresAt = new Date(session.expiresAt).getTime();

    if (Date.now() >= expiresAt) {
      clearSession();
      return null;
    }

    return session;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

/**
 * Check if current session is still valid (not expired).
 */
export function isSessionValid(session: AuthSession | null): boolean {
  if (!session) return false;
  return Date.now() < new Date(session.expiresAt).getTime();
}

/**
 * Create a mock session for development. In production, this would
 * be replaced by the real auth API response.
 */
export function createMockSession(role: DashboardRole): AuthSession {
  const now = Date.now();
  return {
    userId: `user_${Math.random().toString(36).slice(2, 10)}`,
    email: "john.doe@example.com",
    dashboardRole: role,
    permissions: [],
    token: `tok_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`,
    expiresAt: new Date(now + TOKEN_EXPIRY_MS).toISOString(),
  };
}

/**
 * Get or create session — prevents unnecessary token regeneration.
 * Checks storage first; only generates new token if none exists or expired.
 */
export function getOrCreateSession(role: DashboardRole): AuthSession {
  const stored = getStoredSession();
  if (stored && stored.dashboardRole === role && isSessionValid(stored)) {
    return stored;
  }

  const session = createMockSession(role);
  persistSession(session);
  return session;
}
