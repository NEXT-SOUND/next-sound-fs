import { useAuth } from "@/services/auth/use-user";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Text } from "@/ui/text";
import { View } from "@/ui/view";
import GLOBAL_ENV from "constants/global-env";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpPage() {
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      await register(data.email, data.password, data.name);
      // 성공시 리다이렉트는 useAuth에서 처리
    } catch {
      // 에러는 useAuth에서 토스트로 처리됨
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${GLOBAL_ENV.BACKEND_URL}/auth/google`;
  };

  return (
    <View className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 px-4 py-8">
      <View className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <View className="bg-card p-8 rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm">
          {/* 헤더 */}
          <View className="text-center mb-8">
            <Text className="text-3xl font-bold text-foreground mb-2">
              계정 만들기
            </Text>
            <Text className="text-muted-foreground">
              새 계정을 만들어 시작하세요
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

          {/* 회원가입 폼 */}
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-foreground block mb-2">
                이름
              </Text>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: "이름을 입력해주세요.",
                  validate: (value) =>
                    value.trim() !== "" || "이름을 입력해주세요.",
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="홍길동"
                    className="w-full h-12 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                  />
                )}
              />
              {errors.name && (
                <Text className="text-sm text-destructive mt-1">
                  {errors.name.message}
                </Text>
              )}
            </View>

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
                    minLength: {
                      value: 6,
                      message: "비밀번호는 최소 6자 이상이어야 합니다.",
                    },
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

            <View>
              <Text className="text-sm font-medium text-foreground block mb-2">
                비밀번호 확인
              </Text>
              <View className="relative">
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: "비밀번호 확인을 입력해주세요.",
                    validate: (value) =>
                      value === password || "비밀번호가 일치하지 않습니다.",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      secureTextEntry={!showConfirmPassword}
                      value={value}
                      onChangeText={onChange}
                      placeholder="••••••••"
                      className="w-full h-12 px-3 py-2 pr-12 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                    />
                  )}
                />
                <Button
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </View>
              {errors.confirmPassword && (
                <Text className="text-sm text-destructive mt-1">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            <Button
              onPress={handleSubmit(onSubmit)}
              className="w-full h-12 px-4 py-2 mt-6 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              disabled={isLoading}
            >
              <Text>{isLoading ? "처리 중..." : "계정 만들기"}</Text>
            </Button>
          </View>

          {/* 로그인 링크 */}
          <View className="mt-6 text-center">
            <Text className="text-muted-foreground">
              이미 계정이 있으신가요?{" "}
              <Text className="text-primary font-semibold hover:underline">
                로그인
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
