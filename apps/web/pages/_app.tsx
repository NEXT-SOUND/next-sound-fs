import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import "../global.css";
import { AppProps } from "next/app";
import "raf/polyfill";
import "@/utils/i18n/i18n.web";
import { Readex_Pro } from "next/font/google";
import ThemeProvider from "@/utils/theme/ThemeProvider.web";
import { cn } from "@/ui/utils/cn";
import { Button } from "@/ui/button";
import { useColorScheme } from "@/utils/theme/useColorSchema";

const readexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-readex-pro",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <Head>
          <title>Instage</title>
          <meta
            name="Someone get inspired by your music"
            content="Instage is a platform for artists to showcase their work and connect with fans."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main
          className={cn(
            readexPro.variable,
            "transition duration-500 flex-1 bg-background",
          )}
        >
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}


export default appWithTranslation(MyApp);
