import { View } from "@/ui/view";
import { ReactNode } from "react";

interface CenterContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md", 
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

export function CenterContainer({ 
  children, 
  className = "", 
  maxWidth = "md" 
}: CenterContainerProps) {
  return (
    <View className={`flex justify-center items-center min-h-screen px-4 py-8 ${className}`}>
      <View className={`w-full ${maxWidthClasses[maxWidth]} flex-shrink-0`}>
        {children}
      </View>
    </View>
  );
}
