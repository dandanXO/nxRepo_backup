import React from 'react';

import { InputValue } from '@frontend/mobile/shared/ui';

export interface IForm {
  // NOTICE: REFACTOR ME
  isFormPending: boolean;
  confirm: React.EffectCallback;
}

type IBankAccountForm = IForm & {
  cardholderName: string;

  bankcardNoData: InputValue<string>;
  onAccountNumberChange: (event: any) => void;
  onAccountNumberBlur: (event: any) => void;

  confirmedBankcardNoData: InputValue<string>;
  onConfirmAccountNumberChange: (event: any) => void;
  onConfirmAccountNumberBlur: (event: any) => void;
};

export type IIndiaBankAccountForm = IBankAccountForm & {

  ifscData: InputValue<string>;
  setIFSCData:React.Dispatch<React.SetStateAction<InputValue<string>>>;
  validateIFSC:(val:string)=>void;

  confirmIFSCData: InputValue<string>;
  setConfirmIFSCData: React.Dispatch<React.SetStateAction<InputValue<string>>>;
  validateConfirmIFSCData: (value: string) => void;

  upiData: InputValue<string>;
  setUpiData:React.Dispatch<React.SetStateAction<InputValue<string>>>;
  validateUpiId:(val:string)=>void;

};

export type IPakistanBankAccountForm = {
  bankDropList: any;
  cardholderName: string;
  isFormPending: boolean;
  //   bankAccountValue: any;
  //   onIFSCDropSelect: (index: number) => void;
  //   bindCardDropListData: any;
  // iBanData: any;
  // onIBanChange: (event: any) => void;
  // onIbanBlur: (event: any) => void;
};
