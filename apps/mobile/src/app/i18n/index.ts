import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import {i18nBankBindPageKey, i18nBankBindPageTranslations} from "../components/pages/BindBankAccountPage/i18n/translations";
import {i18nextPlugin} from 'translation-check'
import {i18nLoanDetailsPageKey, i18nLoanDetailsPageTranslations} from "../components/pages/LoanDetailsPage/i18n/translations";
import {i18nComponentsKey, i18nComponentsTranslations} from "../components/atoms/i18n/translations";
import {i18nAmountPaidModal} from "../components/modals/AmountPaidModal/i18n/tranlations";
import {i18nExtendModal} from "../components/modals/ExtendModal/i18n/tranlations";
import {i18nProductDetailModal} from "../components/modals/ProductDetailModal/i18n/tranlations";
import {i18nSubmitOrderModal} from "../components/modals/SubmitOrderModal/i18n/tranlations";
import {i18nSubmitOrderSuccessModal} from "../components/modals/SubmitOrderSuccessModal/i18n/tranlations";

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(i18nextPlugin)
  .init({
    ns: ['common', 'moduleA', 'moduleB'],
    defaultNS: 'common',
    resources: {
      en_US: {
        // NOTICE: REFACTOR ME
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
        [i18nComponentsKey]: i18nComponentsTranslations,
        [i18nLoanDetailsPageKey]: i18nLoanDetailsPageTranslations,

        [i18nAmountPaidModal.namespace]: i18nAmountPaidModal.translation.en_US,
        [i18nExtendModal.namespace]: i18nExtendModal.translation.en_US,
        [i18nProductDetailModal.namespace]: i18nProductDetailModal.translation.en_US,
        [i18nSubmitOrderModal.namespace]: i18nSubmitOrderModal.translation.en_US,
        [i18nSubmitOrderSuccessModal.namespace]: i18nSubmitOrderSuccessModal.translation.en_US,
      },
      bn_BD: {
        [i18nAmountPaidModal.namespace]: i18nAmountPaidModal.translation.bd_BD,
      }
    },

    lng: "en_US", // if you're using a language detector, do not define the lng option
    fallbackLng: "en_US",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  }, (err, t) => {
    console.log("3:", i18next.t('Welcome to React', { ns: 'common' }));
  });

