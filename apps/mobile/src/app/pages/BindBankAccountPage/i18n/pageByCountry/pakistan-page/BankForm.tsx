
import React from "react";
import {
  PureBindBankAccountPageProps,
} from "../../../types/PureBindBankAccountPageProps";
import {useBindBankAccountPage} from "../../../hooks/useBindBankAccountPage";
import {BankAccountTemplate2} from "../../bankAccountByLayout/BankAccountTemplate2";


export const BankForm = (props: PureBindBankAccountPageProps) => {
  // NOTICE: REFACTOR ME
  const {
    // ifscData,
    // onIFSCChange,
    // onIFSCBlur,
    bankcardNoData,
    onAccountNumberChange,
    onAccountNumberBlur,
    confirmedBankcardNoData,
    onConfirmAccountNumberChange,
    onConfirmAccountNumberBlur,
    // upiData,
    // onUPIIDChange,
    isFormPending,
    confirm
  } = useBindBankAccountPage(props);
  return (
    <BankAccountTemplate2 cardholderName={props.cardholderName}
                          // ifscData={ifscData}
                          // onIFSCChange={onIFSCChange}
                          // onIFSCBlur={onIFSCBlur}
                          bankcardNoData={bankcardNoData}
                          onAccountNumberChange={onAccountNumberChange}
                          onAccountNumberBlur={onAccountNumberBlur}
                          confirmedBankcardNoData={confirmedBankcardNoData}
                          onConfirmAccountNumberChange={onConfirmAccountNumberChange}
                          onConfirmAccountNumberBlur={onConfirmAccountNumberBlur}
                          // upiData={upiData} onUPIIDChange={onUPIIDChange}
                          isFormPending={isFormPending}
                          confirm={confirm}
    />
  )
}
