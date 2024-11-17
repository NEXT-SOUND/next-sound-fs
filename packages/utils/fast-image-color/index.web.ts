import { FastAverageColor } from "fast-average-color";
import { Colors } from "../useAverageColor";

export const getImageColors = async (imageUrl: string): Promise<Colors> => {
  const fac = new FastAverageColor();

  try {
    const mainColor = await fac.getColorAsync(imageUrl, {
      algorithm: "dominant",
      left: 100,
      top: 0,
      width: 100,
      height: 100,
    });
    const darkerColor = await fac.getColorAsync(imageUrl, {
      algorithm: "dominant",
      left: 0,
      top: 0,
      width: 100,
      height: 100,
    });

    return {
      background: mainColor.hex,
      primary: darkerColor.hex,
      secondary: mainColor.isDark
        ? lightenColor(mainColor.hex, 30)
        : darkenColor(mainColor.hex, 30),
      detail: mainColor.isDark
        ? lightenColor(mainColor.hex, 50)
        : darkenColor(mainColor.hex, 50),
      average: mainColor.hex,
    };
  } catch (error) {
    console.error("Error getting image colors:", error);
    throw error;
  }
};

const lightenColor = (color: string, amount: number): string => {
  return alterColor(color, amount, true);
};

const darkenColor = (color: string, amount: number): string => {
  return alterColor(color, amount, false);
};

const alterColor = (
  color: string,
  amount: number,
  lighten: boolean,
): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const r = (num >> 16) + (lighten ? amount : -amount);
  const b = ((num >> 8) & 0x00ff) + (lighten ? amount : -amount);
  const g = (num & 0x0000ff) + (lighten ? amount : -amount);

  const newR = clamp(r, 0, 255);
  const newB = clamp(b, 0, 255);
  const newG = clamp(g, 0, 255);

  return (
    "#" + (0x1000000 + (newR << 16) + (newB << 8) + newG).toString(16).slice(1)
  );
};

const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};
