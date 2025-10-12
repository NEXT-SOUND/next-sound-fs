import { SignUpPage } from "@/app/auth/sign-up";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

//@ts-ignore: next-line
function Register() {
  const { t } = useTranslation("common");
  const { t: ogT } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("title")} - 회원가입</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${ogT("title")} - 회원가입`} />
      </Head>
      <SignUpPage />
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Register;
