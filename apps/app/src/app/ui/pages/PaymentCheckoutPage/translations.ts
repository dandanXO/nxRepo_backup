import {i18nComponent} from '../../../modules/i18n/i18nComponent';

export const i18nPaymentInstructionPage: i18nComponent = {
  namespace: 'pages/i18nPaymentInstructionPage',
  translation: {
    en_US: {},
    en_PH: {
      billerCompany: 'Biller Company',
      receiver: 'Name of Receiver',
      biller: 'Biller',
      totalPayment: 'Total payment',
      referenceNumberWithPolicyNo: 'Reference Number (Policy No.)',
      referenceNumber: 'Reference Number',
      notice:
        'Please ensure that your information is accurate. Incorrect information may result in your transaction remaining unverified. Kindly provide a valid contact phone number so that we can reach out to you in case of any verification issues. Thank you for your cooperation!',
      repayAt: 'Repay at',
      paymentTips1:
        'Confirm Payment Details: Please carefully double-check the payment amount before scanning.',
      paymentTips2:
        'Use Official App: Only use this app for payments; avoid third-party apps.',
      paymentTips3:
        'Secure Connection: Ensure a secure network connection for data safety.',
      paymentTips4:
        'Clear Screen: Keep your screen clean for barcode or QR code scanning.',
      paymentTips5:
        "Don't Share Codes: Do not share payment codes with others.",
      paymentTips6: 'Save Receipts: Keep payment receipts for your records.',
    },
  },
};
