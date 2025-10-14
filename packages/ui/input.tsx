import { cn } from "@/ui/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { TextInput } from "react-native";
import { Button } from "./button";
import { Label } from "./typography";
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

type InputProps = Omit<
  React.ComponentPropsWithoutRef<typeof TextInput>,
  "secureTextEntry"
> &
  VariantProps<typeof inputVariants> & {
    label?: string;
    error?: string | undefined;
    helperText?: string;
    isPassword?: boolean;
  };

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      label,
      error,
      helperText,
      isPassword,
      ...props
    },
    ref,
  ) => {
    const [secureTextEntry, setSecureTextEntry] = React.useState(isPassword);

    return (
      <View className="space-y-1">
        {label && <Label>{label}</Label>}
        <View className="relative">
          <TextInput
            className={cn(
              inputVariants({ variant, size, radius }),
              error && "border-destructive focus:border-destructive",
              className,
            )}
            ref={ref}
            secureTextEntry={secureTextEntry}
            {...props}
          />
          {isPassword && (
            <Button
              className="absolute right-3 top-2 text-placeholder p-1"
              variant="ghost"
              size="sm"
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            >
              {secureTextEntry ? (
                <EyeOff className="w-4 h-4 text-placeholder" />
              ) : (
                <Eye className="w-4 h-4 text-placeholder" />
              )}
            </Button>
          )}
        </View>
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

