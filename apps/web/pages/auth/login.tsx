import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../../contexts/AuthContext';

import { Eye, EyeOff, Github } from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();
  const { login, isLoading, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }
    
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (error) {
      // 에러는 useAuth에서 토스트로 처리됨
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/github`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 px-4">
      <div className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="bg-card p-8 rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              환영합니다
            </h1>
            <p className="text-muted-foreground">
              계정에 로그인하여 계속하세요
            </p>
          </div>

          {/* OAuth 버튼들 */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 px-4 py-2 bg-background border border-border rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <div className="w-5 h-5 bg-red-500 rounded-full" />
              <span>Google로 계속하기</span>
            </button>
            
            <button
              type="button"
              onClick={handleGithubLogin}
              disabled={isLoading}
              className="w-full h-12 px-4 py-2 bg-background border border-border rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Github className="w-5 h-5" />
              <span>GitHub로 계속하기</span>
            </button>
          </div>

          {/* 구분선 */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                또는
              </span>
            </div>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                이메일
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                className="w-full h-12 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-3 py-2 pr-12 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                비밀번호를 잊으셨나요?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full h-12 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          {/* 회원가입 링크 */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              계정이 없으신가요?{' '}
              <Link href="/auth/register" className="text-primary font-semibold hover:underline">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;