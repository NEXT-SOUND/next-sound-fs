import { Dimensions, Platform } from "react-native";
import { useState, useEffect } from "react";
import { isServerRender } from "./next-js";

export const IS_WEB = Platform.OS === "web";
export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

export const SCREEN_WIDTH = IS_WEB
  ? typeof window !== "undefined"
    ? window.innerWidth
    : 0
  : Dimensions.get("window").width;

export const SCREEN_HEIGHT = IS_WEB
  ? typeof window !== "undefined"
    ? window.innerHeight
    : 0
  : Dimensions.get("window").height;

export function useWindowSize() {
  const [width, setWidth] = useState(SCREEN_WIDTH);
  const [height, setHeight] = useState(SCREEN_HEIGHT);
  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    if (!isServerRender() && IS_WEB) {
      //set width/height on the first render
      setIsServer(false);
      setWidth(window.document.body.clientWidth);
      setHeight(window.innerHeight);
      const observer = () => {
        setWidth(window.document.body.clientWidth);
        setHeight(window.innerHeight);
      };

      window.addEventListener("resize", observer);

      observer();

      return () => window.removeEventListener("resize", observer);
    }
  }, []);

  return {
    width: isServer ? 0 : width,
    height: isServer ? 0 : height,
    isServer,
    isMobile: isServer ? false : width < 768,
    isTablet: isServer ? false : width >= 768 && width < 1024,
    isDesktop: isServer ? false : width >= 1024,
    isLargeScreen: isServer ? false : width >= 1440,
    isBigScreen: isServer ? false : width >= 1920,
  };
}
