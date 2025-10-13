import { Text } from "@/ui/text";
import { cn } from "@/ui/utils/cn";
import { View } from "@/ui/view";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  color?: "white" | "black" | "default";
  className?: string;
}

const Logo = ({ size = "2xl", color = "default", className }: LogoProps) => {
  return (
    <View className={cn("flex flex-row items-baseline", className)}>
      <Text
        className={cn("font-mont", {
          "text-white": color === "white",
          "text-black": color === "black",
          "text-xs": size === "sm",
          "text-sm": size === "md",
          "text-md": size === "lg",
          "text-base": size === "xl",
          "text-xl": size === "2xl",
        })}
      >
        in
      </Text>
      <Text
        className={cn("font-montBold text-xl", {
          "text-white": color === "white",
          "text-black": color === "black",
          "text-sm": size === "sm",
          "text-md": size === "md",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
          "text-2xl": size === "2xl",
        })}
      >
        Stage
      </Text>
    </View>
  );
};

export default Logo;
