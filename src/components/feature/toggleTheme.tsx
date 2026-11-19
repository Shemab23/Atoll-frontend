"use client";

import { useContext } from "react";
import { AppContext } from "@/context/Global/AppContext";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const context = useContext(AppContext);

  if (!context) return null;

  // Destructure mounted directly alongside theme and setTheme
  const { mounted, theme, setTheme } = context;

  if (!mounted) {
    return <Skeleton className="size-9 rounded-md" />;
  }

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="z-50 absolute top-3 right-3 bg-bg-card"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
