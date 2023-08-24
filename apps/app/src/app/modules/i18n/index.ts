import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';
import { i18nExtendConfirmModal } from '../../presentation/modals/ExtendConfirmModal/translations';
import { i18nExtendModal } from '../../presentation/modals/ExtendModal/translations';
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
          // // NOTE: BankBindPage
          // [i18nBankBindAccountPage.namespace]: i18nBankBindAccountPage.translation.en_US,
          //
          // // NOTE: LoanDetailPage
          // [i18nLoanDetailsPage.namespace]: i18nLoanDetailsPage.translation.en_US,
          //
          // // NOTE: LoanDetailsPage
          // [i18nLoanDetailsPage.namespace]: i18nLoanDetailsPage.translation.en_US,
          // [i18nExtensionDetailModal.namespace]: i18nExtensionDetailModal.translation.en_US,
          // [i18nRepaymentModal.namespace]: i18nRepaymentModal.translation.en_US,
          // [i18nRepaymentNoticeModal.namespace]: i18nRepaymentNoticeModal.translation.en_US,
          // [i18nRepaymentAdsModal.namespace]: i18nRepaymentAdsModal.translation.en_US,
          //
          // // NOTE: ProductAdModalListPage
          // [i18nProductAdModalListPage.namespace]: i18nProductAdModalListPage.translation.en_US,
          //
          // // NOTE: UploadedPaymentReceiptPage
          // [i18nUploadedPaymentReceiptPage.namespace]: i18nUploadedPaymentReceiptPage.translation.en_US,
          //
          // // NOTE: UploadPaymentReceiptPage
          // [i18nUploadPaymentReceiptPage.namespace]: i18nUploadPaymentReceiptPage.translation.en_US,
          // [i18nUploadingFileModal.namespace]: i18nUploadingFileModal.translation.en_US,
          //
          [i18nExtendConfirmModal.namespace]: i18nExtendConfirmModal.translation.en_US || {},
          [i18nExtendModal.namespace]: i18nExtendModal.translation.en_US || {},
        },
        es_MX:{
          [i18nExtendConfirmModal.namespace]: i18nExtendConfirmModal.translation.es_MX || {},
          [i18nExtendModal.namespace]: i18nExtendModal.translation.es_MX || {},
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
