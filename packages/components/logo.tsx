import { Text } from "@/ui/text";
import { cn } from "@/ui/utils/cn";
import { View } from "@/ui/view";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "white" | "black";
}

const Logo = ({ size = "xl", color = "black" }: LogoProps) => {
  return (
    <View className="flex flex-row items-baseline">
      <Text
        className={cn(
          "font-mont",

          {
            "text-white": color === "white",
            "text-black": color === "black",
            "text-sm": size === "sm",
            "text-md": size === "md",
            "text-lg": size === "lg",
            "text-xl": size === "xl",
          },
        )}
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
        })}
      >
        Stage
      </Text>
    </View>
  );
};

export default Logo;
