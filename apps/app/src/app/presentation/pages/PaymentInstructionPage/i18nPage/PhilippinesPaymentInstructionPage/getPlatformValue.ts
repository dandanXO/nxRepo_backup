const platformMap: {
  [key: string]: {
    [key: string]: string | boolean;
  };
} = {
  GCash: {
    isOnline: true,
    logo: 'gcash',
  },
  GrabPay: {
    isOnline: true,
    logo: 'grabpay',
  },
  UnionBank: {
    isOnline: true,
    logo: 'unionbank',
  },
  'BPI Online': {
    isOnline: true,
    logo: 'bpi',
  },
  'InstaPay Online': {
    isOnline: true,
    logo: 'instapay',
  },
  PayMaya: {
    isOnline: true,
    logo: 'paymaya',
  },
  PeysoPay: {
    isOnline: true,
    logo: 'paysopay',
  },
  PESONet: {
    isOnline: true,
    logo: 'pesonet',
  },
  'Coins.ph': {
    isOnline: true,
    logo: 'coinsph',
  },
  'Cebuana Lhuillier': {
    isOnline: false,
    logo: 'cebuana',
    instruction1Title: 'Visit any Cebuana Lhuillier branch',
    instruction1Content: 'Mon-Sat (8:00AM - 5:30PM) Hours may vary by location',
    instruction2Title: 'Complete Bills Payment form',
    instruction2Content:
      'Enter the reference number, contact phone number and the payment amount.',
    instruction3Title: 'Give the form and the amount to the cashier',
    instruction3Content:
      'Hand over the required information and the payment amount to the cashier.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
  'M Lhuillier': {
    isOnline: false,
    logo: 'mlhuillier',
    instruction1Title: 'Visit any M Lhuillier branch',
    instruction1Content:
      "Go to the nearest M Lhuillier. Ask the staff that you'd like to make a bills payment.",
    instruction2Title: 'Complete Bills Payment form',
    instruction2Content:
      'Enter the reference number, contact phone number and the payment amount.',
    instruction3Title: 'Give the form and the amount to the cashier',
    instruction3Content:
      'Bring the form and hand over your cash payment to the cashier. Please note that there will be a handling fee ranging from 30 to 120 pesos based on the payment amount.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
  '7-11': {
    isOnline: false,
    logo: '7eleven',
    instruction1Title: 'Visit 7-Eleven',
    instruction1Content:
      'Go to the CliQQ Kiosk, choose Bills Payment and look for the name of receiver. For contactless payment, you can also download the CliQQ app.',
    instruction2Title: 'Enter info at CliQQ machine or the CliQQ app',
    instruction2Content:
      'Enter the reference number, contact phone number and the payment amount to generate a barcode.',
    instruction3Title: 'Show the barcode to cashier',
    instruction3Content:
      'Bring the barcode to the cashier and provide your cash payment amount to the cashier.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
  'SM Store': {
    receiverTitleKey: 'billerCompany',
    isOnline: false,
    logo: 'smpay',
    instruction1Title: 'Visit any SM Store branch',
    instruction1Content:
      'Go to the nearest SM Store. Get the Validation Slip in counter for payment.',
    instruction2Title: 'Complete Validation Slip form',
    instruction2Content:
      'Enter the your information, reference number, payment amount, and the name of receiver.',
    instruction3Title: 'Give the form and the amount to the cashier',
    instruction3Content:
      'Hand over the required information and the payment amount to the cashier.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
  'Palawan Pawnshop': {
    isOnline: false,
    logo: 'palawan_pawnshop',
    instruction1Title: 'Visit Palawan Pawnshop',
    instruction1Content:
      "Go to the nearest Palawan Pawnshop. Ask the staff that you'd like to make a payment.",
    instruction2Title: 'Complete Send Money form',
    instruction2Content:
      'Enter the your information, reference number, payment amount, and the name of receiver.',
    instruction3Title: 'Give the form and the amount to the cashier',
    instruction3Content:
      'Hand over the required information and the payment amount to the cashier.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
  'Robinsons Supermarket': {
    receiverTitleKey: 'biller',
    isOnline: false,
    logo: 'robinsons_supermarket',
    instruction1Title: 'Visit Robinsons Supermarket',
    instruction1Content:
      "Go to the nearest Robinsons Supermarket and look for Robinsons business center. Ask the staff that you'd like to make a payment.",
    instruction2Title: 'Complete Payment form',
    instruction2Content:
      'Enter the your information, reference number, payment amount, and the name of receiver.',
    instruction3Title: 'Give the form and the amount to the cashier',
    instruction3Content:
      'Hand over the required information and the payment amount to the cashier.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
  'RD Pawnshop': {
    isOnline: false,
    logo: 'rd_pawnshop',
    instruction1Title: 'Visit RD Pawnshop',
    instruction1Content:
      "Go to the nearest RD Pawnshop and inform the staff that you'd like to make a payment.",
    instruction2Title: 'Complete Send Money form',
    instruction2Content:
      'Enter the your information, reference number, payment amount, and the name of receiver.',
    instruction3Title: 'Give the form and the amount to the cashier',
    instruction3Content:
      'Hand over the required information and the payment amount to the cashier.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
  ECPay: {
    isOnline: false,
    logo: 'ecpay',
    instruction1Title: 'Visit ECPay partner outlet',
    instruction1Content:
      "Go to the nearest ECPay partner outlet and inform the staff that you'd like to make a payment.",
    instruction2Title: 'Complete Send Money form',
    instruction2Content:
      'Enter the your information, reference number, payment amount, and the name of receiver.',
    instruction3Title: 'Give the form and the amount to the cashier',
    instruction3Content:
      'Hand over the required information and the payment amount to the cashier at the ECPay partner outlet.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
  TrueMoney: {
    isOnline: false,
    logo: 'truemoney',
    instruction1Title: 'Visit any TrueMoney Outlet',
    instruction1Content:
      "Go to the nearest TrueMoney Outlet and inform the staff that you'd like to make a payment.",
    instruction2Title: 'Complete Bills Payment form',
    instruction2Content:
      'Enter the reference number, contact phone number and the payment amount.',
    instruction3Title: 'Give the form and the amount to the cashier',
    instruction3Content:
      'Hand over the required information and the payment amount to the cashier.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
  'LBC Express': {
    isOnline: false,
    logo: 'lbc',
    instruction1Title: 'Visit any LBC Express branch',
    instruction1Content:
      "Go to the nearest LBC Express branch and inform the staff that you'd like to make a payment.",
    instruction2Title: 'Complete Bills Payment form',
    instruction2Content:
      'Enter the reference number, contact phone number and the payment amount.',
    instruction3Title: 'Give the form and the amount to the cashier',
    instruction3Content:
      'Hand over the required information and the payment amount to the cashier.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
  Lazada: {
    isOnline: false,
    logo: 'lazada',
    instruction1Title: 'Visit any Lazada',
    instruction1Content:
      "Go to the nearest USSC Outlet and inform the staff that you'd like to make a payment.",
    instruction2Title: 'Complete Bills Payment form',
    instruction2Content:
      'Enter the reference number, contact phone number and the payment amount.',
    instruction3Title: 'Give the form and the amount to the cashier',
    instruction3Content:
      'Hand over the required information and the payment amount to the cashier.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
  USSC: {
    isOnline: false,
    logo: 'ussc',
    instruction1Title: 'Visit any USSC Outlet',
    instruction1Content:
      "Go to the nearest USSC Outlet and inform the staff that you'd like to make a payment.",
    instruction2Title: 'Complete Bills Payment form',
    instruction2Content:
      'Enter the reference number, contact phone number and the payment amount.',
    instruction3Title: 'Give the form and the amount to the cashier',
    instruction3Content:
      'Hand over the required information and the payment amount to the cashier.',
    instruction4Title: 'Receive confirmation',
    instruction4Content:
      'You will receive a transaction receipt; please keep this receipt for your reference.',
  },
};

export const getPlatformValue = (platform: string | undefined, key: string) => {
  if (platform === undefined) return null;
  try {
    return platformMap[platform][key];
  } catch (error) {
    return 'Platform Not Found';
  }
};
