// import ImageColors from "react-native-image-colors";
import ColorUtil from "../colorUtils";
import { Colors } from "../useAverageColor";

class ImageColors {
  getColors(
    // @ts-ignore FIXME:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    imageUrl: string,
    // @ts-ignore FIXME:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    options?: {
      fallback?: string;
      quality?: "lowest" | "low" | "high" | "highest";
    },
  ) {
    return Promise.resolve({
      platform: "ios",
      background: "#000000",
      primary: "#000000",
      secondary: "#000000",
      detail: "#000000",
    });
  }
}

export const getImageColors = async (
  imageUrl: string,
  options?: {
    fallback?: string;
    quality?: "lowest" | "low" | "high" | "highest";
  },
): Promise<Colors> => {
  return new ImageColors()
    .getColors(imageUrl, {
      fallback: options?.fallback ?? "#FFFFFF69",
      quality: options?.quality ?? "low",
    })
    .then((colors) => {
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
        // @ts-ignore
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
