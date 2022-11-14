import i18next from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";


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
        "bank-bind": {
          // Mobile Wallet
          "Choose the method to receive the money": "Choose the method to receive the money",
          "Mobile wallet": "Mobile wallet",
          "Bank account": "Bank account",
          "Please select the of your mobile wallet": "Please select the of your mobile wallet",
          "Your mobile wallet account": "Your mobile wallet account",
          "Account number should be 11 digits starting with 0.": "Account number should be 11 digits starting with 0.",
          "Wallet Account Number": "Wallet Account Number",
          "Submit": "Submit",
          // Bank Account
          "Cardholder Name": "Cardholder Name",
          "Account Number": "Account Number",
          "Account number must be between from 9 to 18 digits only.": "Account number must be between from 9 to 18 digits only.",
          "Confirm Account Number": "Confirm Account Number",
          "Please make sure your account number match.": "Please make sure your account number match.",
          "Unchangeable after linked, please check before submission.": "Unchangeable after linked, please check before submission.",
        },
        "bank-bind-india": {
          // Bank Account - India
          "For KYC, your Cardholder name and Aadhaar name should be match.": "For KYC, your Cardholder name and Aadhaar name should be match.",
          "IFSC Code": "IFSC Code",
          "IFSC must be 11 digits only.": "IFSC must be 11 digits only.",
          "UPI ID": "UPI ID",
        }

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

