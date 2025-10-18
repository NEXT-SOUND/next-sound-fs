import { AuthLayout } from "@/components/auth/layout/auth-layout";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";

interface VerifyEmailPageProps {
  token?: string;
}

export function VerifyEmailPage({ token }: VerifyEmailPageProps) {
  return (
    <AuthLayout>
      <VerifyEmailForm token={token} />
    </AuthLayout>
  );
}






