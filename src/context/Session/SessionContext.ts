"use client";

import { createContext, useContext } from "react";
import type { AuthResult, Session } from "@/lib/Session";

// CORRECTION: removed `sessionData` (a raw string every consumer had to JSON.parse),
// `setSessionData`, `sessionManager` and `resetSessionTimer`.
// resetSessionTimer was misleading: it restarted a client-side timer but could not extend
// the real token. Extending a session = call your refresh endpoint, then createSession(result).
export interface SessionContextType {
  session: Session | null; // parsed; session?.user.id, session?.token
  isAuthenticated: boolean;
  isCheckingSession: boolean; // true only for the first client render
  isWarningOpen: boolean; // true during the last minute
  createSession: (auth: AuthResult) => void; // login, register AND refresh
  clearSession: () => void; // logout
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used inside a SessionProvider");
  }
  return context;
}
