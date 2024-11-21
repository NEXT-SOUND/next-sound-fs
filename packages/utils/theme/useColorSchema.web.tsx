import { useTheme } from "next-themes";

type ColorScheme = "light" | "dark" | "system";

export function useColorScheme() {
  const { systemTheme, theme, setTheme } = useTheme();

  const toggleColorScheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const setColorScheme = (scheme: ColorScheme) => {
    setTheme(scheme === "system" ? (systemTheme ?? "dark") : scheme);
  };

  return {
    colorScheme: theme === "system" ? systemTheme : theme,
    isDarkColorScheme: theme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
