import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import "@/utils/i18n/i18n.native";
import ThemeProvider from "@/utils/theme/ThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  );
}
