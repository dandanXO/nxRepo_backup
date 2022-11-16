import React from "react";
import {
  IUseBindBankAccountPage,
} from "../types/IUseBindBankAccountPage";
import {useBindBankAccountPage} from "../../hooks/useBindBankAccountPage";
import {PakistanBankAccountTemplate} from "./PakistanBankAccountTemplate";


export const BankForm = (props: IUseBindBankAccountPage & {
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
    <PakistanBankAccountTemplate cardholderName={props.cardholderName}
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
