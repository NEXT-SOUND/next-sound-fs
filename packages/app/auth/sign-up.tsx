import { AuthLayout } from "@/components/auth/layout/auth-layout";
import { SignUpForm } from "@/components/auth/signup-form";

export function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
