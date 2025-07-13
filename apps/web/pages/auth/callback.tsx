import * as React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const AuthCallbackPage = () => {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const [isProcessing, setIsProcessing] = React.useState(true);

  React.useEffect(() => {
    const handleCallback = async () => {
      try {
        // 백엔드에서 인증 처리 후 리다이렉트되므로 세션 확인
        await checkAuth();
        
        // URL에서 에러 파라미터 확인
        const { error, error_description } = router.query;
        
        if (error) {
          const errorMessage = error_description as string || '로그인에 실패했습니다.';
          toast.error(errorMessage);
          router.push('/auth/login');
          return;
        }
        
        // 성공적으로 로그인된 경우
        toast.success('로그인에 성공했습니다!');
        router.push('/');
        
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('로그인 처리 중 오류가 발생했습니다.');
        router.push('/auth/login');
      } finally {
        setIsProcessing(false);
      }
    };

    // router.isReady가 true일 때만 실행
    if (router.isReady) {
      handleCallback();
    }
  }, [router.isReady, router.query, checkAuth, router]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-lg font-semibold text-foreground mb-2">
            로그인 처리 중...
          </h2>
          <p className="text-muted-foreground">
            잠시만 기다려주세요.
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallbackPage;