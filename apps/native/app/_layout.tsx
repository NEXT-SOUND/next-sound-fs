import { Stack } from "expo-router";
import "../global.css";
import "@/utils/i18n/i18n.native";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
