/** @type {import('next').NextConfig} */

const { withExpo } = require("@expo/next-adapter");
const { i18n } = require("./next-i18next.config");

module.exports = withExpo({
  i18n,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  transpilePackages: [
    // you need to list `react-native` because `react-native-web` is aliased to `react-native`.
    "react-native",
    "react-native-web",
    "ui",
    "nativewind",
    "react-native-css-interop",
    "solito",
    "app",
    "react-native-reanimated",
    "react-native-gesture-handler",
    "moti",
    // Add other packages that need transpiling
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
      "react-native/Libraries/Image/AssetRegistry":
        "react-native-web/dist/cjs/modules/AssetRegistry", // Fix for loading images in web builds with Expo-Image
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];
    return config;
  },
});
