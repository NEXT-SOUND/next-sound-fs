import {
  View as ReactNativeView,
  ViewProps as RNViewProps,
  SafeAreaView,
} from "react-native";
import { cssInterop } from "nativewind";
import { cn } from "ui/utils/cn";
import React from "react";
import { useSafeArea } from "utils/safe-area";

interface ViewProps extends RNViewProps {
  children: React.ReactNode;
  className?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
}

cssInterop(ReactNativeView, {
  className: "style",
});

export const View = React.forwardRef<
  React.ElementRef<typeof ReactNativeView>,
  ViewProps
>(({ children, className, edges = ["top", "bottom"], ...props }, ref) => {
  const { top } = useSafeArea();

  return (
    <SafeAreaView
      ref={ref}
      className={cn(className)}
      style={edges?.reduce((acc, edge) => {
        if (edge === "top") return { ...acc, paddingTop: top };
        if (edge === "bottom") return { ...acc, paddingBottom: top };
        if (edge === "left") return { ...acc, paddingLeft: top };
        if (edge === "right") return { ...acc, paddingRight: top };
        return acc;
      }, {})}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
});

View.displayName = "View";
