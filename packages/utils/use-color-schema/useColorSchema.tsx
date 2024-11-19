import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useEffect, useLayoutEffect } from "react";
import { IS_WEB } from "utils/screen";

const DEFAULT_COLOR_SCHEME = "dark";

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();

  useLayoutEffect(() => {
    if (IS_WEB) setColorScheme(colorScheme ?? DEFAULT_COLOR_SCHEME);
  }, [colorScheme]);

  return {
    colorScheme: colorScheme ?? DEFAULT_COLOR_SCHEME,
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
