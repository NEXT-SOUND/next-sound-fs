"use dom";

import { AnimatePresence, motion } from "framer-motion";
import { GradientProps } from "./types";

export default function Gradient({
  colors,
  width,
  height,
  ...props
}: GradientProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...props}
        key={colors.join(",")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `linear-gradient(to right, ${colors.join(", ")})`,
          width,
          height,
        }}
      />
    </AnimatePresence>
  );
}
