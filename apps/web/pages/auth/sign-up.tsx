import { SignUpPage } from "@/app/auth/sign-up";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

//@ts-ignore: next-line
function Register() {
  const { t } = useTranslation("common");
  const { t: authT } = useTranslation("auth");
  const router = useRouter();

  // URL 파라미터에서 오류 메시지 처리
  React.useEffect(() => {
    const { error } = router.query;
    if (error) {
      let errorMessage = "";
      switch (error) {
        case "cancelled":
          errorMessage = "회원가입이 취소되었습니다.";
          break;
        case "oauth_failed":
          errorMessage = "OAuth 회원가입에 실패했습니다. 다시 시도해주세요.";
          break;
        case "signup_failed":
          errorMessage = "회원가입 처리 중 오류가 발생했습니다.";
          break;
        default:
          errorMessage = "회원가입 중 오류가 발생했습니다.";
      }

      // 토스트 메시지 표시 (react-hot-toast가 설치되어 있다면)
      if (typeof window !== "undefined") {
        import("react-hot-toast").then(({ default: toast }) => {
          toast.error(errorMessage);
        });
      }

      // URL에서 error 파라미터 제거
      router.replace("/auth/sign-up", undefined, { shallow: true });
    }
  }, [router]);

  const title = `${t("title")} - ${authT("signup")}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content="https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <SignUpPage />
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "auth"])),
    },
  };
}

export default Register;
