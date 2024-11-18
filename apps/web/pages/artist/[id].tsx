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
      </Head>
      <ArtistInfo />
    </>
  );
}

export async function getStaticProps({ locale }) {
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
