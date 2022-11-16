export enum i18nBankBindPageKey {
  CommonKey = "bank-bind-page",
  IndiaKey = "bank-bind-india-page",
  PakistanKey = "bank-bind-pakistan-page"
}

export const i18nBankBindPageTranslations = {
  [i18nBankBindPageKey.CommonKey]: {
    "Submit": "Submit",
    // NOTE: Bank Account
    "This field cannot be left blank": "This field cannot be left blank",
    "Cardholder Name": "Cardholder Name",

    "Account Number": "Account Number",
    "Account number must be between from 9 to 18 digits only.": "Account number must be between from 9 to 18 digits only.",
    "Confirm Account Number": "Confirm Account Number",
    "Please make sure your account number match.": "Please make sure your account number match.",
    "Unchangeable after linked, please check before submission.": "Unchangeable after linked, please check before submission.",
  },
  [i18nBankBindPageKey.IndiaKey]: {
    // NOTE: Bank Account - India
    "For KYC, your Cardholder name and Aadhaar name should be match.": "For KYC, your Cardholder name and Aadhaar name should be match.",
    "UPI ID": "UPI ID",
    "IFSC Code": "IFSC Code",
    "IFSC must be 11 digits only.": "IFSC must be 11 digits only.",
  },
  [i18nBankBindPageKey.PakistanKey]: {
    // NOTE: Bank Account - Pakistan
    // NOTE: Mobile Wallet
    "Choose the method to receive the money": "Choose the method to receive the money",
    "Bank account": "Bank account",
    "Mobile wallet": "Mobile wallet",
    "Please select the of your mobile wallet": "Please select the of your mobile wallet",
    "Your mobile wallet account": "Your mobile wallet account",
    "Wallet Account Number": "Wallet Account Number",
    "Account number should be 11 digits starting with 0.": "Account number should be 11 digits starting with 0.",
    "Please select your bank name": "Please select your bank name",
  },
}
