import ImageColors from "react-native-image-colors";
import ColorUtil from "../colorUtils";
import { Colors } from "../useAverageColor";

export const getImageColors = async (
  imageUrl: string,
  options?: {
    fallback?: string;
    quality?: "lowest" | "low" | "high" | "highest";
  },
): Promise<Colors> => {
  return ImageColors.getColors(imageUrl, {
    fallback: options?.fallback,
    quality: options?.quality ?? "low",
  }).then((colors) => {
    if (colors.platform === "ios") {
      const { background, primary, secondary, detail } = colors;
      return {
        background,
        primary,
        secondary,
        detail,
        average: ColorUtil.averageColor([
          background,
          primary,
          secondary,
          detail,
        ]),
      };
    }
    if (colors.platform === "android") {
      const { dominant, darkVibrant, lightVibrant, average } = colors;
      return {
        background: dominant,
        primary: average,
        secondary: darkVibrant,
        detail: lightVibrant,
        average: ColorUtil.brightenColor(average, 30),
      };
    }
    throw new Error("Invalid platform");
  });
};
