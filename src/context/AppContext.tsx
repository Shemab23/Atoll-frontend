"use client";

import { createContext } from "react";

export type Theme = "light" | "dark";

export interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
