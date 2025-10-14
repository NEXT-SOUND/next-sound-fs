import { AuthLayout } from "@/components/auth/layout/auth-layout";
import { LoginForm } from "@/components/auth/signin-form";

export function SignInPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
