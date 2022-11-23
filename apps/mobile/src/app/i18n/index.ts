import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import {i18nBankBindAccountPage} from "../components/pages/BindBankAccountPage/i18n/translations";
import {i18nextPlugin} from 'translation-check'
import {i18nLoanDetailsPage,} from "../components/pages/LoanDetailsPage/i18n/translations";
import {i18nComponents} from "../components/components/i18n/translations";
import {i18nAmountPaidModal} from "../components/modals/AmountPaidModal/i18n/translations";
import {i18nExtendModal} from "../components/modals/ExtendModal/i18n/translations";
import {i18nProductDetailModal} from "../components/modals/ProductDetailModal/i18n/translations";
import {i18nSubmitOrderModal} from "../components/modals/SubmitOrderModal/i18n/translations";
import {i18nSubmitOrderSuccessModal} from "../components/modals/SubmitOrderSuccessModal/i18n/translations";
import {
  i18nExtensionDetailModal
} from "../components/pages/LoanDetailsPage/modal/ExtensionDetailModal/i18n/translations";
import {i18nRepaymentModal} from "../components/pages/LoanDetailsPage/modal/RepaymentModal/i18n/translations";
import {
  i18nRepaymentNoticeModal
} from "../components/pages/LoanDetailsPage/modal/RepaymentNoticeModal/i18n/translations";
import {i18nUploadPaymentReceiptPage} from "../components/pages/UploadPaymentReceiptPage/i18n/translations";
import {i18nUploadedPaymentReceiptPage} from "../components/pages/UploadedPaymentReceiptPage/i18n/translations";
import {i18nProductAdModalListPage} from "../components/pages/ProductAdModalListPage/i18n/translations";

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
            "Notice": "লক্ষ্য করুন",
            "Success": "Success!",
            "Confirm": "নিশ্চিত করুন",
          },
        },

        // NOTICE: Atoms
        [i18nComponents.namespace]: i18nComponents.translation.en_US,

        // NOTICE: Modals
        [i18nAmountPaidModal.namespace]: i18nAmountPaidModal.translation.en_US,
        [i18nExtendModal.namespace]: i18nExtendModal.translation.en_US,
        [i18nProductDetailModal.namespace]: i18nProductDetailModal.translation.en_US,
        [i18nSubmitOrderModal.namespace]: i18nSubmitOrderModal.translation.en_US,
        [i18nSubmitOrderSuccessModal.namespace]: i18nSubmitOrderSuccessModal.translation.en_US,

        // NOTICE: Pages
        // NOTE: BankBindPage
        [i18nBankBindAccountPage.namespace]: i18nBankBindAccountPage.translation.en_US,

        // NOTE: LoanDetailPage
        [i18nLoanDetailsPage.namespace]: i18nLoanDetailsPage.translation.en_US,

        // NOTE: LoanDetailsPage
        [i18nLoanDetailsPage.namespace]: i18nLoanDetailsPage.translation.en_US,
        [i18nExtensionDetailModal.namespace]: i18nExtensionDetailModal.translation.en_US,
        [i18nRepaymentModal.namespace]: i18nRepaymentModal.translation.en_US,
        [i18nRepaymentNoticeModal.namespace]: i18nRepaymentNoticeModal.translation.en_US,

        // NOTE: ProductAdModalListPage
        [i18nProductAdModalListPage.namespace]: i18nProductAdModalListPage.translation.en_US,

        // NOTE: UploadedPaymentReceiptPage
        [i18nUploadedPaymentReceiptPage.namespace]: i18nUploadedPaymentReceiptPage.translation.en_US,

        // NOTE: UploadPaymentReceiptPage
        [i18nUploadPaymentReceiptPage.namespace]: i18nUploadPaymentReceiptPage.translation.en_US,



      },
      bn_BD: {
        // NOTICE: Atoms
        [i18nComponents.namespace]: i18nComponents.translation.bn_BD,

        // NOTICE: Modals
        [i18nAmountPaidModal.namespace]: i18nAmountPaidModal.translation.bn_BD,
        [i18nExtendModal.namespace]: i18nExtendModal.translation.bn_BD,
        [i18nProductDetailModal.namespace]: i18nProductDetailModal.translation.bn_BD,
        [i18nSubmitOrderModal.namespace]: i18nSubmitOrderModal.translation.bn_BD,
        [i18nSubmitOrderSuccessModal.namespace]: i18nSubmitOrderSuccessModal.translation.bn_BD,

        // NOTICE: Pages
        // NOTE: BankBindPage
        [i18nBankBindAccountPage.namespace]: i18nBankBindAccountPage.translation.bn_BD,

        // NOTE: LoanDetailPage
        [i18nLoanDetailsPage.namespace]: i18nLoanDetailsPage.translation.bn_BD,

        // NOTE: LoanDetailsPage
        [i18nLoanDetailsPage.namespace]: i18nLoanDetailsPage.translation.bn_BD,
        // NOTE: LoanDetailsPage - Modal
        [i18nExtensionDetailModal.namespace]: i18nExtensionDetailModal.translation.bn_BD,
        [i18nRepaymentModal.namespace]: i18nRepaymentModal.translation.bn_BD,
        [i18nRepaymentNoticeModal.namespace]: i18nRepaymentNoticeModal.translation.bn_BD,

        // NOTE: ProductAdModalListPage
        [i18nProductAdModalListPage.namespace]: i18nProductAdModalListPage.translation.bn_BD,

        // NOTE: UploadedPaymentReceiptPage
        [i18nUploadedPaymentReceiptPage.namespace]: i18nUploadedPaymentReceiptPage.translation.bn_BD,

        // NOTE: UploadPaymentReceiptPage
        [i18nUploadPaymentReceiptPage.namespace]: i18nUploadPaymentReceiptPage.translation.bn_BD,


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

export {renderByCountry} from "./renderByCountry";
