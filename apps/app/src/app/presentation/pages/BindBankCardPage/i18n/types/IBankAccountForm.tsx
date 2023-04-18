import {InputValue} from "@frontend/mobile/shared/ui";
import React from "react";
import {WithTranslation} from "react-i18next";

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
}

export type IIndiaBankAccountForm = IBankAccountForm & {
  ifscData: InputValue<string>;
  onIFSCChange: (event: any) => void;
  onIFSCBlur: (event: any) => void;

  upiData: InputValue<string>;
  onUPIIDChange: (event: any) => void;
}

export type IPakistanBankAccountForm = IBankAccountForm & {
  bankDropList: any;
  bankAccountValue: number;
  onIFSCDropSelect: (index: number) => void;
  bindCardDropListData: any;
  iBanData:any;
  onIBanChange: (event: any) => void;
  onIbanBlur: (event: any) => void;
}
