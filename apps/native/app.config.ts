import type { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Next-Sound",
  slug: "next-sound",
  experiments: {
    tsconfigPaths: true,
    reactCompiler: true,
  },
  newArchEnabled: true,
  plugins: [["expo-localization"]],
});
