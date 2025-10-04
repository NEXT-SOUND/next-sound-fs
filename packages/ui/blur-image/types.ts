import { StyleProp, ImageStyle, ImageProps } from "react-native";

export interface BlurImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurRadius?: number;
  style?: StyleProp<ImageStyle>;
  contentFit?: ImageProps["resizeMode"];
  backgroundColor?: string;
}
