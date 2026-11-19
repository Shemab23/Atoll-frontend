"use client";

import {
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { AppContext } from "./AppContext";
import { readTheme, subscribeTheme, writeTheme, type Theme } from "@/lib/theme";

const emptySubscribe = () => () => {};

export function AppProvider({ children }: { children: ReactNode }) {
  // false on the server and first render, true after
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const theme = useSyncExternalStore<Theme>(
    subscribeTheme,
    readTheme,
    () => "light",
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  // writeTheme is a stable module-level function, so no useCallback needed
  const value = useMemo(
    () => ({ mounted, theme, setTheme: writeTheme }),
    [mounted, theme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
