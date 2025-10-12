import { LoginForm } from "@/components/auth/login-form";
import { SidebarBanner } from "@/components/auth/sidebar-banner";
import { View } from "@/ui/view";

export function SignInPage() {
  return (
    <View className="min-h-screen flex flex-row">
      {/* 좌측 사이드 배너 - 데스크톱에서만 표시 */}
      <SidebarBanner className="hidden md:flex md:w-2/5" />

      {/* 우측 로그인 폼 */}
      <LoginForm className="flex-1" />
    </View>
  );
}
