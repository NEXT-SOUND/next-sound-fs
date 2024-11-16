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
>(({ children, className, edges, ...props }, ref) => {
  const { top } = useSafeArea();

  return (
    <ReactNativeView
      ref={ref}
      className={cn(className)}
      style={edges?.reduce((acc, edge) => {
        if (edge?.includes("top")) return { ...acc, paddingTop: top };
        if (edge?.includes("bottom")) return { ...acc, paddingBottom: top };
        if (edge?.includes("left")) return { ...acc, paddingLeft: top };
        if (edge?.includes("right")) return { ...acc, paddingRight: top };
        return acc;
      }, {})}
      {...props}
    >
      {children}
    </ReactNativeView>
  );
});

View.displayName = "View";
