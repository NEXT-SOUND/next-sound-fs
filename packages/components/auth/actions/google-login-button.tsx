import { useAuth } from '@/services/auth/use-user';
import { Button } from '@/ui/button';
import { useTranslation } from '@/utils/i18n';
import GLOBAL_ENV from 'constants/global-env';
import { SolitoImage } from 'solito/image';

const GoogleLoginButton = () => {
    const { isLoading } = useAuth();
    const { t } = useTranslation("auth");

  const handleGoogleLogin = () => {
    window.location.href = `${GLOBAL_ENV.BACKEND_URL}/auth/google`;
  };

  return (
    <Button
      onPress={handleGoogleLogin}
      disabled={isLoading}
      variant="outline"
      className="h-12 web:px-6 native:px-4 text-black-60 text-sm w-[48%]"
      radius="2xl"
    >
      {/* @ts-ignore */}
      <SolitoImage src="/google.svg" width={21} height={20} alt="google" />
      {t("auth:google")}
    </Button>
  );
};

export default GoogleLoginButton;