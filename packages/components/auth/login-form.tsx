import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import GLOBAL_ENV from "constants/global-env";
import { SIDE_BANNER_ASSETS } from "constants/side-banner-aseets";
import { useAuth } from "@/services/auth/use-user";
import { View } from "@/ui/view";
import { Text } from "@/ui/text";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useLink } from "solito/link";
import showToast from "@/lib/toast";
import { SolitoImage } from "solito/image";

type FormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const link = useLink({ href: "/" });
  
  // 랜덤 배너 선택 (모바일용)
  const [randomBanner] = React.useState(() => {
    const randomIndex = Math.floor(Math.random() * SIDE_BANNER_ASSETS.length);
    return SIDE_BANNER_ASSETS[randomIndex];
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      link.onPress();
    } catch (error: any) {
      showToast(error.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${GLOBAL_ENV.BACKEND_URL}/auth/google`;
  };

  return (
    <View className={`flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4 lg:p-8 ${className || ""}`}>
      <View className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        {/* 모바일에서만 표시되는 로고 */}
        <View className="lg:hidden text-center mb-8">
          <SolitoImage
            src={randomBanner?.image || "/side-banner-1.png"}
            alt="logo"
            width={80}
            height={80}
          />
          <Text className="text-2xl font-bold text-foreground mb-2">
            환영합니다
          </Text>
          <Text className="text-muted-foreground">
            계정에 로그인하여 계속하세요
          </Text>
        </View>

        <View className="bg-card p-6 lg:p-8 rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm">
          {/* 데스크톱에서만 표시되는 헤더 */}
          <View className="hidden lg:block text-center mb-8">
            <Text className="text-3xl font-bold text-foreground mb-2">
              환영합니다
            </Text>
            <Text className="text-muted-foreground">
              계정에 로그인하여 계속하세요
            </Text>
          </View>

          {/* OAuth 버튼들 */}
          <View className="space-y-3 mb-6">
            <Button
              onPress={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 px-4 py-2 bg-background border border-border rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <View className="w-5 h-5 bg-red-500 rounded-full" />
              <Text>Google로 계속하기</Text>
            </Button>
          </View>

          {/* 구분선 */}
          <View className="relative mb-6">
            <View className="absolute inset-0 flex items-center">
              <View className="w-full border-t border-border" />
            </View>
            <View className="relative flex justify-center text-xs uppercase">
              <Text className="bg-card px-2 text-muted-foreground">또는</Text>
            </View>
          </View>

          {/* 로그인 폼 */}
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-foreground block mb-2">
                이메일
              </Text>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "올바른 이메일 형식을 입력해주세요.",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    inputMode="email"
                    value={value}
                    onChangeText={onChange}
                    placeholder="your@email.com"
                    className="w-full h-12 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </Text>
              )}
            </View>

            <View>
              <Text className="text-sm font-medium text-foreground block mb-2">
                비밀번호
              </Text>
              <View className="relative">
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "비밀번호를 입력해주세요.",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      secureTextEntry={!showPassword}
                      value={value}
                      onChangeText={onChange}
                      placeholder="••••••••"
                      className="w-full h-12 px-3 py-2 pr-12 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                    />
                  )}
                />
                <Button
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </View>
              {errors.password && (
                <Text className="text-sm text-destructive mt-1">
                  {errors.password.message}
                </Text>
              )}
            </View>

            <View className="flex justify-end">
              <Text className="text-sm text-primary hover:underline">
                비밀번호를 잊으셨나요?
              </Text>
            </View>

            <Button
              onPress={handleSubmit(onSubmit)}
              className="w-full h-12 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              disabled={isLoading}
            >
              <Text>{isLoading ? "로그인 중..." : "로그인"}</Text>
            </Button>
          </View>

          {/* 회원가입 링크 */}
          <View className="mt-6 text-center">
            <Text className="text-muted-foreground">
              계정이 없으신가요?{" "}
              <Text className="text-primary font-semibold hover:underline">
                회원가입
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
