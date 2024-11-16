// Define a type for RGB color
type RGBColor = {
  r: number;
  g: number;
  b: number;
  a?: number; // Optional alpha value
};

const colorBlindSafeColors = [
  "#33a02c", // Green
  "#4771b2", // Light blue
  "#e08214", // Dark orange
  "#8073ac", // Dark purple
  "#fb9a99", // Light pink
  "#e31a1c", // Red
  "#00429d", // Blue
  "#8c96c6", // Purple
  "#2d004b", // Very dark blue
  "#b35806", // Brown
  "#ccebc5", // Light green
  "#542788", // Dark blue
  "#bebada", // Light purple
  "#a6cee3", // Light sky blue
  "#1f78b4", // Strong blue
  "#b2df8a", // Light green
  "#ff7f00", // Orange
  "#cab2d6", // Lavender
  "#6a3d9a", // Dark purple
  "#b15928", // Dark brown
  "#bc80bd", // Soft pink
];

/**
 * Generates a random HEX color string.
 * Ensures that the color is not pure white (#FFFFFF).
 * @returns {string} - A random HEX color code.
 */
function getRandomColor(): string {
  const color = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
  return color === "#FFFFFF" ? getRandomColor() : color;
}

function getBlindSafeColor(index: number): string {
  return colorBlindSafeColors[index % colorBlindSafeColors.length];
}

/**
 * Converts a HEX color string to an RGB color object.
 * @param {string} hex - The HEX color string (e.g., #RRGGBB).
 * @returns {RGBColor} - The corresponding RGB color object.
 */
function hexToRgb(hex: string): RGBColor {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

/**
 * Converts an RGB(A) color object to a HEX string.
 * If an alpha value is provided, it will be included in the resulting HEX string.
 * @param {RGBColor} color - The RGB(A) color object.
 * @returns {string} - The corresponding HEX color string (e.g., #RRGGBB or #RRGGBBAA).
 */
function rgbaToHex({ r, g, b, a }: RGBColor): string {
  const toHex = (value: number) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return a !== undefined
    ? `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(Math.round(a * 255))}`
    : `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Calculates the average color from an array of HEX color strings.
 * @param {string[]} hexColors - An array of HEX color strings.
 * @returns {string} - The average color in HEX format.
 */
function averageColor(hexColors: string[]): string {
  const rgbColors = hexColors.map((hex) => hexToRgb(hex));
  const totalColors = rgbColors.length;

  // Sum up all the RGB values
  const sumColor = rgbColors.reduce(
    (acc, color) => {
      acc.r += color.r;
      acc.g += color.g;
      acc.b += color.b;
      return acc;
    },
    { r: 0, g: 0, b: 0 },
  );

  // Calculate the average RGB values
  const avgColor = {
    r: Math.round(sumColor.r / totalColors),
    g: Math.round(sumColor.g / totalColors),
    b: Math.round(sumColor.b / totalColors),
  };

  return rgbaToHex(avgColor);
}

/**
 * Lightens a given HEX color by a specified percentage.
 * @param {string} color - The HEX color string to lighten.
 * @param {number} percent - The percentage to lighten the color (default is 40%).
 * @returns {string} - The lightened HEX color string.
 */
const whitenColor = (color: string, percent = 40): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let G = ((num >> 8) & 0x00ff) + amt;
  let B = (num & 0x0000ff) + amt;

  // Ensure the RGB values are within the valid range (0-255)
  R = R < 0 ? 0 : R > 255 ? 255 : R;
  G = G < 0 ? 0 : G > 255 ? 255 : G;
  B = B < 0 ? 0 : B > 255 ? 255 : B;

  const newColor = `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1).toUpperCase()}`;
  return newColor;
};

/**
 * Determines if a given color is too close to white based on luminance.
 * @param {string} color - The color to check, in HEX or keyword format.
 * @returns {boolean} - Returns true if the color is too close to white, otherwise false.
 */
function isTooWhite(color: string): boolean {
  if (color === "transparent" || !color) {
    return false;
  }

  if (color.length === 4) {
    color = `#${[color[1], color[1], color[2], color[2], color[3], color[3]].join("")}`;
  }

  color = color.substring(1); // Remove #
  const rgb = parseInt(color, 16); // Convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // Extract red
  const g = (rgb >> 8) & 0xff; // Extract green
  const b = (rgb >> 0) & 0xff; // Extract blue

  // Using the standard luminance calculation
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;

  return luma > 190; // Higher threshold for identifying "too white"
}

/**
 * Checks if the given color is darker based on luminance.
 * @param {string} color - The color in HEX or RGBA format.
 * @returns {boolean} - Returns true if the color is considered darker, otherwise false.
 */
const isDarker = (color: string): boolean => {
  if (color === "transparent" || !color) {
    return false;
  }

  if (color.startsWith("rgba")) {
    const [r, g, b, a] = color
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map(Number);

    color = rgbaToHex({ r, g, b, a });
  }

  if (color.length === 4) {
    color = `#${[color[1], color[1], color[2], color[2], color[3], color[3]].join("")}`;
  }

  color = color.substring(1); // Remove #
  const rgb = parseInt(color, 16); // Convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // Extract red
  const g = (rgb >> 8) & 0xff; // Extract green
  const b = (rgb >> 0) & 0xff; // Extract blue

  // Adjusted weights to increase sensitivity
  const luma = 0.299 * r + 0.587 * g + 0.114 * b; // Using adjusted coefficients

  return luma < 100; // Lower threshold for higher sensitivity
};

/**
 * Darkens a given HEX color by a specified percentage.
 * @param {string} color - The HEX color string to darken.
 * @param {number} percent - The percentage to darken the color (default is 40%).
 * @returns {string} - The darkened HEX color string.
 */
const darkenColor = (color: string, percent = 40): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  let R = (num >> 16) - amt;
  let G = ((num >> 8) & 0x00ff) - amt;
  let B = (num & 0x0000ff) - amt;

  // Ensure the RGB values are within the valid range (0-255)
  R = R < 0 ? 0 : R > 255 ? 255 : R;
  G = G < 0 ? 0 : G > 255 ? 255 : G;
  B = B < 0 ? 0 : B > 255 ? 255 : B;

  const newColor = `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1).toUpperCase()}`;
  return newColor;
};

/**
 * Brightens a given HEX color by a specified percentage.
 * @param {string} hex - The HEX color string to brighten.
 * @param {number} percent - The percentage to brighten the color.
 * @returns {string} - The brightened HEX color string.
 */
function brightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);

  const brighten = (value: number) =>
    Math.min(255, Math.round(value + (255 - value) * (percent / 100)));

  const brightenedColor = {
    r: brighten(rgb.r),
    g: brighten(rgb.g),
    b: brighten(rgb.b),
  };

  return rgbaToHex(brightenedColor);
}

/**
 * Adds opacity to a given HEX color.
 * @param {string} hex - The HEX color string.
 * @param {number} opacity - The opacity level (0 to 1).
 * @returns {string} - The HEX color string with the alpha channel.
 */
const opacityColor = (hex: string, opacity: number): string =>
  hex + Math.round(opacity * 255).toString(16);

/**
 * Inverts a given HEX color.
 * @param {string} color - The HEX color string to invert.
 * @returns {string} - The inverted HEX color string.
 */
const invertColor = (color: string): string => {
  const hex = color.replace("#", "");
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16).padStart(2, "0");
  const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16).padStart(2, "0");
  const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
};

/**
 * Converts a common color name to its corresponding HEX value.
 * @param {string} color - The color name (e.g., 'red', 'blue').
 * @returns {string} - The corresponding HEX color string, or the original string if not found.
 */
function colorNameToHex(color: string): string {
  const colors: { [key: string]: string } = {
    black: "#000000",
    red: "#FF0000",
    white: "#FFFFFF",
    green: "#008000",
    blue: "#0000FF",
    yellow: "#FFFF00",
    cyan: "#00FFFF",
    magenta: "#FF00FF",
    silver: "#C0C0C0",
    gray: "#808080",
    maroon: "#800000",
    olive: "#808000",
    purple: "#800080",
    teal: "#008080",
    navy: "#000080",
  };

  return colors[color.toLowerCase()] || color;
}

/**
 * Adjusts the saturation of a color
 * @param {string} hex - HEX color string
 * @param {number} amount - Amount to adjust saturation (-100 to 100, negative decreases saturation, positive increases saturation)
 * @returns {string} - HEX color string with adjusted saturation
 */
function adjustSaturation(hex: string, amount: number): string {
  // Convert HEX to RGB
  const rgb = hexToRgb(hex);

  // Convert RGB to HSL
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Adjust saturation
  s = Math.max(0, Math.min(1, s + amount / 100));

  // Convert HSL back to RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const newR = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const newG = Math.round(hue2rgb(p, q, h) * 255);
  const newB = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  return rgbaToHex({ r: newR, g: newG, b: newB });
}

const ColorUtil = {
  getRandomColor,
  getBlindSafeColor,
  hexToRgb,
  rgbaToHex,
  averageColor,
  whitenColor,
  isTooWhite,
  isDarker,
  darkenColor,
  brightenColor,
  opacityColor,
  invertColor,
  colorNameToHex,
  adjustSaturation,
};

export default ColorUtil;
