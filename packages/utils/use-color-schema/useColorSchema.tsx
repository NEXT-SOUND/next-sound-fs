import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useEffect } from "react";
import { IS_WEB } from "utils/screen";

const DEFAULT_COLOR_SCHEME = "light";

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();

  useEffect(() => {
    if (IS_WEB) setColorScheme(colorScheme ?? DEFAULT_COLOR_SCHEME);
  }, [colorScheme]);

  return {
    colorScheme: colorScheme ?? DEFAULT_COLOR_SCHEME,
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
