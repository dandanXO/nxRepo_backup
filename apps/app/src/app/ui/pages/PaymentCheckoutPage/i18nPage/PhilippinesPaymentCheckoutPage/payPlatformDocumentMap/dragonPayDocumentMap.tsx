import { IPayMethodDocumentMap } from '../PayPlatformDocument';

export const dragonPayDocumentMap: IPayMethodDocumentMap = {
  GCash: {
    isOnline: true,
    logo: 'gcash',
    contents: [
      {
        title: 'Repay Instructions via GCash',
        content: (
          <ul className="text-ctext-secondary mt-2 list-outside list-decimal pl-5 text-xs">
            <li>
              Open <span className="font-bold">GCash</span> app and navigate to{' '}
              <span className="font-bold">“Pay Bills”</span>, then{' '}
              <span className="font-bold">“Payment Solutions”</span>, and select{' '}
              <span className="font-bold">“Dragonpay”</span> (ensure correct
              selection).
            </li>
            <li>
              Please input the{' '}
              <span className="font-bold">CORRECT reference_no</span> when
              making your repayment.
            </li>
            <li>The minimum repayment amount is PHP 100.</li>
          </ul>
        ),
      },
      {
        title: 'Payment tips',
        content: (
          <ul className="text-ctext-secondary mt-2 list-outside list-decimal pl-5 text-xs">
            <li>
              Double-check: Carefully check the{' '}
              <span className="font-bold">
                repayment amount & reference_no before payment.
              </span>
            </li>
            <li>
              Use Official App:{' '}
              <span className="font-bold">
                Only get reference_no from our official app.
              </span>
            </li>
            <li>
              Secure Connection: Ensure a secure network connection for data
              safety.
            </li>
            <li>
              Don't Share Codes: Do not share payment codes (reference_no /
              contract number / account number) with others.
            </li>
            <li>Save Receipts: Keep payment receipts for your records.</li>
          </ul>
        ),
      },
    ],
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
  Paymaya: {
    isOnline: true,
    logo: 'paymaya',
    contents: [
      {
        title: 'Repay Instructions via Paymaya',
        content: (
          <ul className="text-ctext-secondary mt-2 list-outside list-decimal pl-5 text-xs">
            <li>
              Open <span className="font-bold">PayMaya </span> app and navigate
              to <span className="font-bold">“Pay Bills”</span>, then{' '}
              <span className="font-bold">“Payment Solutions”</span>, and select{' '}
              <span className="font-bold">“Dragonpay”</span> (ensure correct
              selection).
            </li>
            <li>
              Please input the{' '}
              <span className="font-bold">CORRECT reference_no</span> in{' '}
              <span className="font-bold">“Account number”</span> text box when
              making your repayment.
            </li>
            <li>The minimum repayment amount is PHP 100.</li>
          </ul>
        ),
      },
      {
        title: 'Payment tips',
        content: (
          <ul className="text-ctext-secondary mt-2 list-outside list-decimal pl-5 text-xs">
            <li>
              Double-check: Carefully check the{' '}
              <span className="font-bold">
                repayment amount & reference_no before payment.
              </span>
            </li>
            <li>
              Use Official App:{' '}
              <span className="font-bold">
                Only get reference_no from our official app.
              </span>
            </li>
            <li>
              Secure Connection: Ensure a secure network connection for data
              safety.
            </li>
            <li>
              Don't Share Codes: Do not share payment codes (reference_no /
              contract number / account number) with others.
            </li>
            <li>Save Receipts: Keep payment receipts for your records.</li>
          </ul>
        ),
      },
    ],
  },
  PaysoPay: {
    isOnline: true,
    logo: 'paysopay',
  },
  PESONeT: {
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
    receiverContent: 'Dragonpay',
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
    receiverContent: 'Dragonpay',
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
  '7-ELEVEN': {
    isOnline: false,
    logo: '7eleven',
    receiverContent: 'Dragonpay',
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
    isOnline: false,
    logo: 'smpay',
    receiverTitle: 'Biller Company',
    receiverContent: 'Dragonpay',
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
    receiverContent: 'Dragonpay',
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
  'Robinson Supermarket': {
    isOnline: false,
    logo: 'robinsons_supermarket',
    receiverTitle: 'Biller',
    receiverContent: 'Dragonpay',
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
    receiverContent: 'Dragonpay',
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
    receiverContent: 'Dragonpay',
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
    receiverContent: 'Dragonpay',
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
    receiverContent: 'Dragonpay',
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
    receiverContent: 'Dragonpay',
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
    receiverContent: 'Dragonpay',
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
