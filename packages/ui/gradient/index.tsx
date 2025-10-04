import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import type { GradientProps } from "./types";
import { cssInterop } from "nativewind";

const TwCanvas = cssInterop(Canvas, {
  className: {
    target: "style",
  },
});

const Gradient = ({
  width,
  height,
  colors,
  style,
  positions,
  ...props
}: GradientProps) => (
  <TwCanvas
    {...props}
    style={[
      {
        width,
        height,
        left: 0,
        right: 0,
      },
      style,
    ]}
  >
    <Rect x={0} y={0} width={width} height={height}>
      <LinearGradient
        colors={colors}
        start={vec(0, 0)}
        end={vec(0, height)}
        positions={positions}
      />
    </Rect>
  </TwCanvas>
);

export default Gradient;
