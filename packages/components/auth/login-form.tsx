import showToast from "@/lib/toast";
import { useAuth } from "@/services/auth/use-user";
import { Button } from "@/ui/button";
import Divider from "@/ui/divider";
import { Input } from "@/ui/input";
import { H3, P } from "@/ui/typography";
import { View } from "@/ui/view";
import GLOBAL_ENV from "constants/global-env";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { SolitoImage } from "solito/image";
import { Link, useLink } from "solito/link";

type FormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const link = useLink({ href: "/" });

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
    <View className="flex justify-center items-center flex-1">
      <View className="flex flex-col gap-5 justify-center items-center flex-1">
        <H3 className="text-black-60">Sign In Account</H3>
        <P className="text-black-50 font-mont">
          To create a fan page for you or your favorite artist
        </P>
        <View className="flex flex-col gap-2 my-5">
          <Button
            onPress={handleGoogleLogin}
            disabled={isLoading}
            variant="outline"
            className="h-12 web:px-6 native:px-4 font-montBold text-black-60 text-sm"
            radius="2xl"
          >
            <SolitoImage
              src="/google.svg"
              width={21}
              height={20}
              alt="google"
            />
            Google
          </Button>
        </View>
        <Divider height={1} middleLabel="Or" />
        <View className="flex flex-col w-full justify-center py-12 gap-6">
          <View className="w-full">
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
                  label="Email"
                  size="lg"
                  placeholder="your@email.com"
                  value={value}
                  onChangeText={onChange}
                  inputMode="email"
                />
              )}
            />
            {errors.email && (
              <P className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </P>
            )}
          </View>
          <View className="w-full">
            <Controller
              control={control}
              name="password"
              rules={{
                required: "비밀번호를 입력해주세요.",
              }}
              render={({ field: { onChange, value } }) => (
                <View className="relative">
                  <Input
                    label="Password"
                    size="lg"
                    placeholder="••••••••"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                  />
                  <Button
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-placeholder p-1"
                    variant="ghost"
                    size="sm"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-placeholder" />
                    ) : (
                      <Eye className="w-4 h-4 text-placeholder" />
                    )}
                  </Button>
                </View>
              )}
            />
            {errors.password && (
              <P className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </P>
            )}
          </View>
        </View>
        <Button
          size="xl"
          onPress={handleSubmit(onSubmit)}
          className="text-base w-full"
          disabled={isLoading}
        >
          {isLoading ? "로그인 중..." : "Login"}
        </Button>
        <View className="flex flex-row gap-2 flex-wrap">
          <P className="text-black-50 font-mont">Don&apos;t have an account?</P>
          <Link href="/auth/sign-up">
            <P className="font-montBold text-black-60 hover:underline">
              Sign up
            </P>
          </Link>
        </View>
      </View>
    </View>
  );
}