import {InputValue} from "@frontend/mobile/shared/ui";
import React from "react";

export interface IGeneralPageLayoutTypeProps {
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

  isFormPending: boolean;
  confirm: React.EffectCallback;
}
