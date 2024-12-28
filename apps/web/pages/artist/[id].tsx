import React from "react";
import { ArtistInfo } from "@/app/screens/artist/[id]";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

//@ts-ignore: next-line
function Home() {
  const { t } = useTranslation("common");
  const { t: ogT } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta
          property="og:image"
          content="https://i.scdn.co/image/ab6761610000e5eb727a1f1f508238a20ac9fdbf"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${ogT("title")}`} />
      </Head>
      <ArtistInfo />
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "artist"])),
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
