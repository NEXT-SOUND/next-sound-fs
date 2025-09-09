import { cn } from "@/ui/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { TextInput, View, Pressable } from "react-native";
import { Text } from "@/ui/text";
import { Eye, EyeOff } from "lucide-react";

const inputVariants = cva(
  "web:transition-all web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 border border-border text-foreground placeholder:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-background",
        outline: "bg-transparent border-border",
        filled: "bg-accent border-transparent",
        spotify: "bg-spotify-gray border-spotify-gray text-white placeholder:text-spotify-light-gray",
      },
      size: {
        default: "h-12 px-3 py-3 text-base",
        sm: "h-10 px-3 py-2 text-sm",
        lg: "h-14 px-4 py-4 text-lg",
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
      radius: "lg",
    },
  },
);

const inputContainerVariants = cva("space-y-2", {
  variants: {
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

type InputProps = React.ComponentPropsWithoutRef<typeof TextInput> &
  VariantProps<typeof inputVariants> &
  VariantProps<typeof inputContainerVariants> & {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    showPasswordToggle?: boolean;
    containerClassName?: string;
  };

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    {
      className,
      containerClassName,
      variant,
      size,
      radius,
      fullWidth,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      showPasswordToggle,
      secureTextEntry,
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const isPassword = secureTextEntry || showPasswordToggle;

    return (
      <View className={cn(inputContainerVariants({ fullWidth }), containerClassName)}>
        {label && (
          <Text className="text-sm font-medium text-foreground mb-1">
            {label}
          </Text>
        )}
        <View className="relative">
          {leftIcon && (
            <View className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              {leftIcon}
            </View>
          )}
          <TextInput
            className={cn(
              inputVariants({ variant, size, radius }),
              error && "border-destructive focus:border-destructive",
              leftIcon && "pl-10",
              (rightIcon || isPassword) && "pr-10",
              className,
            )}
            ref={ref}
            secureTextEntry={isPassword && !isPasswordVisible}
            {...props}
          />
          {(rightIcon || isPassword) && (
            <View className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isPassword ? (
                <Pressable
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="web:hover:opacity-70 active:opacity-70"
                >
                  {isPasswordVisible ? (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  )}
                </Pressable>
              ) : (
                rightIcon
              )}
            </View>
          )}
        </View>
        {error && (
          <Text className="text-sm text-destructive">{error}</Text>
        )}
        {helperText && !error && (
          <Text className="text-sm text-muted-foreground">{helperText}</Text>
        )}
      </View>
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants, inputContainerVariants };
export type { InputProps };