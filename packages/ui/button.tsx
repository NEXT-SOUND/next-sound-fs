import { Text, TextClassContext } from "@/ui/text";
import { cn } from "@/ui/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { Pressable } from "react-native";
import * as Slot from "@/ui/primitives/slot";
import { Loader } from "lucide-react";

const buttonVariants = cva(
  "group flex flex-row gap-2 items-center justify-center web:ring-offset-background web:transition-all web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary web:hover:opacity-90 active:opacity-90",
        destructive: "bg-destructive web:hover:opacity-90 active:opacity-90",
        outline:
          "border border-border web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        secondary: "bg-secondary web:hover:opacity-80 active:opacity-80",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline ",
        translucent: "bg-translucent active:opacity-80 border-white-30 border",
        white: "bg-white-60 active:opacity-80 ",
        spotify: "bg-spotify-green web:hover:bg-spotify-green-hover active:bg-spotify-green-hover",
      },
      size: {
        default: "h-10 px-4 py-2 native:h-10 native:px-5",
        xs: "h-6 px-2",
        sm: "h-8 px-3",
        lg: "h-12 px-8 native:h-12 py-2 native:px-10",
        xl: "h-14 px-8 native:h-16 py-2 native:px-10",
        fit: "h-auto px-2 py-1 rounded-md",
        icon: "h-8 w-8",
      },
      radius: {
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
        md: "rounded-md",
        none: "rounded-none",
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

const buttonTextVariants = cva(
  "web:whitespace-nowrap text-base font-medium text-foreground web:transition-all",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-destructive-foreground",
        outline: "text-foreground",
        secondary:
          "text-secondary-foreground group-active:text-secondary-foreground",
        ghost: "group-active:text-accent-foreground",
        link: "text-black-80 group-active:underline",
        translucent: "text-white",
        white: "text-white-foreground",
        spotify: "text-black",
      },
      size: {
        default: "text-base",
        xs: "text-xs",
        sm: "text-sm",
        lg: "text-lg",
        xl: "text-xl",
        fit: "text-base",
        icon: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    asChild?: boolean;
  };

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    { className, variant, size, radius, children, loading, asChild, ...props },
    ref,
  ) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <TextClassContext.Provider
        value={cn(
          props.disabled && "web:pointer-events-none",
          buttonTextVariants({ variant, size }),
        )}
      >
        <Component
          className={cn(
            buttonVariants({ variant, size, radius }),
            props.disabled && "opacity-35 web:pointer-events-none ",
            className,
          )}
          ref={ref}
          role="button"
          {...props}
        >
          {loading ? (
            <Loader
              className={cn(buttonTextVariants({ variant }), "animate-spin")}
            />
          ) : Array.isArray(children) ? (
            children.map((component, index) =>
              typeof component === "string" ? (
                <Text key={index}>{component}</Text>
              ) : (
                component
              ),
            )
          ) : typeof children === "string" ? (
            <Text key={children}>{children}</Text>
          ) : (
            children
          )}
        </Component>
      </TextClassContext.Provider>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
