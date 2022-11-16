
import React from "react";
import {
  IUseBindBankAccountPage
} from "../../types/IUseBindBankAccountPage";
import {CustomPage} from "../../../components/CustomPage";
import {useBindBankAccountPage} from "../../hooks/useBindBankAccountPage";
import {BankAccountForm} from "./BankAccountForm";

export const IndiaBindBankAccountPage = (props: IUseBindBankAccountPage) => {
  const {
    ifscData,
    onIFSCChange,
    onIFSCBlur,
    bankcardNoData,
    onAccountNumberChange,
    onAccountNumberBlur,
    confirmedBankcardNoData,
    onConfirmAccountNumberChange,
    onConfirmAccountNumberBlur,
    upiData,
    onUPIIDChange,
    isFormPending,
    confirm
  } = useBindBankAccountPage(props);
  return (
    <CustomPage>
        <BankAccountForm cardholderName={props.cardholderName}
                         ifscData={ifscData}
                         onIFSCChange={onIFSCChange}
                         onIFSCBlur={onIFSCBlur}
                         bankcardNoData={bankcardNoData}
                         onAccountNumberChange={onAccountNumberChange}
                         onAccountNumberBlur={onAccountNumberBlur}
                         confirmedBankcardNoData={confirmedBankcardNoData}
                         onConfirmAccountNumberChange={onConfirmAccountNumberChange}
                         onConfirmAccountNumberBlur={onConfirmAccountNumberBlur}
                         upiData={upiData} onUPIIDChange={onUPIIDChange}
                         isFormPending={isFormPending}
                         confirm={confirm}
      />

    </CustomPage>
  );
}
