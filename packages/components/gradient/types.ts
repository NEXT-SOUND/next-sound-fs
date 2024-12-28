import { StyleProp, ViewStyle } from "react-native";

export interface GradientProps {
  colors: string[];
  width: number;
  height: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
  positions?: number[];
  direction?: GradientDirection;
  animated?: boolean;
}

type GradientDirection =
  | "to right"
  | "to left"
  | "to top"
  | "to bottom"
  | "to right top"
  | "to right bottom"
  | "to left top"
  | "to left bottom";