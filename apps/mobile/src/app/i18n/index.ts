import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import { i18nBankBindPageTranslationKey, i18nBankBindPageTranslations } from "../pages/BindBankAccountPage/i18n/i18nTranslations";

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: ['common', 'moduleA', 'moduleB'],
    defaultNS: 'common',
    resources: {
      en: {
        common: {
          "Welcome to Mobile": "Welcome to Mobile !!!",
          modal: {
            "Error": "Error",
            "Notice": "Notice",
            "Success": "Success!",
            "Confirm": "Confirm",
          },
        },
        [i18nBankBindPageTranslationKey.BankBindPageKey]: [i18nBankBindPageTranslations[i18nBankBindPageTranslationKey.BankBindPageKey]],
        [i18nBankBindPageTranslationKey.BankBindPageForIndiaKey]: [i18nBankBindPageTranslations[i18nBankBindPageTranslationKey.BankBindPageForIndiaKey]],
      },
    },

    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  }, (err, t) => {
    console.log("3:", i18next.t('Welcome to React', { ns: 'common' }));
  });

