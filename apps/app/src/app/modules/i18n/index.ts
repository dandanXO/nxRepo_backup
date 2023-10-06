import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';

import { i18nCoupon } from '../../ui/components/Coupon/i18n/translations';
import { i18nProduct } from '../../ui/components/Product/i18n/translations';
import { i18nAmountRepaidModal } from '../../ui/modals/AmountRepaidModal/i18n/translations';
import { i18nConfirmBindBankCardModal } from '../../ui/modals/ConfirmBindBankCardModal/i18n/translations';
import { i18nExtendConfirmModal } from '../../ui/modals/ExtendConfirmModal/translations';
import { i18nExtendModal } from '../../ui/modals/ExtendModal/translations';
import { i18nRepaymentCouponModal } from '../../ui/modals/RepaymentCouponModal/i18n/translations';
import { i18nRepaymentModal } from '../../ui/modals/RepaymentModal/i18n/translations';
import { i18nReservationProductsModal } from '../../ui/modals/ReservationProductsModal/translations';
import { i18nReservationSuccessModal } from '../../ui/modals/ReservationSuccessModal/i18n/translations';
import { i18nBankBindAccountPage } from '../../ui/pages/BindBankCardPage/translations';
import { i18nPaymentInstructionPage } from '../../ui/pages/PaymentCheckoutPage/translations';
import { i18nLoanDetailsPage } from '../../ui/pages/RepaymentDetailPage/translations';
import { i18nUploadPaymentReceiptPage } from '../../ui/pages/UploadPaymentReceiptPage/i18nPage/translations';
import { i18nUploadingFileModal } from '../../ui/pages/UploadPaymentReceiptPage/modal/UploadingFileModal/i18n/translations';
import { i18nUploadedPaymentReceiptPage } from '../../ui/pages/UploadedPaymentReceiptPage/components/i18n/translations';
import {AllCountry} from "../../../../../../libs/shared/domain/src/country/AllCountry";
import {environment} from "../../../environments/environmentModule/environment";

// NOTE: configure
i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(i18nextPlugin)
  .init(
    {
      ns: ['common', 'moduleA', 'moduleB'],
      defaultNS: 'common',
      resources: {
        en_US: {
          // NOTICE: REFACTOR ME
          common: {
            'Welcome to Mobile': 'Welcome to Mobile !!!',
            modal: {
              Error: 'Error',
              Notice: 'Notice',
              Success: 'Success!',
              Confirm: 'Confirm',
            },
          },

          // // NOTICE: Atoms
          // [i18nComponents.namespace]: i18nComponents.translation.en_US,
          //
          // // NOTICE: Modals
          // [i18nAmountPaidModal.namespace]: i18nAmountPaidModal.translation.en_US,
          // [i18nExtendModal.namespace]: i18nExtendModal.translation.en_US,
          // [i18nProductDetailModal.namespace]: i18nProductDetailModal.translation.en_US,
          // [i18nSubmitOrderModal.namespace]: i18nSubmitOrderModal.translation.en_US,
          // [i18nSubmitOrderSuccessModal.namespace]: i18nSubmitOrderSuccessModal.translation.en_US,
          // [i18nRepaymentStepsModalTranslations.namespace]: i18nRepaymentStepsModalTranslations.translation.en_US,
          //
          // // NOTICE: Pages
          // NOTE: BankBindPage
          [i18nBankBindAccountPage.namespace]:
            i18nBankBindAccountPage.translation.en_US || {},
          [i18nConfirmBindBankCardModal.namespace]:
            i18nConfirmBindBankCardModal.translation.en_US || {},
          //
          // // NOTE: LoanDetailPage
          // [i18nLoanDetailsPage.namespace]: i18nLoanDetailsPage.translation.en_US,
          //
          // NOTE: LoanDetailsPage
          [i18nLoanDetailsPage.namespace]:
            i18nLoanDetailsPage.translation.en_US || {},
          [i18nAmountRepaidModal.namespace]:
            i18nAmountRepaidModal.translation.en_US || {},
          // [i18nExtensionDetailModal.namespace]: i18nExtensionDetailModal.translation.en_US,
          [i18nRepaymentModal.namespace]:
            i18nRepaymentModal.translation.en_US || {},
          // [i18nRepaymentNoticeModal.namespace]: i18nRepaymentNoticeModal.translation.en_US,
          // [i18nRepaymentAdsModal.namespace]: i18nRepaymentAdsModal.translation.en_US,
          [i18nExtendConfirmModal.namespace]:
            i18nExtendConfirmModal.translation.en_US || {},
          [i18nExtendModal.namespace]: i18nExtendModal.translation.en_US || {},
          [i18nRepaymentCouponModal.namespace]:
            i18nRepaymentCouponModal.translation.en_US || {},
          [i18nPaymentInstructionPage.namespace]:
            i18nPaymentInstructionPage.translation.en_US || {},

          // NOTE: LoanDetailsPage - ReservationModal
          [i18nReservationProductsModal.namespace]:
            i18nReservationProductsModal.translation.en_US || {},
          [i18nReservationSuccessModal.namespace]:
            i18nReservationSuccessModal.translation.en_US || {},
          //
          // // NOTE: ProductAdModalListPage
          // [i18nProductAdModalListPage.namespace]: i18nProductAdModalListPage.translation.en_US,
          //
          // NOTE: UploadedPaymentReceiptPage
          [i18nUploadedPaymentReceiptPage.namespace]:
            i18nUploadedPaymentReceiptPage.translation.en_US || {},
          //
          // NOTE: UploadPaymentReceiptPage
          [i18nUploadPaymentReceiptPage.namespace]:
            i18nUploadPaymentReceiptPage.translation.en_US || {},
          [i18nUploadingFileModal.namespace]:
            i18nUploadingFileModal.translation.en_US || {},

          //Component
          [i18nProduct.namespace]: i18nProduct.translation.en_US || {},
          [i18nCoupon.namespace]: i18nCoupon.translation.en_US || {},
        },
        es_MX: {
          // NOTICE: REFACTOR ME
          common: {
            'Welcome to Mobile': 'Welcome to Mobile !!!',
            modal: {
              Error: 'Error',
              Notice: 'Aviso',
              Success: 'Éxito!',
              Confirm: 'Confirmar',
            },
          },

          // NOTE: BankBindPage
          [i18nBankBindAccountPage.namespace]:
            i18nBankBindAccountPage.translation.es_MX || {},
          [i18nConfirmBindBankCardModal.namespace]:
            i18nConfirmBindBankCardModal.translation.es_MX || {},

          // NOTE: LoanDetailsPage
          [i18nLoanDetailsPage.namespace]:
            i18nLoanDetailsPage.translation.es_MX || {},
          [i18nAmountRepaidModal.namespace]:
            i18nAmountRepaidModal.translation.es_MX || {},
          [i18nRepaymentModal.namespace]:
            i18nRepaymentModal.translation.es_MX || {},
          [i18nExtendConfirmModal.namespace]:
            i18nExtendConfirmModal.translation.es_MX || {},
          [i18nExtendModal.namespace]: i18nExtendModal.translation.es_MX || {},
          [i18nRepaymentCouponModal.namespace]:
            i18nRepaymentCouponModal.translation.es_MX || {},

          // NOTE: LoanDetailsPage - ReservationModal
          [i18nReservationProductsModal.namespace]:
            i18nReservationProductsModal.translation.es_MX || {},
          [i18nReservationSuccessModal.namespace]:
            i18nReservationSuccessModal.translation.es_MX || {},

          // NOTE: UploadedPaymentReceiptPage
          [i18nUploadedPaymentReceiptPage.namespace]:
            i18nUploadedPaymentReceiptPage.translation.es_MX || {},
          // NOTE: UploadPaymentReceiptPage
          [i18nUploadPaymentReceiptPage.namespace]:
            i18nUploadPaymentReceiptPage.translation.es_MX || {},
          [i18nUploadingFileModal.namespace]:
            i18nUploadingFileModal.translation.es_MX || {},

          //Component
          [i18nProduct.namespace]: i18nProduct.translation.es_MX || {},
          [i18nCoupon.namespace]: i18nCoupon.translation.es_MX || {},
        },
        bn_BD: {
          // NOTICE: REFACTOR ME
          common: {
            'Welcome to Mobile': 'Welcome to Mobile !!!',
            modal: {
              Error: 'ত্রুটি',
              Notice: 'লক্ষ্য করুন',
              Success: 'সফলতা',
              Confirm: 'নিশ্চিত করুন',
            },
          },

          // // NOTICE: Atoms
          // [i18nComponents.namespace]: i18nComponents.translation.bn_BD,
          //
          // // NOTICE: Modals
          // [i18nAmountPaidModal.namespace]: i18nAmountPaidModal.translation.bn_BD,
          // [i18nExtendModal.namespace]: i18nExtendModal.translation.bn_BD,
          // [i18nProductDetailModal.namespace]: i18nProductDetailModal.translation.bn_BD,
          // [i18nSubmitOrderModal.namespace]: i18nSubmitOrderModal.translation.bn_BD,
          // [i18nSubmitOrderSuccessModal.namespace]: i18nSubmitOrderSuccessModal.translation.bn_BD,
          // [i18nRepaymentStepsModalTranslations.namespace]: i18nRepaymentStepsModalTranslations.translation.bn_BD,
          //
          // // NOTICE: Pages
          // // NOTE: BankBindPage
          // [i18nBankBindAccountPage.namespace]: i18nBankBindAccountPage.translation.bn_BD,
          //
          // // NOTE: LoanDetailPage
          // [i18nLoanDetailsPage.namespace]: i18nLoanDetailsPage.translation.bn_BD,
          //
          // // NOTE: LoanDetailsPage
          // [i18nLoanDetailsPage.namespace]: i18nLoanDetailsPage.translation.bn_BD,
          // // NOTE: LoanDetailsPage - Modal
          // [i18nExtensionDetailModal.namespace]: i18nExtensionDetailModal.translation.bn_BD,
          // [i18nRepaymentModal.namespace]: i18nRepaymentModal.translation.bn_BD,
          // [i18nRepaymentNoticeModal.namespace]: i18nRepaymentNoticeModal.translation.bn_BD,
          // [i18nRepaymentAdsModal.namespace]: i18nRepaymentAdsModal.translation.bn_BD,
          //
          // // NOTE: ProductAdModalListPage
          // [i18nProductAdModalListPage.namespace]: i18nProductAdModalListPage.translation.bn_BD,
          //
          // // NOTE: UploadedPaymentReceiptPage
          // [i18nUploadedPaymentReceiptPage.namespace]: i18nUploadedPaymentReceiptPage.translation.bn_BD,
          //
          // // NOTE: UploadPaymentReceiptPage
          // [i18nUploadPaymentReceiptPage.namespace]: i18nUploadPaymentReceiptPage.translation.bn_BD,
          // [i18nUploadingFileModal.namespace]: i18nUploadingFileModal.translation.bn_BD,
        },
        en_PH: {
          // NOTICE: REFACTOR ME

          // NOTE: BankBindPage
          [i18nBankBindAccountPage.namespace]:
            i18nBankBindAccountPage.translation.en_PH || {},
          [i18nConfirmBindBankCardModal.namespace]:
            i18nConfirmBindBankCardModal.translation.en_PH || {},

          // NOTE: LoanDetailsPage
          [i18nRepaymentModal.namespace]:
            i18nRepaymentModal.translation.en_PH || {},
          [i18nExtendModal.namespace]: i18nExtendModal.translation.en_PH || {},
          [i18nPaymentInstructionPage.namespace]:
            i18nPaymentInstructionPage.translation.en_PH || {},

          // Component
          [i18nProduct.namespace]: i18nProduct.translation.en_PH || {},
          [i18nLoanDetailsPage.namespace]:
            i18nLoanDetailsPage.translation.en_PH || {},
        },
      },

      lng: 'en_US', // if you're using a language detector, do not define the lng option
      fallbackLng: 'en_US',

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
      // debug: true,
    },
    (err, t) => {
      // console.log("3:", i18next.t('Welcome to React', { ns: 'common' }));
    }
  );

export { renderByCountry } from './renderByCountry';

export const I18nModule = {
  initialize: () => {
    const i18Language = AllCountry.find(
      (i) => i.country === environment.country
    );
    if (i18Language) {
      i18next
        .changeLanguage(i18Language?.language)
        .then((t) => {
          // console.log("changeLanguage:", environment.countryName);
        })
        .catch((err) => {
          // console.log("changeLanguage:", environment.countryName);
          // console.log("error:", err);
          const error = new Error();
          error.name = 'changeLanguage';
          if (err) error.message = JSON.stringify(err);
          // if (AppFlag.enableSentry) {
          //     Sentry.captureException(error);
          // }
        });
    }
  },
};
