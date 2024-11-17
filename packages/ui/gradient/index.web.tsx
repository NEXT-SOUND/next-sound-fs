"use client";

import { AnimatePresence, motion } from "framer-motion";
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
  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...props}
        key={colors.join(",")}
        initial={{ opacity: animated ? 0 : 1 }}
        animate={{
          opacity: animated ? 1 : 1,
          width,
          height,
        }}
        exit={{ opacity: animated ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{
          // @ts-expect-error
          ...style,
          background: `linear-gradient(${direction}, ${gradientColors})`,
        }}
      />
    </AnimatePresence>
  );

}
