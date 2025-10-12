import { LoginForm } from "@/components/auth/login-form";
import { SidebarBanner } from "@/components/auth/sidebar-banner";
import Logo from "@/components/logo";
import { Small } from "@/ui/typography";
import { View } from "@/ui/view";

export function SignInPage() {
  return (
    <View className="min-h-screen flex flex-row">
      <View className="md:hidden flex-1 absolute p-3 w-full border-b border-border flex flex-row gap-2 items-center">
        <Logo size="xl" />
        <Small className="text-black-50">Next Music Cloud</Small>
      </View>
      {/* 좌측 사이드 배너 - 데스크톱에서만 표시 */}
      <SidebarBanner className="hidden md:flex md:w-2/5" />

      {/* 우측 로그인 폼 */}
      <LoginForm />
    </View>
  );
}
