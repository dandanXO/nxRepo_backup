
import React from "react";
import {
  PureBindBankAccountPageProps,
} from "../../../types/PureBindBankAccountPageProps";
import {useBindBankAccountPage} from "../../../hooks/useBindBankAccountPage";
import {BankAccountTemplate2} from "./BankAccountTemplate2";


export const BankForm = (props: PureBindBankAccountPageProps & {
  disable: boolean;
  bindCardDropListData: any;
}) => {
  // NOTICE: REFACTOR ME
  const {
    // ifscData,
    // onIFSCChange,
    // onIFSCBlur,
    bankcardNoData,
    bankDropList,
    bankAccountValue,
    onIFSCDropSelect,
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
                          bindCardDropListData={props.bindCardDropListData}
                          bankDropList={bankDropList}
                          bankAccountValue={bankAccountValue}
                          onIFSCDropSelect={onIFSCDropSelect}
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
