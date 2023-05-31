import React from 'react';
import { useNavigate } from 'react-router';

import { Page } from '../../../../../components/layouts/Page';
import { useBindBankAccountForm } from '../../../hooks/common/useBindBankAccountForm';
import { useFinishedBindBankAccountForm } from '../../../hooks/common/useFinishedBindBankAccountForm';
import { useIndiaBankAccountForm } from '../../../hooks/i18n/india/useIndiaBankAccountForm';
import { IUseBindBankAccountPage } from '../../../types/IUseBindBankAccountPage';
import { BankAccountForm } from './BankAccountForm';

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

  const { isFormPending, confirm } = useFinishedBindBankAccountForm({
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
    <div className="flex">
      <BankAccountForm
        cardholderName={props.cardholderName}
        ifscData={ifscData}
        onIFSCChange={onIFSCChange}
        onIFSCBlur={onIFSCBlur}
        bankcardNoData={bankcardNoData}
        onAccountNumberChange={onAccountNumberChange}
        onAccountNumberBlur={onAccountNumberBlur}
        confirmedBankcardNoData={confirmedBankcardNoData}
        onConfirmAccountNumberChange={onConfirmAccountNumberChange}
        onConfirmAccountNumberBlur={onConfirmAccountNumberBlur}
        upiData={upiData}
        onUPIIDChange={onUPIIDChange}
        isFormPending={isFormPending || false}
        confirm={() => {
          // NOTE: validate and display errors
          const validation = validateCommonForm();
          const validation2 = validateIndiaForm();
          if (validation && validation2) confirm();
        }}
      />
    </div>
  );
};
