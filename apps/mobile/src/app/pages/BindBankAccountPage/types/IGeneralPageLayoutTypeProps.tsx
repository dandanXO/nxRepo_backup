import {InputValue} from "@frontend/mobile/shared/ui";
import React from "react";

export interface IForm {
  // NOTICE: REFACTOR ME
  isFormPending: boolean;
  confirm?: React.EffectCallback;
}
export type IGeneralPageLayoutTypeProps = IForm & {
  cardholderName: string;

  ifscData: InputValue<string>;
  onIFSCChange: (event: any) => void;
  onIFSCBlur: (event: any) => void;

  bankcardNoData: InputValue<string>;
  onAccountNumberChange: (event: any) => void;
  onAccountNumberBlur: (event: any) => void;

  confirmedBankcardNoData: InputValue<string>;
  onConfirmAccountNumberChange: (event: any) => void;
  onConfirmAccountNumberBlur: (event: any) => void;

  upiData: InputValue<string>;
  onUPIIDChange: (event: any) => void;
}

export type IPakistanPageLayoutTypeProps = IForm & {
  cardholderName: string;

  bankcardNoData: InputValue<string>;
  onAccountNumberChange: (event: any) => void;
  onAccountNumberBlur: (event: any) => void;

  confirmedBankcardNoData: InputValue<string>;
  onConfirmAccountNumberChange: (event: any) => void;
  onConfirmAccountNumberBlur: (event: any) => void;
}
