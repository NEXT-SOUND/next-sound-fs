import { Dimensions, Platform } from "react-native";

export const IS_WEB = Platform.OS === "web";
export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";
export const SCREEN_WIDTH = IS_WEB
  ? window.innerWidth
  : Dimensions.get("window").width;

export const SCREEN_HEIGHT = IS_WEB
  ? window.innerHeight
  : Dimensions.get("window").height;

