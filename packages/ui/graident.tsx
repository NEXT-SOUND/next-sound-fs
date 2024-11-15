"use dom";

import { AnimatePresence, motion } from "framer-motion";
import { SCREEN_HEIGHT } from "utils/screen";

interface GradientProps {
  colors: string[];
  name: string;
}

export default function Gradient({ colors, name, ...props }: GradientProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...props}
        key={colors.join(",")} // 색상이 변경될 때마다 새로운 key 생성
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          background: `linear-gradient(to right, ${colors.join(", ")})`,
          width: "100%",
          height: SCREEN_HEIGHT * 0.2,
        }}
      >
        Hello, {name}
      </motion.div>
    </AnimatePresence>
  );
}