import * as en from "@/locales/en";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import dayjs from "dayjs";

import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.extend(advancedFormat);

export const LANGUAGES = ["en", "ko"];

export const LANGUAGE_MAP: Record<(typeof LANGUAGES)[number], string> = {
  en: "English",
  ko: "한국어",
};

const loadLocaleResource = async (language: string) => {
  let translations;
  switch (language) {
    case "ko":
      translations = await import("@/locales/ko");
      break;
    default:
      translations = await import("@/locales/en");
  }
  return translations;
};

const initI18n = async () => {
  let savedLanguage = (await AsyncStorage.getItem("language")) ?? undefined;
  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode ?? undefined;
  }

  const initialResources = await loadLocaleResource(savedLanguage);
  // dayjs.locale(LANGUAGES.includes(savedLanguage) ? savedLanguage : 'en');

  return i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
      en, // FALLBACK language
      [savedLanguage]: initialResources,
    },
    supportedLngs: LANGUAGES,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

export const changeLanguage = async (language: string) => {
  if (i18n.language === language) return;

  const translations = await loadLocaleResource(language);

  if (
    Object.keys(i18n.getDataByLanguage(language) ?? {}).length !==
    Object.keys(translations).length
  ) {
    Object.entries(translations).forEach(([key, value]) => {
      i18n.addResourceBundle(language, key, value);
    });
  }

  await i18n.changeLanguage(language);
  await AsyncStorage.setItem("language", language);
  // dayjs.locale(language);
};

initI18n();

// TODO: typescript
// TODO: dayjs locale
