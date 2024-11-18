import React from "react";
import { ArtistInfo } from "app/screens/artist/info";
import { useTranslation, I18nextProvider } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
// export default HomeScreen;

//@ts-ignore: next-line
function Home() {
    const { t, ready, i18n } = useTranslation("common");
    
  return (
    <>
      <Head>
        <title>{t("title")} | Instage</title>
        <meta
          property="og:image"
          content="https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${t("title")} | Instage`} />
      </Head>
      <ArtistInfo />
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default Home;
