import React from "react";
import { IUseBindBankAccountPage } from "../../../types/IUseBindBankAccountPage";
import { CustomPage } from "../../CustomPage";
import { BankAccountForm } from "./BankAccountForm";
import { Navigation } from "../../../../../components/layouts/Navigation";
import { useNavigate } from "react-router";

import { useBindBankAccountForm } from "../../../hooks/common/useBindBankAccountForm";
import { useFinishedBindBankAccountForm } from "../../../hooks/common/useFinishedBindBankAccountForm";
import { useIndiaBankAccountForm } from "../../../hooks/i18n/india/useIndiaBankAccountForm";
import {isInAndroid} from "../../../../../../modules/window/isInAndroid";

export const IndiaBindBankAccountPage = (props: IUseBindBankAccountPage) => {
    const navigate = useNavigate();
    const {
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
        <>
          {/*NOTICE: 這邊的用意是？*/}
          {!isInAndroid() && <Navigation title={"Bank Card"} back={() => { navigate(-1) }} />}

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
        </>

    );
}
