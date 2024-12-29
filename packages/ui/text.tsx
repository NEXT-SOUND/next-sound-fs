import * as Slot from "@/ui/primitives/slot";
import type { SlottableTextProps, TextRef } from "@/ui/primitives/types";
import { cn } from "@/ui/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { Text as RNText } from "react-native";

const TextClassContext = React.createContext<string | undefined>(undefined);

export const TextVariants = cva(`tracking-tight`, {
  variants: {
    weight: {
      bold: "font-bold",
      normal: "font-normal",
      medium: "font-medium",
      light: "font-light",
      semibold: "font-semibold",
    },
    size: {
      "3xs": "text-3xs",
      "2xs": "text-2xs",
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      md: "text-md",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
      "8xl": "text-8xl",
      "9xl": "text-9xl",
    },
  },
});

export type TextProps = SlottableTextProps & VariantProps<typeof TextVariants>;

const Text = React.forwardRef<TextRef, TextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        {...props}
        className={cn(
          "text-foreground web:select-text",
          textClass,
          className,
          TextVariants(props),
        )}
        ref={ref}
        // IMPORTANT
        allowFontScaling={false}
        style={props.style}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, TextClassContext };
