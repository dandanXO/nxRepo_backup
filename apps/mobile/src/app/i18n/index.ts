import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import { i18nBankBindPageKey, i18nBankBindPageTranslations } from "../pages/BindBankAccountPage/i18n/translations";
import { i18nextPlugin } from 'translation-check'

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(i18nextPlugin)
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
        [i18nBankBindPageKey.CommonKey]: [i18nBankBindPageTranslations[i18nBankBindPageKey.CommonKey]],
        [i18nBankBindPageKey.IndiaKey]: [i18nBankBindPageTranslations[i18nBankBindPageKey.IndiaKey]],
        [i18nBankBindPageKey.PakistanKey]: [i18nBankBindPageTranslations[i18nBankBindPageKey.PakistanKey]],
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

