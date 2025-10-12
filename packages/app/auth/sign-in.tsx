import * as React from "react";
import { View } from "@/ui/view";
import { SidebarBanner } from "@/components/auth/sidebar-banner";
import { LoginForm } from "@/components/auth/login-form";

export function SignInPage() {
  return (
    <View className="min-h-screen flex">
      {/* 좌측 사이드 배너 - 데스크톱에서만 표시 */}
      <SidebarBanner className="hidden md:flex md:w-2/5" />

      {/* 우측 로그인 폼 */}
      <LoginForm className="flex-1" />
    </View>
  );
}
