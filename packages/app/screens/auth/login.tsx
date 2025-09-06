import * as React from 'react';
import { Linking, Platform } from 'react-native';
import { 
  Button, 
  Input, 
  SocialButton, 
  Logo, 
  GoogleIcon, 
  GithubIcon, 
  View, 
  Text 
} from '@/ui';
import { Mail, Lock } from "lucide-react";
import { useSafeArea } from '@/utils/safe-area';
import GLOBAL_ENV from "constants/globalEnv";

interface LoginScreenProps {
  onLogin?: (email: string, password: string) => Promise<void>;
  onNavigateToRegister?: () => void;
  onNavigateToForgotPassword?: () => void;
  isLoading?: boolean;
  isWeb?: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onNavigateToRegister,
  onNavigateToForgotPassword,
  isLoading = false,
  isWeb = Platform.OS === 'web',
}) => {
  const { top, bottom } = useSafeArea();
  
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

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

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      await onLogin?.(formData.email, formData.password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSocialLogin = (provider: string) => {
    const url = `${GLOBAL_ENV.BACKEND_URL}/auth/${provider}`;
    
    if (isWeb) {
      window.location.href = url;
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View 
      className="flex-1 bg-gradient-to-br from-spotify-black via-spotify-dark-gray to-spotify-gray"
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      {/* Background Pattern */}
      <View className="absolute inset-0 bg-gradient-to-br from-spotify-green/5 via-transparent to-transparent" />
      <View className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(29,185,84,0.1),transparent_50%)]" />
      
      {/* Scrollable Content */}
      <View className="flex-1 px-4 native:px-6 py-8 web:py-12">
        <View className="flex-1 justify-center max-w-md mx-auto w-full web:max-w-lg web:animate-in web:fade-in-0 web:slide-in-from-bottom-4 web:duration-700">
          {/* Logo and Header */}
          <View className="items-center mb-8 native:mb-12">
            <View className="mb-6 native:mb-8">
              <Logo 
                size={isWeb ? "xl" : "lg"}
                variant="spotify" 
                text="MusicApp" 
                className="text-white"
              />
            </View>
            <Text className="text-3xl native:text-4xl font-bold text-white mb-2 native:mb-3 text-center">
              로그인하여 시작하세요
            </Text>
            <Text className="text-spotify-light-gray text-base native:text-lg text-center">
              수백만 곡이 기다리고 있습니다
            </Text>
          </View>

          <View className="bg-spotify-dark-gray/80 web:backdrop-blur-xl p-6 native:p-8 web:p-10 rounded-2xl border border-white/10 web:shadow-2xl">
            {/* Social Login Buttons */}
            <View className="space-y-3 native:space-y-4 mb-6 native:mb-8">
              <SocialButton
                variant="google"
                size={isWeb ? "lg" : "default"}
                icon={<GoogleIcon />}
                onPress={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="w-full"
              >
                Google로 계속하기
              </SocialButton>
              
              <SocialButton
                variant="github"
                size={isWeb ? "lg" : "default"}
                icon={<GithubIcon />}
                onPress={() => handleSocialLogin('github')}
                disabled={isLoading}
                className="w-full"
              >
                GitHub로 계속하기
              </SocialButton>
            </View>

            {/* Divider */}
            <View className="relative mb-6 native:mb-8">
              <View className="absolute inset-0 flex items-center">
                <View className="w-full border-t border-white/20" />
              </View>
              <View className="relative flex justify-center">
                <Text className="bg-spotify-dark-gray px-4 text-spotify-light-gray text-sm uppercase tracking-wide font-medium">
                  또는
                </Text>
              </View>
            </View>

            {/* Login Form */}
            <View className="space-y-4 native:space-y-6">
              <Input
                label="이메일 주소"
                type="email"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                placeholder="이메일을 입력하세요"
                error={errors.email}
                leftIcon={<Mail className="w-5 h-5 text-spotify-light-gray" />}
                variant="spotify"
                size={isWeb ? "lg" : "default"}
              />

              <Input
                label="비밀번호"
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                placeholder="비밀번호를 입력하세요"
                error={errors.password}
                leftIcon={<Lock className="w-5 h-5 text-spotify-light-gray" />}
                showPasswordToggle
                variant="spotify"
                size={isWeb ? "lg" : "default"}
              />

              <View className="flex justify-end">
                <Button
                  variant="link"
                  onPress={onNavigateToForgotPassword}
                  className="self-end"
                >
                  <Text className="text-sm text-spotify-green">
                    비밀번호를 잊으셨나요?
                  </Text>
                </Button>
              </View>

              <Button
                variant="spotify"
                size={isWeb ? "xl" : "lg"}
                radius="full"
                loading={isLoading}
                disabled={isLoading}
                onPress={handleSubmit}
                className="w-full bg-spotify-green web:hover:bg-spotify-green-hover text-black font-bold mt-4"
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </View>

            {/* Sign Up Link */}
            <View className="mt-6 native:mt-8 pt-4 native:pt-6 border-t border-white/10 items-center">
              <View className="flex-row items-center">
                <Text className="text-spotify-light-gray">
                  MusicApp이 처음이신가요?{" "}
                </Text>
                <Button
                  variant="link"
                  onPress={onNavigateToRegister}
                  className="p-0"
                >
                  <Text className="text-spotify-green font-semibold">
                    가입하기
                  </Text>
                </Button>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View className="mt-6 native:mt-8 items-center">
            <Text className="text-xs text-spotify-light-gray text-center px-4">
              로그인하면 MusicApp의 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};