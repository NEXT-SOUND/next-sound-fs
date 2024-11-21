import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import "../global.css";
import { AppProps } from "next/app";
import "raf/polyfill";
import "@/utils/i18n/i18n.web";
import { Readex_Pro } from "next/font/google";
import ThemeProvider from "@/utils/theme/ThemeProvider.web";

const readexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-readex-pro",
});

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
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
