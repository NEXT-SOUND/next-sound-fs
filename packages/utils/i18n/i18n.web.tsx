import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import i18nConfig from "../../../apps/web/next-i18next.config";

const ns = ["common"];

const resources = ns.reduce((acc: { [key: string]: any }, n) => {
  i18nConfig.i18n.locales.forEach((lng) => {
    // @ts-ignore
    acc[lng] = {
      ...acc[lng],
      [n]: require(`../../../apps/web/public/locales/${lng}/${n}.json`),
    };
  });
  return acc;
}, {});

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    lng: "en",
    fallbackLng: "en",
    ns,
    interpolation: { escapeValue: false },
    resources,
  });

export default i18n;
