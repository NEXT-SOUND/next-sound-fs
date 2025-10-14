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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm() {
  const { register, isLoading } = useAuth();
  const link = useLink({ href: "/" });
  const emailRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);
  const confirmPasswordRef = React.useRef<TextInput>(null);
  const { t } = useTranslation("auth");

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
            <H3>{t("auth:signupWelcome")}</H3>
            <Logo className="md:hidden flex" />
          </View>
          <Description>{t("auth:signupWelcomeDescription")}</Description>
          <View className="flex flex-col gap-2 my-5 w-full">
            <GoogleLoginButton />
          </View>
          <Divider height={1} middleLabel={t("auth:or")} />
        </View>
        <View className="flex flex-col w-full justify-center gap-6 md:pb-16 pb-4 items-center">
          <View className="w-[90%]">
            <Controller
              control={control}
              name="name"
              rules={{
                required: t("auth:nameRequired"),
                validate: (value) =>
                  value.trim() !== "" || t("auth:nameRequired"),
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t("auth:name")}
                  size="lg"
                  placeholder={t("auth:namePlaceholder")}
                  value={value}
                  onChangeText={onChange}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => emailRef.current?.focus()}
                  error={errors.name?.message}
                />
              )}
            />
          </View>
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
                  ref={emailRef}
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
                minLength: {
                  value: 6,
                  message: t("auth:passwordMinLength"),
                },
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
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  error={errors.password?.message}
                />
              )}
            />
          </View>
          <View className="w-[90%]">
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: t("auth:confirmPasswordRequired"),
                validate: (value) =>
                  value === password || t("auth:passwordMismatch"),
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t("auth:confirmPassword")}
                  size="lg"
                  placeholder={t("auth:confirmPasswordPlaceholder")}
                  value={value}
                  onChangeText={onChange}
                  isPassword
                  ref={confirmPasswordRef}
                  returnKeyType="done"
                  onSubmitEditing={() => handleSubmit(onSubmit)()}
                  helperText={t("auth:passwordRule")}
                  error={errors.confirmPassword?.message}
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
          {isLoading ? t("auth:signingUp") : t("auth:createAccount")}
        </Button>
        <View className="flex flex-row gap-2 flex-wrap">
          <Description>{t("auth:hasAccount")}</Description>
          <Link href="/auth/sign-in">
            <Bold className="text-description hover:underline">
              {t("auth:login")}
            </Bold>
          </Link>
        </View>
      </View>
    </View>
  );
}
