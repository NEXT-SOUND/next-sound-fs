import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  type Theme,
  ThemeProvider as NativeThemeProvider,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { NAV_THEME } from "./constants";
import { useColorScheme } from "../use-color-schema";
import { setAndroidNavigationBar } from "utils/android-navigation-bar";

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
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
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
  }, []);

  return (
    <NativeThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      {children}
    </NativeThemeProvider>
  );
};

export default ThemeProvider;
