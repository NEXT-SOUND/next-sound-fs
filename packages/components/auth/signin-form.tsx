import showToast from "@/lib/toast";
import { useAuth } from "@/services/auth/use-user";
import { Button } from "@/ui/button";
import Divider from "@/ui/divider";
import { Input } from "@/ui/input";
import { Bold, Description, H3 } from "@/ui/typography";
import { View } from "@/ui/view";
import { useTranslation } from "@/utils/i18n";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { Link, useLink } from "solito/link";
import Logo from "../logo";
import GoogleLoginButton from "./actions/google-login-button";

type FormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const link = useLink({ href: "/" });
  const passwordRef = React.useRef<TextInput>(null);
  const { t } = useTranslation("auth");

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

  return (
    <View className="flex justify-center items-center flex-1">
      <View className="flex flex-col gap-5 md:justify-center items-center flex-1 relative pb-[25%] px-4 w-full max-w-[412px]">
        <View className="flex flex-col relative md:bottom-0 md:py-6 py-6 pb-3 md:gap-5 gap-4 justify-center md:items-center md:w-[115%]">
          <View className="flex flex-row gap-2 items-center">
            <H3>{t("auth:welcome")}</H3>
            <Logo className="md:hidden flex" />
          </View>
          <Description>{t("auth:welcomeDescription")}</Description>
          <View className="flex flex-col gap-2 my-5 w-full">
            <GoogleLoginButton />
          </View>
          <Divider height={1} middleLabel={t("auth:or")} />
        </View>
        <View className="flex flex-col w-full justify-center gap-6 md:pb-16 pb-4 items-center">
          <View className="w-[90%]">
            <Controller
              control={control}
              name="email"
              rules={{
                required: t("auth:emailRequired"),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t("auth:emailInvalid"),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t("auth:email")}
                  size="lg"
                  placeholder={t("auth:emailPlaceholder")}
                  value={value}
                  onChangeText={onChange}
                  inputMode="email"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  error={errors.email?.message}
                />
              )}
            />
          </View>
          <View className="w-[90%]">
            <Controller
              control={control}
              name="password"
              rules={{
                required: t("auth:passwordRequired"),
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t("auth:password")}
                  size="lg"
                  placeholder={t("auth:passwordPlaceholder")}
                  value={value}
                  onChangeText={onChange}
                  isPassword
                  ref={passwordRef}
                  returnKeyType="done"
                  onSubmitEditing={() => handleSubmit(onSubmit)()}
                  error={errors.password?.message}
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
          {isLoading ? t("auth:loggingIn") : t("auth:login")}
        </Button>
        <View className="flex flex-row gap-2 flex-wrap">
          <Description>{t("auth:noAccount")}</Description>
          <Link href="/auth/sign-up">
            <Bold className="text-description hover:underline">
              {t("auth:signUp")}
            </Bold>
          </Link>
        </View>
      </View>
    </View>
  );
}