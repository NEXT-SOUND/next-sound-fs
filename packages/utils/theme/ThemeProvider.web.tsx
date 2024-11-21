import React from "react";
import { NAV_THEME } from "./constants";
import { useColorScheme } from ".";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { isDarkColorScheme, colorScheme, setColorScheme } = useColorScheme();

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme && ["light", "dark"].includes(savedTheme)) {
      setColorScheme(savedTheme as "light" | "dark");
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setColorScheme(systemTheme);

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setColorScheme(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return <>{children}</>;
};

export default ThemeProvider;
