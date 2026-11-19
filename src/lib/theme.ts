const KEY = "atoll_theme";
const EVENT = "atoll-theme-change";

export type Theme = "light" | "dark";

// Saved choice first, then the device preference, then light.
export const readTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {} // storage blocked: fall through to the device preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const writeTheme = (theme: Theme) => {
  try {
    localStorage.setItem(KEY, theme);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
};

// "storage" = other tabs, EVENT = this tab
export const subscribeTheme = (cb: () => void) => {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
};

// Runs in <head> before React so a dark-mode user never sees a white flash.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`;
