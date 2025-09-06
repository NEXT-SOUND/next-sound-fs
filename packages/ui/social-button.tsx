import { cn } from "@/ui/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { Pressable } from "react-native";
import { Text } from "@/ui/text";

const socialButtonVariants = cva(
  "group flex flex-row gap-3 items-center justify-center web:ring-offset-background web:transition-all web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 border web:hover:opacity-90 active:opacity-90",
  {
    variants: {
      variant: {
        google: "bg-white border-gray-300 web:hover:bg-gray-50 active:bg-gray-50",
        github: "bg-gray-900 border-gray-800 web:hover:bg-gray-800 active:bg-gray-800",
        spotify: "bg-spotify-green border-spotify-green web:hover:bg-spotify-green-hover active:bg-spotify-green-hover",
        outline: "bg-transparent border-border web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
      },
      size: {
        default: "h-12 px-4 py-3",
        sm: "h-10 px-3 py-2",
        lg: "h-14 px-6 py-4",
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
      radius: "lg",
    },
  },
);

const socialButtonTextVariants = cva(
  "web:whitespace-nowrap font-medium web:transition-all",
  {
    variants: {
      variant: {
        google: "text-gray-700",
        github: "text-white",
        spotify: "text-black",
        outline: "text-foreground",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  },
);

type SocialButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof socialButtonVariants> & {
    icon?: React.ReactNode;
    children: React.ReactNode;
    loading?: boolean;
  };

const SocialButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SocialButtonProps
>(
  (
    { className, variant, size, radius, icon, children, loading, ...props },
    ref,
  ) => {
    return (
      <Pressable
        className={cn(
          socialButtonVariants({ variant, size, radius }),
          props.disabled && "opacity-50 web:pointer-events-none",
          className,
        )}
        ref={ref}
        role="button"
        {...props}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          icon && <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
        )}
        <Text className={cn(socialButtonTextVariants({ variant, size }))}>
          {children}
        </Text>
      </Pressable>
    );
  },
);

SocialButton.displayName = "SocialButton";

export { SocialButton, socialButtonVariants, socialButtonTextVariants };
export type { SocialButtonProps };