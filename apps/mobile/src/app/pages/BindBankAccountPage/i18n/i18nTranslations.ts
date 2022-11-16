export enum i18nBankBindPageKey {
  CommonKey = "bank-bind-page",
  IndiaKey= "bank-bind-india-page",
}
export const i18nBankBindPageTranslations = {
  [i18nBankBindPageKey.CommonKey]: {
    // NOTE: Mobile Wallet
    "Choose the method to receive the money": "Choose the method to receive the money",
    "Mobile wallet": "Mobile wallet",
    "Bank account": "Bank account",
    "Please select the of your mobile wallet": "Please select the of your mobile wallet",
    "Your mobile wallet account": "Your mobile wallet account",
    "Account number should be 11 digits starting with 0.": "Account number should be 11 digits starting with 0.",
    "Wallet Account Number": "Wallet Account Number",
    "Submit": "Submit",
    // NOTE: Bank Account
    "This field cannot be left blank": "This field cannot be left blank",
    "Cardholder Name": "Cardholder Name",
    "IFSC Code": "IFSC Code",
    "IFSC must be 11 digits only.": "IFSC must be 11 digits only.",
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
  }
}
