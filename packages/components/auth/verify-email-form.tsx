import showToast from "@/lib/toast";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Bold, Description, H3 } from "@/ui/typography";
import { View } from "@/ui/view";
import { useTranslation } from "@/utils/i18n";
import { AlertCircle, CheckCircle, Mail, RotateCcw } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLink } from "solito/link";

type FormData = {
  email: string;
};

interface VerifyEmailFormProps {
  token?: string;
}

export function VerifyEmailForm({ token }: VerifyEmailFormProps) {
  const link = useLink({ href: "/" });
  const { t } = useTranslation("auth");
  const [verificationStatus, setVerificationStatus] = React.useState<
    "pending" | "verifying" | "success" | "error"
  >("pending");
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  // 이메일 인증 API 호출
  const verifyEmail = async (tokenValue: string) => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${tokenValue}`, {
        method: "GET",
      });
      
      if (!response.ok) {
        throw new Error("이메일 인증에 실패했습니다.");
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  // 인증 이메일 재전송 API 호출
  const resendVerificationEmail = async (email: string) => {
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error("이메일 발송에 실패했습니다.");
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const verifyEmailToken = React.useCallback(
    async (tokenValue: string) => {
      setVerificationStatus("verifying");

      try {
        const response = await verifyEmail(tokenValue);
        setVerificationStatus("success");
        showToast(response.message || "이메일 인증이 완료되었습니다.");

        // 3초 후 홈페이지로 리다이렉트
        setTimeout(() => {
          link.onPress();
        }, 3000);
      } catch (error: any) {
        setVerificationStatus("error");
        const errorMessage =
          error.message || "이메일 인증에 실패했습니다.";
        showToast(errorMessage);
      }
    },
    [link],
  );

  React.useEffect(() => {
    if (token && typeof token === "string") {
      verifyEmailToken(token);
    }
  }, [token, verifyEmailToken]);

  const onSubmit = async (data: FormData) => {
    if (!data.email.trim()) {
      showToast("이메일을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await resendVerificationEmail(data.email);
      showToast(response.message || "인증 이메일을 다시 발송했습니다.");
    } catch (error: any) {
      const errorMessage =
        error.message || "이메일 발송에 실패했습니다.";
      showToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case "verifying":
        return (
          <View className="flex justify-center items-center flex-1">
            <View className="flex flex-col gap-5 md:justify-center items-center flex-1 relative pb-[25%] px-4 w-full max-w-[412px]">
              <View className="flex flex-col relative md:bottom-0 md:py-6 py-6 pb-3 md:gap-5 gap-4 justify-center md:items-center md:w-[115%]">
                <View className="flex items-center justify-center mb-6">
                  <View className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <RotateCcw className="w-8 h-8 text-blue-600 animate-spin" />
                  </View>
                  <H3 className="text-center mb-2">인증 처리 중...</H3>
                  <Description className="text-center">
                    이메일 인증을 처리하고 있습니다. 잠시만 기다려주세요.
                  </Description>
                </View>
              </View>
            </View>
          </View>
        );

      case "success":
        return (
          <View className="flex justify-center items-center flex-1">
            <View className="flex flex-col gap-5 md:justify-center items-center flex-1 relative pb-[25%] px-4 w-full max-w-[412px]">
              <View className="flex flex-col relative md:bottom-0 md:py-6 py-6 pb-3 md:gap-5 gap-4 justify-center md:items-center md:w-[115%]">
                <View className="flex items-center justify-center mb-6">
                  <View className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </View>
                  <H3 className="text-center mb-2">인증 완료!</H3>
                  <Description className="text-center mb-6">
                    이메일 인증이 성공적으로 완료되었습니다.
                    곧 홈페이지로 이동합니다.
                  </Description>
                </View>
              </View>
              <Link href="/">
                <Button size="xl" className="text-base w-full">
                  홈으로 가기
                </Button>
              </Link>
            </View>
          </View>
        );

      case "error":
        return (
          <View className="flex justify-center items-center flex-1">
            <View className="flex flex-col gap-5 md:justify-center items-center flex-1 relative pb-[25%] px-4 w-full max-w-[412px]">
              <View className="flex flex-col relative md:bottom-0 md:py-6 py-6 pb-3 md:gap-5 gap-4 justify-center md:items-center md:w-[115%]">
                <View className="flex items-center justify-center mb-6">
                  <View className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </View>
                  <H3 className="text-center mb-2">인증 실패</H3>
                  <Description className="text-center mb-6">
                    이메일 인증에 실패했습니다. 인증 링크가 유효하지 않거나 만료되었을
                    수 있습니다.
                  </Description>
                </View>
              </View>
              <View className="flex flex-col w-full justify-center gap-6 md:pb-16 pb-4 items-center">
                <View className="w-[90%]">
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
                        label="이메일"
                        size="lg"
                        placeholder="이메일 주소를 입력하세요"
                        value={value}
                        onChangeText={onChange}
                        inputMode="email"
                        returnKeyType="done"
                        onSubmitEditing={() => handleSubmit(onSubmit)()}
                        error={errors.email?.message}
                      />
                    )}
                  />
                </View>
              </View>
              <Button
                size="xl"
                onPress={handleSubmit(onSubmit)}
                className="text-base w-full"
                disabled={isLoading}
              >
                {isLoading
                  ? "발송 중..."
                  : "인증 이메일 다시 받기"}
              </Button>
              <View className="flex flex-row gap-2 flex-wrap">
                <Link href="/auth/sign-in">
                  <Bold className="text-description hover:underline">
                    로그인 페이지로 돌아가기
                  </Bold>
                </Link>
              </View>
            </View>
          </View>
        );

      default: // pending
        return (
          <View className="flex justify-center items-center flex-1">
            <View className="flex flex-col gap-5 md:justify-center items-center flex-1 relative pb-[25%] px-4 w-full max-w-[412px]">
              <View className="flex flex-col relative md:bottom-0 md:py-6 py-6 pb-3 md:gap-5 gap-4 justify-center md:items-center md:w-[115%]">
                <View className="flex items-center justify-center mb-6">
                  <View className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </View>
                  <H3 className="text-center mb-2">이메일을 확인하세요</H3>
                  <Description className="text-center mb-6">
                    회원가입이 완료되었습니다. 이메일로 발송된 인증 링크를 클릭하여
                    계정을 활성화하세요.
                  </Description>
                </View>
              </View>
              <View className="flex flex-col w-full justify-center gap-6 md:pb-16 pb-4 items-center">
                <View className="w-[90%]">
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
                        label="이메일"
                        size="lg"
                        placeholder="이메일 주소를 입력하세요"
                        value={value}
                        onChangeText={onChange}
                        inputMode="email"
                        returnKeyType="done"
                        onSubmitEditing={() => handleSubmit(onSubmit)()}
                        error={errors.email?.message}
                      />
                    )}
                  />
                </View>
              </View>
              <Button
                size="xl"
                onPress={handleSubmit(onSubmit)}
                className="text-base w-full"
                disabled={isLoading}
              >
                {isLoading
                  ? "발송 중..."
                  : "인증 이메일 다시 받기"}
              </Button>
              <View className="flex flex-row gap-2 flex-wrap">
                <Link href="/auth/sign-in">
                  <Bold className="text-description hover:underline">
                    로그인 페이지로 돌아가기
                  </Bold>
                </Link>
              </View>
            </View>
          </View>
        );
    }
  };

  return renderContent();
}
