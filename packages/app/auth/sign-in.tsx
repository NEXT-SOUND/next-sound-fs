import { LoginForm } from "@/components/auth/login-form";
import AuthPageHeader from "@/components/auth/page-header";
import { SidebarBanner } from "@/components/auth/sidebar-banner";
import { View } from "@/ui/view";

export function SignInPage() {
  return (
    <View className="min-h-screen flex flex-row">
      {/* Left Side Banner - Only show on desktop */}
      <SidebarBanner className="hidden md:flex md:w-2/5" />
      {/* Right Login Form */}
      <View className="flex-1">
        <AuthPageHeader />
        <LoginForm />
      </View>
    </View>
  );
}
