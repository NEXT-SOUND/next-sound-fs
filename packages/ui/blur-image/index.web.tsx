"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { BlurImageProps } from "./types";
import { useWindowSize } from "utils/screen";
import { AnimatePresence, motion } from "framer-motion";

export function BlurImage({
  src,
  alt,
  width,
  height,
  blurRadius = 8,
  style,
  contentFit,
  backgroundColor,
}: BlurImageProps) {
  const { isDesktop } = useWindowSize();

  if (isDesktop) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
        style={{
          clipPath: "inset(0)",
          width: "100%",
          maskImage: `linear-gradient(to bottom, ${backgroundColor}, #ffffff10 90%, transparent)`,
          WebkitMaskImage: `linear-gradient(to bottom, ${backgroundColor}, #ffffff10 90%, transparent)`,
          background: backgroundColor,
        }}
      >
        <div
          style={{
            overflow: "hidden",
            height: height,
            filter: `blur(${blurRadius}px)`,
            position: "relative",
            transition: "filter 0.3s ease-in-out",
            maskImage: `linear-gradient(to bottom, ${backgroundColor}, #ffffff10 90%, transparent)`,
            WebkitMaskImage: `linear-gradient(to bottom, ${backgroundColor}, #ffffff10 90%, transparent)`,
          }}
        >
          <motion.img
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{
              // @ts-expect-error
              ...style,
              objectFit: contentFit,
            }}
          />
        </div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width,
          height,
          overflow: "hidden",
          maskImage: `linear-gradient(to bottom, ${backgroundColor}, #ffffff10 90%, transparent)`,
          WebkitMaskImage: `linear-gradient(to bottom, ${backgroundColor}, #ffffff10 90%, transparent)`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{
            // @ts-expect-error
            ...style,
            position: "relative",
            top: -height * 0.5,
            left: -width * 0.05,
            objectFit: contentFit,
            filter: `blur(${blurRadius}px)`,
          }}
        />
      </motion.div>
    );
  }
}

