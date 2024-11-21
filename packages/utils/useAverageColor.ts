import { useColorScheme } from "./theme/useColorSchema";
import ColorUtil from "./colorUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { NAV_THEME } from "utils/theme/constants";
import { getImageColors } from "./fast-image-color";

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
): Promise<Colors> => {
  return getImageColors(imageUrl, {
    fallback: options?.fallbackColors?.average,
    quality: options?.quality,
  }).catch((e) => {
    console.error(e);
    throw e;
  });
};

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

  const animatedBackgroundColor = useSharedValue<string>(defaultColor);

  const handleChangeColors = useCallback(
    (colors: Colors, caching = false) => {
      setColors(colors);
      animatedBackgroundColor.value = withTiming(colors.average, {
        duration: ANIMATION_DURATION,
      });
      if (caching) cache[value] = colors;
      setIsFetched(true);
      setIsLoading(false);
    },
    [animatedBackgroundColor, value],
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
    animatedBackgroundColor,
    isLoading,
    isFetched,
    cache,
  };
};

export default useAverageColor;
