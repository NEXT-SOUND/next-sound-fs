import { cn } from "@/ui/utils/cn";
import { cva } from "class-variance-authority";
import { MotiText, MotiView } from "moti";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

type ToggleProps = {
  checked: boolean;
  onChange: (nextChecked: boolean) => void;
  size?: "sm" | "md" | "lg";
  label?: string | boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

type Dimensions = { trackWidth: number; trackHeight: number; knobSize: number };
const SIZE_DIMENSIONS: Record<NonNullable<ToggleProps["size"]>, Dimensions> = {
  sm: { trackWidth: 44, trackHeight: 28, knobSize: 20 },
  md: { trackWidth: 56, trackHeight: 32, knobSize: 24 },
  lg: { trackWidth: 72, trackHeight: 40, knobSize: 30 },
};

const trackVariants = cva("rounded-full justify-center", {
  variants: { state: { on: "bg-gray-900", off: "bg-gray-200" } },
  defaultVariants: { state: "off" },
});

// knobVariants no longer used; knob color set via style for reliability

const labelVariants = cva("", {
  variants: {
    state: { on: "text-white", off: "text-gray-900" },
    size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
  },
  defaultVariants: { state: "off", size: "md" },
});

export default function Toggle({
  checked,
  onChange,
  size = "md",
  label = false,
  leftIcon,
  rightIcon,
}: ToggleProps) {
  const { trackWidth, trackHeight, knobSize } = SIZE_DIMENSIONS[size];
  const containerPadding = (trackHeight - knobSize) / 2;
  const travel = trackWidth - knobSize - containerPadding * 2;
  const knobTranslateX = useMemo(
    () => (checked ? travel : 0),
    [checked, travel],
  );
  const state: "on" | "off" = checked ? "on" : "off";
  const knobBg = state === "on" ? "#374151" : "#ffffff"; // ensure visible even if className fails

  return (
    <Pressable
      onPress={() => onChange(!checked)}
      accessibilityRole="switch"
      accessibilityState={{ checked }}
      accessibilityLabel="Toggle"
      className="flex-row items-center"
      style={{ gap: 8 }}
    >
      <View
        className={cn(trackVariants({ state }))}
        style={{
          width: trackWidth,
          height: trackHeight,
          borderRadius: trackHeight / 2,
          padding: containerPadding,
          justifyContent: "center",
        }}
      >
        <View style={{ position: "absolute", left: 8 }}>
          <MotiText
            from={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: checked ? 0.4 : 1, scale: checked ? 0.9 : 1 }}
            transition={{ type: "timing", duration: 200 }}
          >
            {leftIcon}
          </MotiText>
        </View>
        <View style={{ position: "absolute", right: 8 }}>
          <MotiText
            from={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: checked ? 1 : 0.4, scale: checked ? 1 : 0.9 }}
            transition={{ type: "timing", duration: 200 }}
          >
            {rightIcon}
          </MotiText>
        </View>

        <MotiView
          from={{ translateX: 0 }}
          animate={{ translateX: knobTranslateX, backgroundColor: knobBg }}
          transition={{ type: "timing", duration: 250 }}
          style={{
            width: knobSize,
            height: knobSize,
            borderRadius: knobSize / 2,
            backgroundColor: knobBg,
            zIndex: 1,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </View>

      {label && (
        <Text className={cn(labelVariants({ state, size }))}>
          {typeof label === "string" ? label : checked ? "On" : "Off"}
        </Text>
      )}
    </Pressable>
  );
}
