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
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../contexts/AuthContext";
import { AppProviders } from "../providers/music-player-provider";

const readexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-readex-pro",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <AppProviders>
            <Head>
              <title>MusicApp</title>
              <meta
                name="Modern music streaming experience"
                content="MusicApp is a modern music streaming platform with Spotify-like design."
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <main
              className={cn(
                readexPro.variable,
                "transition duration-500 flex-1 bg-background overflow-x-hidden",
              )}
            >
              <Component {...pageProps} />
            </main>
            <Toaster />
          </AppProviders>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}


export default appWithTranslation(MyApp);
