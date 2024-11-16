import { useColorScheme } from "../use-color-schema/useColorSchema";
import ColorUtil from "../colorUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import ImageColors from "react-native-image-colors";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { NAV_THEME } from "utils/use-color-schema/constants";

export interface Colors {
  background: string;
  primary: string;
  secondary: string;
  detail: string;
  average: string;
}

interface Options {
  fallbackColors?: Colors;
  preloads?: string[];
  quality?: "lowest" | "low" | "high" | "highest";
  isLoading?: boolean;
}

const cache: Record<string, Colors> = {};

const fetchAverageColor = async (
  imageUrl: string,
  options?: Options,
): Promise<Colors> =>
  ImageColors.getColors(imageUrl, {
    // NOTE: using customer cache due to performance issue
    fallback: options?.fallbackColors?.average,
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
        const { dominant, darkVibrant, lightVibrant, average } = colors;

        return {
          background: dominant,
          primary: average,
          secondary: darkVibrant,
          detail: lightVibrant,
          average: ColorUtil.brightenColor(average, 30),
        };
      }
      if (colors.platform === "web") {
        const { dominant, vibrant, darkVibrant, lightVibrant, darkMuted } =
          colors;
        return {
          background: vibrant,
          primary: darkVibrant,
          secondary: lightVibrant,
          detail: darkMuted,
          average: ColorUtil.averageColor([
            vibrant,
            dominant,
            darkVibrant,
            lightVibrant,
            darkMuted,
          ]),
        };
      }
      throw new Error("Invalid platform");
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });

const DEFAULT_COLORS = {
  LIGHT: NAV_THEME.light.background,
  DARK: NAV_THEME.dark.background,
} as const;

const ANIMATION_DURATION = 300 as const;

/**
 * @param value - The image URL or average color code to get the average color from
 */
const useAverageColor = (value = "", options?: Options) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(Boolean(cache[value]));
  const { isDarkColorScheme } = useColorScheme();

  const defaultColor = useMemo(
    () => DEFAULT_COLORS[isDarkColorScheme ? "DARK" : "LIGHT"],
    [isDarkColorScheme],
  );

  const [colors, setColors] = useState<Colors>({
    background: defaultColor,
    primary: defaultColor,
    secondary: defaultColor,
    detail: defaultColor,
    average: defaultColor,
  });

  const sharedBackground = useSharedValue<string>(defaultColor);

  const handleChangeColors = useCallback(
    (colors: Colors, caching = false) => {
      setColors(colors);
      sharedBackground.value = withTiming(colors.average, {
        duration: ANIMATION_DURATION,
      });
      if (caching) cache[value] = colors;
      setIsFetched(true);
      setIsLoading(false);
    },
    [sharedBackground, value],
  );

  useEffect(() => {
    const isColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);

    // case1: value is loading
    if (options?.isLoading) {
      return;
    }

    // case2: value is empty
    if (!options?.isLoading && !value) {
      return handleChangeColors(
        options?.fallbackColors ?? {
          background: defaultColor,
          primary: defaultColor,
          secondary: defaultColor,
          detail: defaultColor,
          average: defaultColor,
        },
      );
    }

    // case3: value is cached
    if (cache[value]) {
      return handleChangeColors(cache[value]);
    }

    setIsLoading(true);

    // case4: value is color code
    if (isColor) {
      return handleChangeColors(
        {
          background: ColorUtil.opacityColor(value, 30),
          primary: ColorUtil.isDarker(value) ? "#fff" : "#000",
          secondary: ColorUtil.isDarker(value) ? "#fff" : "#000",
          detail: ColorUtil.isDarker(value) ? "#fff" : "#000",
          average: value,
        },
        true,
      );
    }

    // case5: value is image URL
    if (value) {
      fetchAverageColor(value, options)
        .then((colors) => handleChangeColors(colors, true))
        .catch((e) => {
          console.warn(e);
          setIsFetched(true);
          setIsLoading(false);
        });

      if (options?.preloads) {
        options.preloads.forEach((preload) => {
          if (cache[preload]) {
            return;
          }
          fetchAverageColor(preload, options ?? { defaultColor })
            .then((colors) => (cache[preload] = colors))
            .catch((e) => {
              console.warn(e);
            });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultColor, options?.fallbackColors, value, options?.isLoading]);

  const fastColors = useMemo(() => cache[value] ?? colors, [value, colors]);

  return {
    colors: fastColors,
    sharedBackground,
    isLoading,
    isFetched,
    cache,
  };
};

export default useAverageColor;
