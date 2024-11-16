import { StyleProp, ViewStyle } from "react-native";

export interface GradientProps {
  colors: string[];
  width: number;
  height: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
  positions?: number[];
}
