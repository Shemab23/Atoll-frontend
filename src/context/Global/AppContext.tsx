"use client";

import { createContext, useContext } from "react";
import type { Theme } from "@/lib/theme";

export type { Theme }; // single source of truth is lib/theme

export interface AppContextType {
  mounted: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside an AppProvider");
  return context;
}
