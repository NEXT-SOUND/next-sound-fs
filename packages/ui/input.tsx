import { cn } from "@/ui/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { TextInput } from "react-native";
import { View } from "./view";

const inputVariants = cva(
  "web:transition-all web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring border border-border placeholder:text-placeholder",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        outline: "bg-transparent border-border",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-sm",
        lg: "h-12 px-4 py-3 text-base",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "xl",
    },
  },
);

type InputProps = React.ComponentPropsWithoutRef<typeof TextInput> &
  VariantProps<typeof inputVariants> & {
    label?: string;
    error?: string;
    helperText?: string;
  };

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    { className, variant, size, radius, label, error, helperText, ...props },
    ref,
  ) => {
    return (
      <View className="space-y-2">
        {label && (
          <label className="text-sm font-montMedium text-description">
            {label}
          </label>
        )}
        <TextInput
          className={cn(
            inputVariants({ variant, size, radius }),
            error && "border-destructive focus:border-destructive",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </View>
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
export type { InputProps };

