import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { authApi } from '../../lib/api';
import toast from 'react-hot-toast';
import { Mail, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';

const VerifyEmailPage = () => {
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = React.useState<'pending' | 'verifying' | 'success' | 'error'>('pending');
  const [isResending, setIsResending] = React.useState(false);
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    const { token } = router.query;
    
    if (token && typeof token === 'string') {
      verifyEmailToken(token);
    }
  }, [router.query]);

  const verifyEmailToken = async (token: string) => {
    setVerificationStatus('verifying');
    
    try {
      const response = await authApi.verifyEmail(token);
      setVerificationStatus('success');
      toast.success(response.message || '이메일 인증이 완료되었습니다.');
      
      // 3초 후 로그인 페이지로 리다이렉트
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
      
    } catch (error: any) {
      setVerificationStatus('error');
      const errorMessage = error.response?.data?.message || '이메일 인증에 실패했습니다.';
      toast.error(errorMessage);
    }
  };

  const handleResendEmail = async () => {
    if (!email.trim()) {
      toast.error('이메일을 입력해주세요.');
      return;
    }

    setIsResending(true);
    
    try {
      const response = await authApi.resendVerification(email);
      toast.success(response.message || '인증 이메일을 다시 발송했습니다.');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '이메일 발송에 실패했습니다.';
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'verifying':
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <RotateCcw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              인증 처리 중...
            </h1>
            <p className="text-muted-foreground">
              이메일 인증을 처리하고 있습니다. 잠시만 기다려주세요.
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              인증 완료!
            </h1>
            <p className="text-muted-foreground mb-6">
              이메일 인증이 성공적으로 완료되었습니다.
              곧 로그인 페이지로 이동합니다.
            </p>
            <Link 
              href="/auth/login"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              로그인 하기
            </Link>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              인증 실패
            </h1>
            <p className="text-muted-foreground mb-6">
              이메일 인증에 실패했습니다. 인증 링크가 유효하지 않거나 만료되었을 수 있습니다.
            </p>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소를 입력하세요"
                  className="w-full h-12 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                />
              </div>
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full h-12 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isResending ? '발송 중...' : '인증 이메일 다시 받기'}
              </button>
              <Link 
                href="/auth/login"
                className="block text-center text-primary hover:underline"
              >
                로그인 페이지로 돌아가기
              </Link>
            </div>
          </div>
        );

      default: // pending
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              이메일을 확인하세요
            </h1>
            <p className="text-muted-foreground mb-6">
              회원가입이 완료되었습니다. 이메일로 발송된 인증 링크를 클릭하여 계정을 활성화하세요.
            </p>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소를 입력하세요"
                  className="w-full h-12 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                />
              </div>
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full h-12 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isResending ? '발송 중...' : '인증 이메일 다시 받기'}
              </button>
              <Link 
                href="/auth/login"
                className="block text-center text-primary hover:underline"
              >
                로그인 페이지로 돌아가기
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card p-8 rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;