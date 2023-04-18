import React from "react";
import {IUseBindBankAccountPage} from "../../types/IUseBindBankAccountPage";
import {CustomPage} from "../../../components/CustomPage";
import {useBindBankAccountForm} from "../../hooks/common/useBindBankAccountForm";
import {BankAccountForm} from "./BankAccountForm";
import {useIndiaBankAccountForm} from "../../hooks/india/useIndiaBankAccountForm";
import {useFinishedBindBankAccountForm} from "../../hooks/common/useFinishedBindBankAccountForm";

export const IndiaBindBankAccountPage = (props: IUseBindBankAccountPage) => {

  const  {
    bankcardNoData,
    onAccountNumberChange,
    onAccountNumberBlur,
    confirmedBankcardNoData,
    onConfirmAccountNumberChange,
    onConfirmAccountNumberBlur,
    validate: validateCommonForm,
  } = useBindBankAccountForm();

  const {
    // NOTE: form
    validate: validateIndiaForm,
    // NOTE: IFSC
    ifscData,
    onIFSCChange,
    onIFSCBlur,
    // NOTE: UPI
    upiData,
    onUPIIDChange,

  } = useIndiaBankAccountForm();

  const {
    isFormPending,
    confirm,
  } = useFinishedBindBankAccountForm({
    // NOTICE: Common
    bankcardNoData,

    // NOTICE: India
    isLoadingPostBankBindSave: props.isLoadingPostBankBindSave || false,
    postBankBindSave: props.postBankBindSave,
    ifscData,
    upiData,

    // NOTICE: Pakistan
    // postBankBindSaveToPK: props.postBankBindSaveToPK,
    // NOTE: 取得電子錢包列表
    // bindCardDropListData: props.bindCardDropListData,
    // NOTE: 設定電子錢包列表
    // bankAccountValue: props.bankAccountValue,
  });

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
                         isFormPending={isFormPending || false}
                         confirm={() => {
                           // NOTE: validate and display errors
                           const validation = validateCommonForm()
                           const validation2 = validateIndiaForm();
                           if(validation && validation2) confirm();
                         }}
      />

    </CustomPage>
  );
}
