
import React from "react";
import {
  PureBindBankAccountPageProps
} from "../../../types/PureBindBankAccountPageProps";
import {CustomPage} from "../../../components/CustomPage";
import {useBindBankAccountPage} from "../../../hooks/useBindBankAccountPage";
import {BankAccountTemplate1} from "./BankAccountTemplate1";

export const IndiaBindBankAccountPage = (props: PureBindBankAccountPageProps) => {
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
        <BankAccountTemplate1 cardholderName={props.cardholderName}
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
