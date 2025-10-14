import AuthPageHeader from "@/components/auth/page-header";
import { SidebarBanner } from "@/components/auth/sidebar-banner";
import { View } from "@/ui/view";
import * as React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <View className="min-h-screen flex flex-row">
      {/* Left Side Banner - Only show on desktop */}
      <SidebarBanner className="hidden md:flex md:w-2/5" />
      {/* Right Form Content */}
      <View className="flex-1">
        <AuthPageHeader />
        {children}
      </View>
    </View>
  );
}
