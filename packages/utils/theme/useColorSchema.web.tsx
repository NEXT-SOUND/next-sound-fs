import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useEffect, useLayoutEffect } from "react";
import { IS_WEB } from "utils/screen";

const DEFAULT_COLOR_SCHEME = "dark";

export function useColorScheme() {
  const {
    colorScheme,
    setColorScheme: nativeSetColorScheme,
    toggleColorScheme: nativeToggleColorScheme,
  } = useNativewindColorScheme();

  const toggleColorScheme = () => {
    console.log(colorScheme);
    localStorage.setItem("theme", colorScheme === "dark" ? "light" : "dark");
    nativeToggleColorScheme();
  };

  const setColorScheme = (scheme: "light" | "dark") => {
    localStorage.setItem("theme", scheme);
    nativeSetColorScheme(scheme);
  };

  return {
    colorScheme: colorScheme ?? DEFAULT_COLOR_SCHEME,
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
