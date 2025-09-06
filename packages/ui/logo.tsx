import { cn } from "@/ui/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { Text } from "@/ui/text";

const logoVariants = cva(
  "flex flex-row items-center gap-2",
  {
    variants: {
      size: {
        sm: "gap-1.5",
        default: "gap-2",
        lg: "gap-3",
        xl: "gap-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const logoIconVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "w-6 h-6",
        default: "w-8 h-8",
        lg: "w-10 h-10",
        xl: "w-12 h-12",
      },
      variant: {
        primary: "bg-primary",
        spotify: "bg-spotify-green",
        gradient: "bg-gradient-to-br from-primary to-spotify-green",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "spotify",
    },
  },
);

const logoTextVariants = cva(
  "font-bold text-foreground",
  {
    variants: {
      size: {
        sm: "text-lg",
        default: "text-xl",
        lg: "text-2xl",
        xl: "text-3xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type LogoProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof logoVariants> &
  VariantProps<typeof logoIconVariants> & {
    text?: string;
    showIcon?: boolean;
    showText?: boolean;
  };

const Logo = React.forwardRef<React.ElementRef<typeof View>, LogoProps>(
  (
    {
      className,
      size,
      variant = "spotify",
      text = "MusicApp",
      showIcon = true,
      showText = true,
      ...props
    },
    ref,
  ) => {
    return (
      <View
        className={cn(logoVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        {showIcon && (
          <View className={cn(logoIconVariants({ size, variant }))}>
            <svg
              viewBox="0 0 24 24"
              width={size === "sm" ? 16 : size === "lg" ? 24 : size === "xl" ? 28 : 20}
              height={size === "sm" ? 16 : size === "lg" ? 24 : size === "xl" ? 28 : 20}
              fill="white"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.5c-.17.29-.48.37-.79.2-2.49-1.52-5.63-1.87-9.32-1.02-.37.08-.67-.12-.75-.42-.08-.3.12-.67.42-.75 4.02-.94 7.53-.54 10.28 1.15.31.15.42.56.26.84zm1.13-2.7c-.25.35-.7.5-1.05.25-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1zm.1-2.8C14.9 9 9.3 8.8 6.15 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.2.35-.85.5-1.28.25z" />
            </svg>
          </View>
        )}
        {showText && (
          <Text className={cn(logoTextVariants({ size }))}>{text}</Text>
        )}
      </View>
    );
  },
);

Logo.displayName = "Logo";

export { Logo, logoVariants, logoIconVariants, logoTextVariants };
export type { LogoProps };