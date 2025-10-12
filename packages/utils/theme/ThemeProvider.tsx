import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  type Theme,
  ThemeProvider as NativeThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { setAndroidNavigationBar } from "utils/android-navigation-bar";
import { useColorScheme } from ".";
import { NAV_THEME } from "./constants";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { isDarkColorScheme, colorScheme, setColorScheme } = useColorScheme();

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (!theme) {
        setAndroidNavigationBar(colorScheme);
        AsyncStorage.setItem("theme", colorScheme);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      setAndroidNavigationBar(colorTheme);
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
      }
    })().finally(() => {
      // SplashScreen.hideAsync();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NativeThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      {children}
    </NativeThemeProvider>
  );
};

export default ThemeProvider;
