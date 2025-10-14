"use client";

import { AnimatePresence, MotiView } from "moti";
import { GradientProps } from "./types";

export default function Gradient({
  colors,
  positions,
  direction = "to bottom",
  width,
  height,
  style,
  animated = true,
  ...props
}: GradientProps) {
  const gradientColors = positions
    ? colors
        // @ts-expect-error
        .map((color, index) => `${color} ${positions[index] * 100}%`)
        .join(", ")
    : colors.join(", ");

  if (!animated) {
    return (
      <div
        {...props}
        style={{
          // @ts-expect-error
          ...style,
          background: `linear-gradient(${direction}, ${gradientColors})`,
        }}
      />
    );
  }

  return (
    <AnimatePresence>
      <MotiView
        {...props}
        key={colors.join(",")}
        from={{ opacity: 0 }}
        animate={{
          opacity: 1,
          width,
          height,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        style={{
          // @ts-expect-error
          ...style,
          background: `linear-gradient(${direction}, ${gradientColors})`,
        }}
      />
    </AnimatePresence>
  );
}
