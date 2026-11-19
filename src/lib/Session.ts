const KEY = "atoll_session";
const EVENT = "atoll-session-change";

// Essentials stored after login so no later call has to ask "who am I?".
// Need more (role, settings)? Add it here and in the API result.
export type SessionUser = {
  id: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
};

// What login / register / refresh return. Match this to your real API.
export type AuthResult = {
  token: string;
  expiresIn: number; // seconds until the token dies
  user: SessionUser;
};

// What is stored: expiry as a timestamp.
export type Session = {
  token: string;
  expiresAt: number; // ms since epoch
  user: SessionUser;
};

export const parseSession = (raw: string): Session | null => {
  try {
    const s = JSON.parse(raw);
    return s?.token && s?.expiresAt ? (s as Session) : null;
  } catch {
    return null;
  }
};

// Read-only (never writes during render). Returns the raw string so the value
// is stable between calls, which useSyncExternalStore needs.
export const readRaw = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    const s = raw ? parseSession(raw) : null;
    return s && s.expiresAt > Date.now() ? raw : null;
  } catch {
    return null;
  }
};

// For code outside React (your TanStack fetch function): readSession()?.token
export const readSession = (): Session | null => {
  const raw = readRaw();
  return raw ? parseSession(raw) : null;
};

const notify = () => window.dispatchEvent(new Event(EVENT));

export const writeSession = (auth: AuthResult) => {
  const session: Session = {
    token: auth.token,
    expiresAt: Date.now() + auth.expiresIn * 1000,
    user: auth.user,
  };
  localStorage.setItem(KEY, JSON.stringify(session));
  notify();
};

export const removeSession = () => {
  localStorage.removeItem(KEY);
  notify();
};

export const subscribeSession = (cb: () => void) => {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
};

// Only if your backend returns a bare JWT with no expiresIn: reads the `exp` claim.
export const jwtExpiresIn = (token: string): number => {
  const payload = JSON.parse(
    atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
  );
  return payload.exp - Math.floor(Date.now() / 1000);
};
