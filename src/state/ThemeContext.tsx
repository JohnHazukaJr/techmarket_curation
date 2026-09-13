import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { VisualDirection } from "../types/collection";

interface ThemeContextValue {
  dir: VisualDirection;
  setDir: (dir: VisualDirection) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dir, setDir] = useState<VisualDirection>("a");

  useEffect(() => {
    document.documentElement.dataset.dir = dir;
  }, [dir]);

  const value = useMemo(() => ({ dir, setDir }), [dir]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
