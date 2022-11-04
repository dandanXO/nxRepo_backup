import {useBindBankAccountPage} from "../../../useBindBankAccountPage";
import {BankAccountTemplate1} from "../../bankAccountByLayout/BankAccountTemplate1";
import React from "react";
import {PureBindBankAccountPageProps} from "../../../types/PureBindBankAccountPageProps";
import {CustomPage} from "../../../components/CustomPage";

export const IndiaBindBankAccountPage = (props: Omit<PureBindBankAccountPageProps, "layout">) => {
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
