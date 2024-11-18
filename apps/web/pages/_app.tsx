import Head from "next/head";
import { appWithTranslation } from "next-i18next";

import "../global.css";
import { AppProps } from "next/app";
import "raf/polyfill";
import "@/utils/i18n/i18n.web";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Instage</title>
        <meta
          name="Someone get inspired by your music"
          content="Instage is a platform for artists to showcase their work and connect with fans."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
