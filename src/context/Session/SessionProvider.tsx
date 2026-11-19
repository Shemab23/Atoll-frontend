"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { SessionContext } from "@/context/Session/SessionContext";
import {
  parseSession,
  readRaw,
  removeSession,
  subscribeSession,
  writeSession,
  type AuthResult,
} from "@/lib/Session";

const WARNING_MS = 60_000; // warn this long before the token dies
const MAX_TIMEOUT = 2_147_483_647; // setTimeout overflows above this (~24.8 days)

// FIX: was named AppProvider
export function SessionProvider({ children }: { children: ReactNode }) {
  // undefined on the server / first render, then string | null on the client
  const raw = useSyncExternalStore(subscribeSession, readRaw, () => undefined);
  const isCheckingSession = raw === undefined;
  const session = useMemo(() => (raw ? parseSession(raw) : null), [raw]);

  const [warningOpen, setWarningOpen] = useState(false);

  const createSession = useCallback((auth: AuthResult) => {
    writeSession(auth);
    setWarningOpen(false);
  }, []);

  const clearSession = useCallback(() => {
    removeSession();
    setWarningOpen(false);
  }, []);

  // Two timeouts aimed at the token's real expiry: one opens the warning, one logs out.
  // visibilitychange/focus re-check on return, because browsers pause timers in sleeping tabs.
  useEffect(() => {
    if (!session) return;
    const { expiresAt } = session;

    const tick = () => {
      const left = expiresAt - Date.now();
      if (left <= 0) clearSession();
      else setWarningOpen(left <= WARNING_MS);
    };

    const delay = (ms: number) => Math.min(Math.max(ms, 0), MAX_TIMEOUT);
    const warnTimer = setTimeout(
      tick,
      delay(expiresAt - WARNING_MS - Date.now()),
    );
    const endTimer = setTimeout(tick, delay(expiresAt - Date.now()));
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);

    return () => {
      clearTimeout(warnTimer);
      clearTimeout(endTimer);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("focus", tick);
    };
  }, [session, clearSession]);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: !!session,
      isCheckingSession,
      isWarningOpen: warningOpen && !!session,
      createSession,
      clearSession,
    }),
    [session, isCheckingSession, warningOpen, createSession, clearSession],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
